"use client"

import { AccountContext } from "@/Context/AccountContext";
import {useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {IUser} from "@/Types/Domain/IUser";
import {PersonsService} from "@/Services/PersonsService";
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
import {OrderService} from "@/Services/OrderService";
import {UserOrdersDto} from "@/Types/Responses/UserOrdersDto";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Profile() {
	const personService = new PersonsService();
	const orderService = new OrderService();

	const { accountInfo } = useContext(AccountContext);
	const router = useRouter();
	const [profile, setProfile] = useState<IUser>();
	const [orders, setOrders] = useState<UserOrdersDto[]>([])

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

		// Get user orders
		orderService.GetUsersOrders().then(res => {
			if (!res.errors && res.data) setOrders(res.data);
		});
	}, []);

	if (!profile) return null;

	// helper to pick chip color
	const statusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
				return "error";
			case "shipping":
				return "warning";
			case "delivered":
				return "success";
			default:
				return "default";
		}
	};

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

			<Typography variant="h5" gutterBottom>
				My Orders
			</Typography>

			{orders.length === 0 ? (
				<Typography>No orders found.</Typography>
			) : (
				orders.map((order, idx) => (
					<Accordion key={idx} sx={{ mb: 2 }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
								<Typography>Order #{idx + 1}</Typography>
								<Chip
									label={order.orderStatus}
									size="small"
									variant="outlined"
									color={statusColor(order.orderStatus)}
								/>
								<Typography>${order.orderTotalPrice.toFixed(2)}</Typography>
							</Box>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								<strong>Shipping:</strong> {order.orderShippingAddress}
							</Typography>
							<Divider sx={{ my: 1 }} />
							<Stack spacing={1}>
								{order.products.map((p, i) => (
									<Box key={i}>
										<Typography variant="subtitle1">
											{p.productName} x{p.quantity} — ${p.orderProductPrice.toFixed(2)}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											{p.productDescription}
										</Typography>
									</Box>
								))}
							</Stack>
						</AccordionDetails>
					</Accordion>
				))
			)}
		</Container>
	);
}
