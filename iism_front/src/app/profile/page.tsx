"use client"

import { AccountContext } from "@/Context/AccountContext";
import {useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {IUser} from "@/Types/Domain/IUser";
import {PersonsService} from "@/Services/PersonsService";
import {
	Accordion, AccordionDetails,
	AccordionSummary, Box,
	Card,
	CardContent,
	CardHeader,
	Container, Divider,
	Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Stack} from "@mui/system";
import {OrderService} from "@/Services/OrderService";
import {UserOrdersDto} from "@/Types/Responses/UserOrdersDto";

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

	return (
		<Container maxWidth="md" sx={{ mt: 4 }}>
			<Card sx={{ mb: 4 }}>
				<CardHeader title="My Profile" />
				<CardContent>
					<Stack spacing={2}>
						<Typography><strong>Name:</strong> {profile.personFirstName} {profile.personLastName}</Typography>
						<Typography><strong>Email:</strong> {profile.email}</Typography>
						<Typography><strong>Address:</strong> {profile.personAddress}</Typography>
						<Typography><strong>Phone:</strong> {profile.personPhoneNumber}</Typography>
					</Stack>
				</CardContent>
			</Card>

			<Typography variant="h5" gutterBottom>My Orders</Typography>
			{orders.length === 0 ? (
				<Typography>No orders found.</Typography>
			) : (
				orders.map((order, idx) => (
					<Accordion key={idx} sx={{ mb: 2 }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Box display="flex" justifyContent="space-between" width="100%">
								<Typography>Order #{idx + 1}</Typography>
								<Typography>{order.orderStatus}</Typography>
								<Typography>${order.orderTotalPrice.toFixed(2)}</Typography>
							</Box>
						</AccordionSummary>
						<AccordionDetails>
							<Typography><strong>Shipping:</strong> {order.orderShippingAddress}</Typography>
							<Divider sx={{ my: 1 }} />
							<Stack spacing={1}>
								{order.products.map((p, i) => (
									<Box key={i}>
										<Typography variant="subtitle1">{p.productName} x{p.quantity} — ${p.orderProductPrice.toFixed(2)}</Typography>
										<Typography variant="body2" color="textSecondary">{p.productDescription}</Typography>
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
