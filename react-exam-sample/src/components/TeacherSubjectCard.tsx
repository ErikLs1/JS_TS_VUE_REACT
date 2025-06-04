import { Card, CardContent, Typography, Box, Chip, Button } from "@mui/material";
import Link from "next/link";
import {SemesterSubjectDto} from "@/types/Request/SemesterSubjectDto";


export default function TeacherSubjectCard({ subject }: { subject: SemesterSubjectDto }) {
    return (
        <Card sx={{ mb: 2, boxShadow: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">{subject.name}</Typography>
                    <Chip label={`EAP: ${subject.eap}`} size="small" color="primary" />
                </Box>

                {subject.description && (
                    <Typography variant="body2" color="textSecondary" mb={2}>
                        {subject.description}
                    </Typography>
                )}

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button
                        variant="outlined"
                        component={Link}
                        href={`/manageStudents`}
                    >
                        Manage Students
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}