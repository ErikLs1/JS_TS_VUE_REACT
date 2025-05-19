"use client";

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Box,
	Typography,
} from "@mui/material";
import { useState } from "react";

export interface CheckoutData {
	firstName: string;
	lastName: string;
	shippingAddress: string;
	cardNumber: string;
}

interface CheckoutDialogProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CheckoutData) => Promise<void>;
}

export default function CheckoutDialog({
										   open,
										   onClose,
										   onSubmit,
									   }: CheckoutDialogProps) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [shippingAddress, setShippingAddress] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [loading, setLoading] = useState(false);

	const handlePay = async () => {
		if (!firstName || !lastName || !shippingAddress || !cardNumber) return;
		setLoading(true);
		try {
			await onSubmit({ firstName, lastName, shippingAddress, cardNumber });
			// parent will close on success
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>Complete Your Order</DialogTitle>
			<DialogContent>
				<Box display="flex" flexDirection="column" gap={2} mt={1}>
					<TextField
						label="First Name"
						fullWidth
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<TextField
						label="Last Name"
						fullWidth
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<TextField
						label="Shipping Address"
						fullWidth
						value={shippingAddress}
						onChange={(e) => setShippingAddress(e.target.value)}
					/>
					<TextField
						label="Card Number"
						fullWidth
						placeholder="1234 5678 9012 3456"
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
					/>
					<Typography variant="caption" color="textSecondary">
						(This is a demo — any values will work.)
					</Typography>
				</Box>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="success"
					onClick={handlePay}
					disabled={
						loading ||
						!firstName ||
						!lastName ||
						!shippingAddress ||
						!cardNumber
					}
				>
					{loading ? "Processing…" : "Pay & Place Order"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
