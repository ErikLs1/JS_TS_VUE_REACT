'use client';

import { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
} from '@mui/material';
import SubjectAssignCard from '@/components/SubjectAssignCard';
import { SemesterSubjectService } from '@/services/SemesterSubjectService';
import { SemesterSubjectDto } from '@/types/Request/SemesterSubjectDto';

export default function AvailableSubjectsPage() {
    const service = new SemesterSubjectService();
    const [subjects, setSubjects] = useState<SemesterSubjectDto[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await service.GetSemesterSubjectsForTeacher();
                if (!res.errors && res.data) {
                    setSubjects(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleToggle = (id: string, nowAssigned: boolean) => {
        setSubjects(subjects.map(s =>
            s.id === id ? { ...s, assigned: nowAssigned } : s
        ));
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Available Semester Subjects
            </Typography>
            <Box mt={3}>
                {subjects.map((subj) => (
                    <SubjectAssignCard
                        key={subj.id}
                        subject={subj}
                        onToggle={handleToggle}
                    />
                ))}
            </Box>
        </Container>
    );
}
