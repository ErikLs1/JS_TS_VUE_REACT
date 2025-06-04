'use client';

import { useEffect, useState } from 'react';
import { CircularProgress, Alert, Container, Typography, Box } from '@mui/material';
import StudentEnrollmentList, { Student } from '@/components/StudentEnrollmentList';
import { EnrollmentService } from '@/services/EnrollmentService';
import { EnrollmentForTeacherDto } from '@/types/Response/EnrollmentForTeacherDto';

export default function AllStudentRequestsPage() {
    const service = new EnrollmentService();
    const [data, setData]     = useState<EnrollmentForTeacherDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const res = await service.GetEnrollmentsForTeacher();
            if (res.errors?.length) {
                setError(res.errors.join('; '));
            } else if (res.data) {
                setData(res.data);
            }
            setLoading(false);
        })();
    }, []);

    const handleStatus = async (enrollmentId: string, accept: boolean) => {
        const { errors } = await service.SetEnrollmentStatus({ enrollmentId, accepted: accept });
        if (errors?.length) {
            alert(errors.join('; '));
        } else {
            setData(d =>
                d.map(e =>
                    e.enrollmentId === enrollmentId
                        ? { ...e, studentAccepted: accept, status: accept ? 'Accepted' : 'Rejected' }
                        : e
                )
            );
        }
    };

    if (loading) return <CircularProgress />;
    if (error)   return <Alert severity="error">{error}</Alert>;

    // group by subject
    const bySubject = data.reduce<Record<string, EnrollmentForTeacherDto[]>>((acc, e) => {
        acc[e.subjectName] = acc[e.subjectName] || [];
        acc[e.subjectName].push(e);
        return acc;
    }, {});

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                All Student Enrollment Requests
            </Typography>

            {Object.entries(bySubject).map(([subjectName, list]) => (
                <Box key={subjectName} mt={4}>
                    <StudentEnrollmentList
                        subjectName={subjectName}
                        initialStudents={list.map< Student >(e => ({
                            id: e.enrollmentId,
                            name: e.studentName,
                            email: e.studentEmail,
                            status: e.studentAccepted
                                ? 'accepted'
                                : e.status.toLowerCase() === 'rejected'
                                    ? 'rejected'
                                    : 'pending',
                        }))}
                        onAccept={id => handleStatus(id, true)}
                        onReject={id => handleStatus(id, false)}
                    />
                </Box>
            ))}
        </Container>
    );
}
