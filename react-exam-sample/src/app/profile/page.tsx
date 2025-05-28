"use client"

import {useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {
    Accordion, AccordionDetails,
    AccordionSummary, Avatar, Box,
    Card,
    CardContent,
    CardHeader, Chip,
    Container, Divider, Grid,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Stack} from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import {PersonsService} from "@/services/PersonService";
import {AccountContext} from "@/context/AccountContext";
import {IUser} from "@/types/Domain/IUser";

export default function Profile() {
    const personService = new PersonsService();

    const { accountInfo } = useContext(AccountContext);
    const router = useRouter();
    const [profile, setProfile] = useState<IUser>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await personService.getProfileInfo();
                if (result.errors) {
                    console.log(result.errors);
                    return;
                }
                setProfile(result.data!);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        if (!accountInfo?.jwt) {
            router.push("/login")
            return;
        }

        // Get profile data
        personService.getProfileInfo().then(res => {
            if (!res.errors && res.data) setProfile(res.data);
        })

    }, []);

    if (!profile) return null;


    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                            <PersonIcon fontSize="large" />
                        </Avatar>
                    }
                    title={
                        <Typography variant="h6" component="div">
                            {profile.personFirstName} {profile.personLastName}
                        </Typography>
                    }
                    subheader={
                        <Box display="flex" alignItems="center" gap={1}>
                            <EmailIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="textSecondary">
                                {profile.email}
                            </Typography>
                        </Box>
                    }
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid sx={{xs:12, sm:6}}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <HomeIcon color="action" />
                                <Typography variant="body2">
                                    {profile.personAddress}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid sx={{xs:12, sm:6}}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <PhoneIcon color="action" />
                                <Typography variant="body2">
                                    {profile.personPhoneNumber}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </Container>
    );
}
