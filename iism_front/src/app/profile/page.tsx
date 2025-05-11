"use client"

import { AccountContext } from "@/Context/AccountContext";
import {useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {IUser} from "@/Types/Domain/IUser";
import {PersonsService} from "@/Services/PersonsService";
import {Card, CardContent, CardHeader, Container, Grid, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {Stack} from "@mui/system";

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
		} else {
			fetchData();
		}
	}, []);

	if (!profile) {
		return null;
	}
	return (
		<Container maxWidth="sm" sx={{ mt: 4 }}>
			<Card>
				<CardHeader title="My Profile" />
				<CardContent>
					<Stack spacing={2}>
						<Typography>
							<strong>First Name:</strong> {profile.personFirstName}
						</Typography>
						<Typography>
							<strong>Last Name:</strong> {profile.personLastName}
						</Typography>
						<Typography>
							<strong>Email:</strong> {profile.email}
						</Typography>
						<Typography>
							<strong>Address:</strong> {profile.personAddress}
						</Typography>
						<Typography>
							<strong>Phone:</strong> {profile.personPhoneNumber}
						</Typography>
						<Typography>
							<strong>Gender:</strong> {profile.personGender}
						</Typography>
						<Typography>
							<strong>Date of Birth:</strong> {profile.personDateOfBirth}
						</Typography>
					</Stack>
				</CardContent>
			</Card>
		</Container>
	);
}
