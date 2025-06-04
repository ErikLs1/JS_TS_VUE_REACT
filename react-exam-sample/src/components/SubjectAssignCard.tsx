'use client';

import { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Chip } from '@mui/material';
import { SemesterSubjectService } from '@/services/SemesterSubjectService';
import { AssignSemesterSubjectDto } from '@/types/Request/AssignSemesterSubjectDto';
import {SemesterSubjectDto} from "@/types/Request/SemesterSubjectDto";

export default function SubjectAssignCard({
                                              subject,
                                              onToggle,
                                          }: {
    subject: SemesterSubjectDto;
    onToggle: (id: string, assigned: boolean) => void;
}) {
    const [assigned, setAssigned] = useState(subject.assigned);
    const [loading, setLoading]   = useState(false);
    const semesterSubjectService = new SemesterSubjectService();

    const toggleAssign = async () => {
        const verb = assigned ? 'Unassign from' : 'Teach';
        if (!window.confirm(`${verb} "${subject.name}"?`)) return;

        setLoading(true);
        const dto: AssignSemesterSubjectDto = { semesterSubjectId: subject.id };
        const res = await semesterSubjectService.AssignSemesterSubject(dto);
        setLoading(false);

        if (res.errors?.length) {
            alert(`Error: ${res.errors.join('; ')}`);
            return;
        }

        setAssigned(!assigned);
        onToggle(subject.id, !assigned);
        alert(assigned ? 'Unassigned.' : 'Assigned!');
    };

    return (
        <Card sx={{ mb: 2, opacity: loading ? 0.6 : 1 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6">{subject.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            EAP: {subject.eap}
                        </Typography>
                    </Box>
                    {assigned ? (
                        <Chip label="Assigned" color="error" size="small" />
                    ) : (
                        <Chip label="Available" color="warning" size="small" />
                    )}
                </Box>

                <Typography variant="body1" sx={{ mt: 1 }}>
                    {subject.description}
                </Typography>

                <Box textAlign="right" sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        disabled={loading}
                        onClick={toggleAssign}
                    >
                        {assigned ? 'Unassign' : 'Teach this Subject'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
