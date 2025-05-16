"use client"

import {
	Autocomplete,
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	DialogContent,
	Grid, IconButton,
	Pagination,
	TextField,
	Typography
} from "@mui/material";
import {InventoryService} from "@/Services/InventoryService";
import RemoveIcon from '@mui/icons-material/Remove';
import {useEffect, useState} from "react";
import {InventoryProductsDto} from "@/Types/Responses/InventoryProductsDto";
import Dialog from "@mui/material/Dialog";
import { useCart } from "@/Context/CartContext";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";

export default function ShopProducts() {
	const inventoryService = new InventoryService();
	const [items, setItems] = useState<InventoryProductsDto[]>([]);
	const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
	const [category, setCategory] = useState<string | null>(null);
	const [productName, setProductName] = useState<string>("")
	const [page, setPage] = useState(1);
	const pageSize = 12;
	const [totalCount, setTotalCount] = useState(0);
	const [allCategories, setAllCategories] = useState<string[]>([]);
	const { addItem } = useCart();

	// Dialog state
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const load = async () =>  {
			const res = await inventoryService.GetInventoryProducts();
			if (!res.errors && res.data) {
				setTotalCount(res.data.length);
				setItems(res.data.slice((page - 1) * pageSize, page * pageSize));
			}
		}
		load();
	}, []);

	const applyFilters = async () => {
		const res = await inventoryService.GetFilteredInventoryProducts(minPrice, maxPrice, category || undefined, productName || undefined);
		if (!res.errors && res.data) {
			setTotalCount(res.data.length);
			const start = (page - 1) * pageSize;
			setItems(res.data.slice(start, start + pageSize));
		}
	};

	// Re-run when filters or page change
	useEffect(() => {
		applyFilters();
	}, [minPrice, maxPrice, category, productName, page]);

	// find currently selected product
	const selectedProduct = items.find(p => p.productId === selectedProductId) || null;

	// handle add to cart
	const handleAddToCart = () => {
		if (selectedProduct) {
			addItem(
				{
					productId: selectedProduct.productId,
					name: selectedProduct.productName,
					price: selectedProduct.productPrice,
					img: ''
				},
				quantity
			);
		}
		setDialogOpen(false);
		setQuantity(1);
	};

	return (
		<Box mt={8} mb={4} sx={{ mx: 'auto', px: 2, maxWidth: 1200 }}>
			{/* Title */}
			<Typography variant="h4" component="h1" gutterBottom>
				Inventory Products
			</Typography>

			{/* Filters */}
			<Box display="flex" gap={2} flexWrap="wrap" mb={4}>
				<TextField
					label="Product name"
					value={productName}
					onChange={e => setProductName(e.target.value)}
				/>
				<Autocomplete
					options={allCategories}
					value={category}
					onChange={(_, v) => setCategory(v)}
					renderInput={params => <TextField {...params} label="Category" />}
					sx={{ width: 200 }}
				/>
				<TextField
					label="Min price"
					type="number"
					value={minPrice ?? ''}
					onChange={e => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
				/>
				<TextField
					label="Max price"
					type="number"
					value={maxPrice ?? ''}
					onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
				/>
				<Button variant="outlined" onClick={() => { setPage(1); applyFilters(); }}>Apply</Button>
				<Button onClick={() => {
					setProductName(''); setCategory(null); setMinPrice(undefined); setMaxPrice(undefined); setPage(1);
				}}>
					Clear
				</Button>
			</Box>

			{/* Product Grid */}
			<Grid container spacing={2}>
				{items.map(item => (
					<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`${item.productId}-${item.warehouseId}`}>
						<Card>
							<CardActionArea
								onClick={() => {
									setSelectedProductId(item.productId);
									setDialogOpen(true);
								}}
							>
								<CardMedia
									component="img"
									height={200}
									image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.1Ci7Tf9gz235soLOWO_K3gHaIT%26cb%3Diwc2%26pid%3DApi&f=1&ipt=36cb3347d06202f7d724086e9edaaea9c827eb4ab7046daaad82f2c203c00e8c&ipo=images"
									alt={item.productName}
								/>
								<CardContent>
									<Typography variant="h6">{item.productName}</Typography>
									<Typography variant="body2" color="textSecondary">
										{item.categoryName}
									</Typography>
									<Typography variant="subtitle1" color="primary">
										${item.productPrice.toFixed(2)}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>

			{/* Pagination */}
			<Box mt={4} display="flex" justifyContent="center">
				<Pagination
					count={Math.ceil(totalCount / pageSize)}
					page={page}
					onChange={(_, p) => setPage(p)}
				/>
			</Box>

			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle>Order "{selectedProduct?.productName}"</DialogTitle>
				<DialogContent dividers>
					<Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
						<img
							src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FbfoU3lS7I6GXz5QjfPRvwHaHa%26pid%3DApi&f=1&ipt=d728fb9d4d1d5c76693c7ac182252ed3fa6a7fc209083a370896b7398079d3b0&ipo=images'}
							alt={selectedProduct?.productName}
							style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 4 }}
						/>
						<Box>
							<Typography variant="body1" gutterBottom>
								{selectedProduct?.productDescription}
							</Typography>
							<Typography variant="h6" color="primary" gutterBottom>
								Price: ${selectedProduct?.productPrice.toFixed(2)}
							</Typography>
							<Box display="flex" alignItems="center" gap={1} mt={1}>
								<IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))}>
									<RemoveIcon />
								</IconButton>
								<TextField
									value={quantity}
									onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))}
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									sx={{ width: 64 }}
								/>
								<IconButton onClick={() => setQuantity(q => q + 1)}>
									<AddIcon />
								</IconButton>
							</Box>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialogOpen(false)}>Cancel</Button>
					<Button
						variant="contained"
						color="success"
						onClick={handleAddToCart}
					>
						Add to Cart
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

