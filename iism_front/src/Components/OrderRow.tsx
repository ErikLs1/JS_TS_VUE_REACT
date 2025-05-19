"use client"

import React, { useState } from 'react';
import {
	Box,
	Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	Select,
	MenuItem,
	FormControl,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { PlacedOrderDto } from '@/Types/Responses/PlacedOrderDto';

const statusOptions = ['PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELLED'];

interface OrderRowProps {
	order: PlacedOrderDto;
	onStatusChange: (orderId: string, status: string) => void
}

export default function OrderRow ({ order, onStatusChange } : OrderRowProps) {
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
