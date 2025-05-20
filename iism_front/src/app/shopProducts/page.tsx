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

const PAGE_SIZE = 8;
export default function ShopProducts() {
	const inventoryService = new InventoryService();
	const categoryService = new CategoryService();
	const { accountInfo } = useContext(AccountContext);
	const { addItem } = useCart();
	const [items, setItems] = useState<InventoryProductsDto[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [page, setPage] = useState(1);
	const [minPrice, setMinPrice] = useState<number>();
	const [maxPrice, setMaxPrice] = useState<number>();
	const [category, setCategory] = useState<string | null>(null);
	const [productName, setProductName] = useState<string>("");
	const [allCategories, setAllCategories] = useState<string[]>([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState<string>();
	const [quantity, setQuantity] = useState(1);
	const [loginAlertOpen, setLoginAlertOpen] = useState(false);
	const [successAlertOpen, setSuccessAlertOpen] = useState(false);

	useEffect(() => {
		(async () => {
			const catRes = await categoryService.getCategoryNames();
			if (!catRes.errors && catRes.data) {
				setAllCategories(catRes.data.categoryNames);
			}
			await fetchPage(1);
		})();
	}, []);

	const fetchPage = async (pageIndex: number) => {
		const res = await inventoryService.GetFilteredInventoryProducts(
			pageIndex,
			PAGE_SIZE,
			minPrice,
			maxPrice,
			category ?? undefined,
			productName || undefined
		);

		if (!res.errors && res.data) {
			setItems(res.data.items);
			setTotalCount(res.data.totalCount);
			setPage(pageIndex);
		}
	};

	const applyFilters = () => fetchPage(1);


	const clearFilters = async () => {
		setMinPrice(undefined);
		setMaxPrice(undefined);
		setCategory(null);
		setProductName("");
	};

	useEffect(() => {
		fetchPage(1);
	}, [minPrice, maxPrice, category, productName]);

	const selectedProduct = items.find(p => p.productId === selectedProductId) || null;

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
				onApply={applyFilters}
				onClear={clearFilters}
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
					count={Math.ceil(totalCount / PAGE_SIZE)}
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

