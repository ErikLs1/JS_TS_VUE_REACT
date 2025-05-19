"use client"

import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Stack,
	TextField
} from '@mui/material';
import { OrderService } from '@/Services/OrderService';
import { PlacedOrderDto } from '@/Types/Responses/PlacedOrderDto';
import OrderRow from "@/Components/OrderRow";
import SnackBarAlert from "@/Components/SnackBarAlert";

const statusOptions = ['PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELLED'];

// TODO - FILTERING LATER
export default function OrderManagement() {
	const orderService = new OrderService();
	const [orders, setOrders] = useState<PlacedOrderDto[]>([]);
	const [filterStatus, setFilterStatus] = useState<string>('ALL');
	const [snackOpen, setSnackOpen] = useState(false);

	const loadOrders = async () => {
		const res = await orderService.GetAllPlacedOrder();
		if (!res.errors && res.data) {
			setOrders(res.data);
		}
	}

	const handleStatusChange = async (orderId: string, newStatus: string)=> {
		await orderService.ChangeOrderStatus({
			orderId: orderId,
			orderStatus: newStatus
		});
		setSnackOpen(true);
		loadOrders();
	}

	const filtered = filterStatus === 'ALL'
		? orders
		: orders.filter(o => o.orderStatus === filterStatus);

	useEffect(() => {
		loadOrders();
	}, []);

	return (
		<Box mt={8} mb={4} px={2} sx={{ maxWidth: 1200, mx: 'auto' }}>
			<Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
				<Typography variant="h4">Orders</Typography>
				<Stack direction="row" spacing={2} alignItems="center">
					<FormControl size="small">
						<InputLabel>Status</InputLabel>
						<Select
							label="Status"
							value={filterStatus}
							onChange={e => setFilterStatus(e.target.value)}
							sx={{ width: 150 }}
						>
							<MenuItem value="ALL">All Status</MenuItem>
							{statusOptions.map(s => (
								<MenuItem key={s} value={s}>{s.replace('_', ' ')}</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						type="date"
						size="small"
						// TODO: wire up date filtering
					/>
					<Button variant="contained" onClick={loadOrders}>Apply Filters</Button>
				</Stack>
			</Stack>

			<Paper>
				<TableContainer>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell>Order ID</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Customer</TableCell>
								<TableCell>Address</TableCell>
								<TableCell align="right"># Items</TableCell>
								<TableCell>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filtered.map(order => (
								<OrderRow
									key={order.orderId}
									order={order}
									onStatusChange={handleStatusChange}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			{/* Snackbar Alert */}
			<SnackBarAlert
				open={snackOpen}
				alertType="success"
				message="Order status updated"
				duration={3000}
				action={() => setSnackOpen(false)}
			/>
		</Box>
	)
}
