'use client';

import { Box, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Chip, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';

export type Student = {
    id:     string;
    name:   string;
    email:  string;
    status: 'pending' | 'accepted' | 'rejected';
};

export default function StudentEnrollmentList({
                                                  subjectName,
                                                  initialStudents,
                                                  onAccept,
                                                  onReject,
                                              }: {
    subjectName:     string;
    initialStudents: Student[];
    onAccept:        (id: string) => void;
    onReject:        (id: string) => void;
}) {
    const [students, setStudents] = useState(initialStudents);

    const handle = (id: string, newStatus: Student['status']) => {
        if (!window.confirm(`${newStatus === 'accepted' ? 'Accept' : 'Reject'} this student?`)) return;
        if (newStatus === 'accepted') onAccept(id);
        else onReject(id);
        setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="h5" gutterBottom>
                {subjectName}
            </Typography>

            <List>
                {students.map((s, i) => (
                    <React.Fragment key={s.id}>
                        <ListItem>
                            <ListItemText primary={s.name} secondary={s.email} />
                            <ListItemSecondaryAction>
                                {s.status === 'pending' ? (
                                    <>
                                        <Button size="small" variant="contained" color="success" sx={{ mr: 1 }}
                                                onClick={() => handle(s.id, 'accepted')}
                                        >
                                            Accept
                                        </Button>
                                        <Button size="small" variant="outlined" color="error"
                                                onClick={() => handle(s.id, 'rejected')}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                ) : (
                                    <Chip
                                        label={s.status === 'accepted' ? 'Accepted' : 'Rejected'}
                                        color={s.status === 'accepted' ? 'success' : 'error'}
                                        size="small"
                                    />
                                )}
                            </ListItemSecondaryAction>
                        </ListItem>
                        {i < students.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
