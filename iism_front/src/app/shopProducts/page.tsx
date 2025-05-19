"use client"

import {
	Box,
	Grid,
	Pagination,
	Typography
} from "@mui/material";
import {InventoryService} from "@/Services/InventoryService";
import {useContext, useEffect, useState} from "react";
import {InventoryProductsDto} from "@/Types/Responses/InventoryProductsDto";
import { useCart } from "@/Context/CartContext";
import {AccountContext} from "@/Context/AccountContext";
import SnackBarAlert from "@/Components/SnackBarAlert";
import ShopProductFilters from "@/Components/filters/ProductFilters";
import ShopProductDialog from "@/Components/dialogs/ShopProductDialog";
import ShopProductCard from "@/Components/ShopProductCard";
import {CategoryService} from "@/Services/CategoryService";

// TODO 1) PAGINATION;
export default function ShopProducts() {
	const inventoryService = new InventoryService();
	const categoryService = new CategoryService();
	const { accountInfo } = useContext(AccountContext);
	const { addItem } = useCart();

	// States
	const [items, setItems] = useState<InventoryProductsDto[]>([]);
	const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
	const [category, setCategory] = useState<string | null>(null);
	const [productName, setProductName] = useState<string>("")
	const [page, setPage] = useState(1);
	const pageSize = 12;
	const [totalCount, setTotalCount] = useState(0);
	const [allCategories, setAllCategories] = useState<string[]>([]);

	// Dialog + alert
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
	const [quantity, setQuantity] = useState(1);
	const [loginAlertOpen, setLoginAlertOpen] = useState(false);
	const [successAlertOpen, setSuccessAlertOpen] = useState(false);

	// Load initial data
	useEffect(() => {
		const load = async () =>  {
			const res = await inventoryService.GetInventoryProducts();
			if (!res.errors && res.data) {
				setTotalCount(res.data.length);
				setItems(res.data.slice((page - 1) * pageSize, page * pageSize));
			}

			const categories = await categoryService.getCategoryNames()
			if (!categories.errors && categories.data) {
				setAllCategories(categories.data.categoryNames);
			}
		}
		load();
	}, []);

	const applyFilters = async () => {
		const res =
			!minPrice && !maxPrice &&
			!category && productName === ""
			? await inventoryService.GetInventoryProducts()
			: await inventoryService.GetFilteredInventoryProducts(minPrice, maxPrice, category || undefined, productName || undefined)

		if (!res.errors && res.data) {
			setTotalCount(res.data.length);
			const start = (page - 1) * pageSize;
			setItems(res.data.slice(start, start + pageSize));
		}
	};

	// Clear filters helper function
	const clearFilters = async () => {
		setProductName("");
		setCategory(null);
		setMinPrice(undefined);
		setMaxPrice(undefined);
		setPage(1);
		const res = await inventoryService.GetInventoryProducts()
		if (!res.errors && res.data) {
			setTotalCount(res.data.length)
			const start = (page - 1) * pageSize;
			setItems(res.data.slice(start, start + pageSize));
		}
	}

	// Re-run when filters or page change
	useEffect(() => {
		clearFilters();
		applyFilters();
	}, [page]);

	// find currently selected product
	const selectedProduct = items.find(p => p.productId === selectedProductId) || null;

	// handle add to cart
	const handleAddToCart = () => {
		if (!accountInfo?.jwt) {
			setLoginAlertOpen(true);
			return;
		}
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
			setSuccessAlertOpen(true);
		}
		setDialogOpen(false);
		setQuantity(1);
	};

	return (
		<Box mt={8} mb={4} sx={{ mx: 'auto', px: 2, maxWidth: 1200 }}>
			{/* TITLE */}
			<Typography variant="h4" component="h1" gutterBottom>
				Products
			</Typography>

			{/* FILTERS */}
			<ShopProductFilters
				productName={productName}
				onProductNameChange={setProductName}
				category={category}
				onCategoryChange={setCategory}
				minPrice={minPrice}
				onMinPriceChange={setMinPrice}
				maxPrice={maxPrice}
				onMaxPriceChange={setMaxPrice}
				categories={allCategories}
				onApply={() => { setPage(1); applyFilters(); }}
				onClear={() => { clearFilters();}}
			/>

			{/* PRODUCTS GRID */}
			<Grid container spacing={2}>
				{items.map(item => (
					<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`${item.productId}-${item.warehouseId}`}>
						<ShopProductCard
							item={item}
							onSelect={(id) => {
								setSelectedProductId(id);
								setDialogOpen(true);
							}}
						/>
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

			{/* DIALOG */}
			<ShopProductDialog
				open={dialogOpen}
				product={selectedProduct}
				quantity={quantity}
				onQuantityChange={setQuantity}
				onClose={() => setDialogOpen(false)}
				onAddToCart={handleAddToCart}
			/>

			{/* Snackbar Alerts */}
			<SnackBarAlert
				open={loginAlertOpen}
				alertType="warning"
				message="Please log in / register to add items to your cart."
				duration={3000}
				action={() => setLoginAlertOpen(false)}
			/>
			<SnackBarAlert
				open={successAlertOpen}
				alertType="success"
				message="Product added to cart!"
				duration={3000}
				action={() => setSuccessAlertOpen(false)}
			/>
		</Box>
	)
}

