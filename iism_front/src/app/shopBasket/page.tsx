'use client'

import Image from 'next/image'
import { useCart } from '@/Context/CartContext'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	IconButton, Snackbar,
	TextField,
	Typography
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import { OrderService } from '@/Services/OrderService';
import {useRouter} from "next/navigation";
import {CreateOrderProductDto} from "@/Types/Requests/CreateOrderProductDto";
import {CreateOrderDto} from "@/Types/Requests/CreateOrderDto";

export default function BasketPage() {
	const { items, updateQty, clear } = useCart()
	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
	const shipping = items.length ? 3.99 : 0;
	const tax = items.length ? 2.0 : 0;
	const total = subtotal + shipping + tax;
	const orderService = new OrderService();
	const [snackOpen, setSnackOpen] = useState(false);
	const router = useRouter();

	const handleOrder = async () => {
		if (items.length === 0) return;
		const products: CreateOrderProductDto[] = items.map(i => ({
			productId: i.productId,
			quantity: i.quantity
		}));
		const dto: CreateOrderDto = {
			shippingAddress: '',
			paymentMethod: '',
			products
		};
		const res = await orderService.PlaceTheOrder(dto);
		if (!res.errors) {
			setSnackOpen(true);
			clear();
			setTimeout(() => router.push('/profile'), 1500);
		} else {
			console.error(res.errors);
		}
	};

	return (
		<Box px={2} py={5} sx={{ maxWidth: 1200, mx: 'auto' }}>
			<Typography variant="h4" gutterBottom>
				Basket <Typography component="span" color="textSecondary">({items.length} {items.length === 1 ? 'item' : 'items'})</Typography>
			</Typography>

			<Grid container spacing={4}>
				{/* Items list */}
				<Grid size={{ xs: 12, md: 8 }}>
					<Box display="flex" flexDirection="column" gap={2}>
						{items.length === 0 && (
							<Typography>No items in your basket.</Typography>
						)}
						{items.map(item => (
							<Card key={item.productId} sx={{ display: 'flex', alignItems: 'center' }}>
								<CardMedia>
									{item.img ? (
										<Image src={item.img} alt={item.name} width={100} height={75} style={{ objectFit: 'cover' }} />
									) : (
										<Box bgcolor="grey.200" width={100} height={75} />
									)}
								</CardMedia>
								<CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
									<Box flexGrow={1}>
										<Typography variant="h6">{item.name}</Typography>
										<Typography color="primary" fontWeight="bold">
											${item.price.toFixed(2)} each
										</Typography>
									</Box>
									<Box display="flex" alignItems="center">
										<IconButton onClick={() => updateQty(item.productId, item.quantity - 1)}>
											<RemoveIcon />
										</IconButton>
										<TextField
											value={item.quantity}
											size="small"
											sx={{ width: 60, mx: 1 }}
											inputProps={{ style: { textAlign: 'center' } }}
										/>
										<IconButton onClick={() => updateQty(item.productId, item.quantity + 1)}>
											<AddIcon />
										</IconButton>
									</Box>
									<Typography variant="subtitle1" sx={{ minWidth: 80, textAlign: 'right' }}>
										${(item.price * item.quantity).toFixed(2)}
									</Typography>
								</CardContent>
							</Card>
						))}
					</Box>
				</Grid>

				{/* Order summary */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Card sx={{ p: 2 }}>
						<Typography variant="h6" gutterBottom>Order summary</Typography>
						<Divider />
						<Box display="flex" justifyContent="space-between" my={1}>
							<Typography>Subtotal</Typography>
							<Typography>${subtotal.toFixed(2)}</Typography>
						</Box>
						<Box display="flex" justifyContent="space-between" mb={1}>
							<Typography>Shipping</Typography>
							<Typography>${shipping.toFixed(2)}</Typography>
						</Box>
						<Box display="flex" justifyContent="space-between" mb={1}>
							<Typography>Tax</Typography>
							<Typography>${tax.toFixed(2)}</Typography>
						</Box>
						<Divider />
						<Box display="flex" justifyContent="space-between" my={2}>
							<Typography variant="subtitle1" fontWeight="bold">Total</Typography>
							<Typography variant="subtitle1" fontWeight="bold">${total.toFixed(2)}</Typography>
						</Box>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							sx={{ mb: 1 }}
							onClick={handleOrder}
						>
							Continue to payment →
						</Button>
						<Button variant="text" fullWidth onClick={clear}>
							Empty basket
						</Button>
					</Card>
				</Grid>
				<Snackbar
					open={snackOpen}
					onClose={() => setSnackOpen(false)}
					message="Order placed"
					autoHideDuration={2000}
				/>
			</Grid>
		</Box>
	)
}
