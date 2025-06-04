import ChooseSchoolCard from '@/components/ChooseSchoolCard';
import {Box} from "@mui/material";

export default async function Page() {
    const currentUser = {
        id: 'user-123',
        firstName: 'Ada',
        lastName: 'Lovelace',
        schoolId: null,
    };

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <ChooseSchoolCard currentUser={currentUser} />
        </Box>
    );
}
