'use client';

import { Card, CardContent, Typography, Box, Button, Chip } from "@mui/material";

export type AvailableSubject = {
    id: string;
    name: string;
    description?: string;
    eap: number;
    requested: boolean;
};

export default function AvailableSubjectCard({
                                                 subject,
                                                 onEnroll,
                                             }: {
    subject: AvailableSubject;
    onEnroll: (id: string) => Promise<void>;
}) {
    return (
        <Card sx={{ mb: 2, boxShadow: 1 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{subject.name}</Typography>
                    <Chip label={`EAP: ${subject.eap}`} size="small" color="primary" />
                </Box>
                {subject.description && (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        {subject.description}
                    </Typography>
                )}
                <Box textAlign="right" sx={{ mt: 2 }}>
                    {subject.requested ? (
                        <Chip label="Requested" color="warning" size="small" />
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => onEnroll(subject.id)}
                        >
                            Enroll
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
