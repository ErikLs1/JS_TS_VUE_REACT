"use client"

import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Collapse,
	IconButton,
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
	Snackbar,
	Stack,
	TextField
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { OrderService } from '@/Services/OrderService';
import { PlacedOrderDto } from '@/Types/Responses/PlacedOrderDto';
import { ChangeOrderStatusDto } from '@/Types/Requests/ChangeOrderStatusDto';

const statusOptions = ['PENDING', 'CONFIRMED', 'IN_DELIVERY', 'DELIVERED', 'CANCELLED'];

// TODO REFACTORING LATER
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

			<Snackbar
				open={snackOpen}
				autoHideDuration={2000}
				onClose={() => setSnackOpen(false)}
				message="Order status updated"
			/>
		</Box>
	)
}

interface OrderRowProps {
	order: PlacedOrderDto;
	onStatusChange: (orderId: string, status: string) => void
}

function OrderRow ({ order, onStatusChange } : OrderRowProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton size="small" onClick={() => setOpen(o => !o)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>{`#${order.orderId.slice(0, 8)}`}</TableCell>
				<TableCell>{new Date(order.orderedAt).toLocaleDateString()}</TableCell>
				<TableCell>{`${order.customerFirstName} ${order.customerLastName}`}</TableCell>
				<TableCell>Some street</TableCell>
				<TableCell align="right">{order.totalNumberOfProducts}</TableCell>
				<TableCell>
					<FormControl size="small" sx={{ minWidth: 120 }}>
						<Select
							value={order.orderStatus}
							onChange={e => onStatusChange(order.orderId, e.target.value)}
						>
							{statusOptions.map(s => (
								<MenuItem key={s} value={s}>{s.replace('_', ' ')}</MenuItem>
							))}
						</Select>
					</FormControl>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ padding: 0 }} colSpan={7}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography variant="subtitle1" gutterBottom>Products</Typography>
							<Table size="small" aria-label="products">
								<TableHead>
									<TableRow>
										<TableCell>Product</TableCell>
										<TableCell align="right">Qty</TableCell>
										<TableCell align="right">Price</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order.products.map((p, idx) => (
										<TableRow key={idx}>
											<TableCell>{p.productName}</TableCell>
											<TableCell align="right">{p.quantity}</TableCell>
											<TableCell align="right">${p.orderProductPrice.toFixed(2)}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}
