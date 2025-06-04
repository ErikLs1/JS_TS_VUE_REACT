'use client';

import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { SchoolService } from "@/services/SchoolService";
import {SchoolListDto} from "@/types/Response/SchoolListDto";
import {useRouter} from "next/navigation";
import {AssignSchoolDto} from "@/types/Request/AssignSchoolDto";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    schoolId: string | null;
};

export default function ChooseSchoolCard({currentUser,
                                         }: {
    currentUser: User;
}) {
    const router = useRouter();
    const schoolService = new SchoolService();

    const [schools, setSchools] = useState<SchoolListDto[]>([]);
    const [selected, setSelected] = useState("");

    const [assigning, setAssigning] = useState(false);
    const [errorAssign, setErrorAssign] = useState<string | null>(null);

    // 1️⃣ Fetch schools
    useEffect(() => {
        (async () => {
            const res = await schoolService.getAllSchools();
            if (!res.errors && res.data) {
                setSchools(res.data);
            }
        })();
    }, []);

    const handleSave = async () => {
        setAssigning(true);
        setErrorAssign(null);

        const dto: AssignSchoolDto = { schoolId: selected };
        const res = await schoolService.assignSchool(dto);

        if (res.errors?.length) {
            setErrorAssign(res.errors.join("; "));
            setAssigning(false);
        } else {
            router.push("/");
        }
    };

    return (
        <Card sx={{ maxWidth: 400, p: 3 }}>
            <CardContent>
                <Typography variant="h5" align="center" color="primary" gutterBottom>
                    Choose your university
                </Typography>

                {errorAssign && (
                    <Box mb={2}>
                        <Alert severity="error">{errorAssign}</Alert>
                    </Box>
                )}

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="uni-select-label">University</InputLabel>
                    <Select
                        labelId="uni-select-label"
                        value={selected}
                        label="University"
                        onChange={(e) => setSelected(e.target.value)}
                    >
                        {schools.map((u) => (
                            <MenuItem key={u.id} value={u.id}>
                                {u.schoolName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 4 }}
                    disabled={!selected || assigning}
                    onClick={handleSave}
                >
                    {assigning ? <CircularProgress size={24} color="inherit" /> : "Save & continue"}
                </Button>
            </CardContent>
        </Card>
    );
}