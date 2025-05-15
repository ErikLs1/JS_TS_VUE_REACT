'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/Context/CartContext'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	IconButton,
	TextField,
	Typography
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function BasketPage() {
	const { items, updateQty, clear } = useCart()
	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
	const shipping = items.length ? 3.99 : 0
	const tax = items.length ? 2.0 : 0
	const total = subtotal + shipping + tax

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
						<Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
							Continue to payment →
						</Button>
						<Button variant="text" fullWidth onClick={clear}>
							Empty basket
						</Button>
					</Card>
				</Grid>
			</Grid>
		</Box>
	)
}
