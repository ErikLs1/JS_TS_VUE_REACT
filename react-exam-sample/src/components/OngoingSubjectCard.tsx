'use client';

import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

export type Enrollment = {
    id: string;
    subjectName: string;
    subjectCode: string;
    enrollmentDate: Date;
    status: 'pending' | 'accepted' | 'rejected';
};

const statusMap = {
    pending:  { label: 'Pending',  color: 'warning' as const },
    accepted: { label: 'Accepted', color: 'success' as const },
    rejected: { label: 'Rejected', color: 'error' as const },
};

export default function EnrollmentCard({
                                           enrollment,
                                       }: {
    enrollment: Enrollment;
}) {
    const { label, color } = statusMap[enrollment.status];

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">{enrollment.subjectName}</Typography>
                    <Chip label={label} color={color} size="small" />
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Code: {enrollment.subjectCode}
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                    Requested on: {enrollment.enrollmentDate.toLocaleDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
}
