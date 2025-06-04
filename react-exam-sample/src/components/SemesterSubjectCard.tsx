'use client';

import { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
} from '@mui/material';

export type SemesterSubject = {
    id: string;
    name: string;
    description: string;
    eap: number;
    teacherName: string;
};

export default function SemesterSubjectCard({
                                                subject,
                                            }: {
    subject: SemesterSubject;
}) {
    const [requested, setRequested] = useState(false);

    const handleRequest = () => {
        if (!window.confirm(`Request enrollment for "${subject.name}"?`)) return;
        setRequested(true);
        window.alert('Enrollment request sent!');
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{subject.name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        EAP: {subject.eap}
                    </Typography>
                </Box>

                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Teacher: {subject.teacherName}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                    {subject.description}
                </Typography>

                <Box textAlign="right" sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        disabled={requested}
                        onClick={handleRequest}
                    >
                        {requested ? 'Requested' : 'Request Enroll'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
