"use client"

import Link from "next/link";
import {
	Autocomplete,
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Pagination,
	TextField,
	Typography
} from "@mui/material";
import {InventoryService} from "@/Services/InventoryService";
import {useEffect, useState} from "react";
import {InventoryProductsDto} from "@/Types/Responses/InventoryProductsDto";

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
							<CardActionArea component={Link} href={`/shopProductDetails/${item.productId}`}>
								<CardMedia
									component="img"
									height={160}
									image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.5ApqY5soOddRufcQKVrH1wHaGF%26cb%3Diwc2%26pid%3DApi&f=1&ipt=200ac27eb1d8e7342e20243cecc7b6368d8208bb372c0490c2cacee5a8afce4c&ipo=images"
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
		</Box>
	)
}
