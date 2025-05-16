"use client"

import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Box,
	Typography,
	IconButton,
	TextField,
	Button
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { InventoryProductsDto } from "@/Types/Responses/InventoryProductsDto";

interface ShopProductDialogProps {
	open: boolean;
	product: InventoryProductsDto | null;
	quantity: number;
	onQuantityChange: (q: number) => void;
	onClose: () => void;
	onAddToCart: () => void;
}

export default function ShopProductDialog({
											  open,
											  product,
											  quantity,
											  onQuantityChange,
											  onClose,
											  onAddToCart
										  } : ShopProductDialogProps) {
	if (!product) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>Order "{product?.productName}"</DialogTitle>
			<DialogContent dividers>
				<Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
					<img
						src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FbfoU3lS7I6GXz5QjfPRvwHaHa%26pid%3DApi&f=1&ipt=d728fb9d4d1d5c76693c7ac182252ed3fa6a7fc209083a370896b7398079d3b0&ipo=images'}
						alt={product?.productName}
						style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 4 }}
					/>
					<Box>
						<Typography variant="body1" gutterBottom>
							{product?.productDescription}
						</Typography>
						<Typography variant="h6" color="primary" gutterBottom>
							Price: ${product?.productPrice.toFixed(2)}
						</Typography>
						<Box display="flex" alignItems="center" gap={1} mt={1}>
							<IconButton onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>
								<RemoveIcon />
							</IconButton>
							<TextField
								value={quantity}
								onChange={e => onQuantityChange(Math.max(1, Number(e.target.value) || 1))}
								inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
								sx={{ width: 64 }}
							/>
							<IconButton onClick={() => onQuantityChange(quantity + 1)}>
								<AddIcon />
							</IconButton>
						</Box>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained" color="success" onClick={onAddToCart}>
					Add to Cart
				</Button>
			</DialogActions>
		</Dialog>
	)
}
