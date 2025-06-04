'use client';

import { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { SemesterSubjectService } from "@/services/SemesterSubjectService";
import { EnrollmentService } from "@/services/EnrollmentService";
import AvailableSubjectCard, { AvailableSubject } from "@/components/AvailableSubjectCard";

export default function AvailableSubjectsPage() {
    const enrollmentService = new EnrollmentService();
    const semesterSubjectService = new  SemesterSubjectService()

    const [subjects, setSubjects] = useState<AvailableSubject[]>([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const res = await semesterSubjectService.GetAvailableSubjectsForEnrollment();
            if (res.errors?.length) {
                setError(res.errors.join("; "));
            } else if (res.data) {
                setSubjects(
                    res.data.map(dto => ({
                        id: dto.id,
                        name: dto.name,
                        description: dto.description,
                        eap: dto.eap,
                        requested: false,
                    }))
                );
            }
            setLoading(false);
        })();
    }, []);

    const handleEnroll = async (subjectId: string) => {
        if (!confirm("Are you sure you want to request enrollment?")) return;

        const res = await enrollmentService.RequestEnrollment({ semesterSubjectId: subjectId });
        if (res.errors?.length) {
            alert(res.errors.join("; "));
        } else {
            setSubjects(subjects.map(s =>
                s.id === subjectId ? { ...s, requested: true } : s
            ));
            alert("Enrollment request submitted!");
        }
    };

    if (loading) return <CircularProgress />;
    if (error)   return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Available Subjects for Enrollment
            </Typography>
            <Box mt={3}>
                {subjects.map(s => (
                    <AvailableSubjectCard
                        key={s.id}
                        subject={s}
                        onEnroll={handleEnroll}
                    />
                ))}
            </Box>
        </Container>
    );
}
