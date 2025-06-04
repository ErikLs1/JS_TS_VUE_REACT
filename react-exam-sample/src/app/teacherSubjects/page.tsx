'use client';

import { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import TeacherSubjectCard from "@/components/TeacherSubjectCard";
import { SemesterSubjectService } from "@/services/SemesterSubjectService";
import {SemesterSubjectDto} from "@/types/Request/SemesterSubjectDto";

export default function TeacherSubjects() {
    const semesterSubjectService = new SemesterSubjectService();
    const [subs, setSubs] = useState<SemesterSubjectDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string|null>(null);

    useEffect(() => {
        (async () => {
            const res = await semesterSubjectService.GetSemesterSubjectForCurrentTeacher();
            if (res.errors?.length) {
                setError(res.errors.join("; "));
            } else {
                setSubs(res.data!);
            }
            setLoading(false);
        })();
    }, []);

    if (loading) return <CircularProgress />;
    if (error)   return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Subjects You Teach
            </Typography>
            <Box mt={3}>
                {subs.map(s => (
                    <TeacherSubjectCard key={s.id} subject={s} />
                ))}
            </Box>
        </Container>
    );
}
