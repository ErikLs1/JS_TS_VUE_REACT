'use client';

import { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
} from '@mui/material';

import { EnrollmentService } from '@/services/EnrollmentService';
import { EnrollmentDto } from '@/types/Response/EnrollmentDto';
import EnrollmentCard, {Enrollment} from "@/components/OngoingSubjectCard";

export default function MyEnrollmentsPage() {
    const service = new EnrollmentService();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);


    useEffect(() => {
        (async () => {
            const res = await service.GetMyEnrollments();
            if (!res.errors && res.data) {
                setEnrollments(
                    res.data.map((dto: EnrollmentDto) => ({
                        id: dto.id,
                        subjectName: dto.subjectName,
                        subjectCode: dto.subjectCode,
                        enrollmentDate: new Date(dto.enrollmentData),
                        status: dto.status.toLowerCase() as 'pending' | 'accepted' | 'rejected',
                    }))
                );
            }
        })();
    }, []);


    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                My Enrollment Requests
            </Typography>
            <Box mt={3}>
                {enrollments.map(e => (
                    <EnrollmentCard key={e.id} enrollment={e} />
                ))}
            </Box>
        </Container>
    );
}
