"use client"

import {
	Autocomplete,
	Box,
	Button, Card, CardActionArea, CardContent, Grid,
	IconButton, Pagination,
	Paper, Slide, SlideProps, Snackbar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow, TextField, Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import {useContext, useEffect, useMemo, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {IWarehouse} from "@/Types/Domain/IWarehouse";
import {WarehouseService} from "@/Services/WarehouseService";
import SupplyOrderWarehousesDialog from "@/Components/SupplyOrderWarehousesDialog";
import SupplyOrderInfoDialog from "@/Components/SupplyOrderInfoDialog";
import SupplyCard from "@/Components/SupplyCard";
import SupplyMarketFilters from "@/Components/SupplyMarketFilters";
import {AccountContext} from "@/Context/AccountContext";
import {useRouter} from "next/navigation";
import {ProductSuppliersService} from "@/Services/ProductSuppliersService";
import {ProductSupplierDto} from "@/Types/Responses/ProductSupplierDto";

export default function SupplyMarket() {
	const productSuppliersService = new ProductSuppliersService();
	const { accountInfo } = useContext(AccountContext);
	const router = useRouter();

	// State for filter options
	const [cities, setCities]       = useState<string[]>([]);
	const [states, setStates]       = useState<string[]>([]);
	const [countries, setCountries]    = useState<string[]>([]);
	const [categories, setCategories]   = useState<string[]>([]);
	const [suppliers, setSuppliers]    = useState<string[]>([]);

	// State for selected filter values
	const [cityFilter,   setCityFilter]   = useState("");
	const [stateFilter,  setStateFilter]  = useState("");
	const [countryFilter,setCountryFilter]= useState("");
	const [categoryFilter, setCategoryFilter] = useState("");
	const [supplierFilter, setSupplierFilter] = useState("");

	// Paged data settings
	const [items, setItems] = useState<ProductSupplierDto[]>([]);
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize] = useState(18);
	const [totalCount, setTotalCount] = useState(0);

	// fetch distinct filters on render
	useEffect(() => {
		const storedJwt = localStorage.getItem("_jwt");
		if (!accountInfo?.jwt && !storedJwt) {
			router.push("/login")
			return;
		}

		const initFilters = async () => {
			const filters = await productSuppliersService.getFilters();
			if (!filters.errors && filters.data) {
				setCities(filters.data.cities);
				setStates(filters.data.states);
				setCountries(filters.data.countries);
				setCategories(filters.data.categories);
				setSuppliers(filters.data.suppliers);
			}
		}

		initFilters();
	}, []);


	// Reload page when  filters change or page number
	useEffect(() => {
		const initProducSuppliers = async () => {
			const productSuppliers = await productSuppliersService
				.getFilteredProductSuppliers(
					pageIndex,
					pageSize,
					cityFilter || undefined,
					stateFilter || undefined,
					countryFilter || undefined,
					categoryFilter || undefined,
					supplierFilter || undefined
				);

			if (!productSuppliers.errors && productSuppliers.data) {
				setItems(productSuppliers.data.items);
				setTotalCount(productSuppliers.data.totalCount);
			}
		}
		initProducSuppliers()
	}, [pageIndex,
		cityFilter,
		stateFilter,
		countryFilter,
		categoryFilter,
		supplierFilter
	]);


	// // dialog / order flow
	// const [selectedItem, setSelectedItem] = useState<SupplyItem | null>(null);
	// const [step,         setStep]         = useState<0|1>(0);
	// const [quantity,     setQuantity]     = useState(1);
	//
	// // warehouses & their own filters
	// const [warehouses,   setWarehouses]   = useState<IWarehouse[]>([]);
	// const [wCity,        setWCity]        = useState("");
	// const [wState,       setWState]       = useState("");
	// const [wCountry,     setWCountry]     = useState("");
	//
	// // snackbar
	// const [snackbarOpen, setSnackbarOpen] = useState(false);
	//
	// // load all warehouses once
	// useEffect(() => {
	// 	warehouseService.getAllAsync().then(res => {
	// 		if (!res.errors && res.data) setWarehouses(res.data);
	// 	});
	// }, []);
	//
	// // re‐filter warehouses when user hits step 1 or changes wCity/wState/wCountry
	// useEffect(() => {
	// 	if (step === 1) {
	// 		warehouseService
	// 			.getFilteredWarehouses({
	// 				city:    wCity   || undefined,
	// 				state:   wState  || undefined,
	// 				country: wCountry|| undefined,
	// 			})
	// 			.then(res => {
	// 				if (!res.errors && res.data) setWarehouses(res.data);
	// 			});
	// 	}
	// }, [step, wCity, wState, wCountry]);
	//
	//
	const openDialog = () => {

	};
	// const closeDialog = () => setSelectedItem(null);
	// const handleNext  = () => setStep(1);
	// const handleOrder = (warehouse: IWarehouse) => {
	// 	console.log(`Order ${quantity}×${selectedItem?.productName} to warehouse ${warehouse.id}`);
	// 	// TODO: API call here...
	// 	setSelectedItem(null);
	// 	setSnackbarOpen(true);
	// };

	return (
		<>
			<Box mt={8} mb={4} sx={{ maxWidth: 1000, mx: 'auto' }}>
				{/* Header */}
				<Typography variant="h4" component="h1">Stock market</Typography>

				{/* Filters */}
				<SupplyMarketFilters
					cities={cities} states={states} countries={countries}
					categories={categories} suppliers={suppliers} city={cityFilter}
					setCity={setCityFilter} state={stateFilter} setState={setStateFilter} country={countryFilter}
					setCountry={setCountryFilter} category={categoryFilter} setCategory={setCategoryFilter}
					supplier={supplierFilter} setSupplier={setSupplierFilter} onClear={ () => {
						setCityFilter(""); setStateFilter("");
						setCountryFilter(""); setCategoryFilter("");
						setSupplierFilter("");}}
				/>

				{/* Card products */}
				<Grid container spacing={2}>
					{items.map(item => (
						<SupplyCard
							key={item.id}
							item={{
								productName: item.product.productName,
								supplierName: item.supplier.supplierName,
								unitCost: item.unitCost,
							}}
							onClick={openDialog}
						/>
					))}
				</Grid>
				{/*{selectedItem && (*/}
				{/*	<Dialog open onClose={closeDialog} fullWidth maxWidth="md">*/}
				{/*		<DialogTitle>{selectedItem.productName}</DialogTitle>*/}
				{/*		<DialogContent dividers>*/}
				{/*			{step === 0 ? (*/}
				{/*				<>*/}
				{/*					<SupplyOrderInfoDialog*/}
				{/*						item={selectedItem}*/}
				{/*						quantity={quantity}*/}
				{/*						setQuantity={setQuantity}*/}
				{/*					/>*/}
				{/*				</>*/}
				{/*			) : (*/}
				{/*				<>  /!* step 1: choose warehouse *!/*/}
				{/*					<SupplyOrderWarehousesDialog*/}
				{/*						warehouses={warehouses}*/}
				{/*						cityFilter={wCity}*/}
				{/*						setCityFilter={setWCity}*/}
				{/*						stateFilter={wState}*/}
				{/*						setStateFilter={setWState}*/}
				{/*						countryFilter={wCountry}*/}
				{/*						setCountryFilter={setWCountry}*/}
				{/*						handleOrder={handleOrder}/>*/}
				{/*				</>*/}
				{/*			)}*/}
				{/*		</DialogContent>*/}
				{/*		<DialogActions>*/}
				{/*			<Button onClick={closeDialog}>Cancel</Button>*/}
				{/*			{step === 0 ? (*/}
				{/*				<Button onClick={handleNext} variant="contained">Next</Button>*/}
				{/*			) : null}*/}
				{/*		</DialogActions>*/}
				{/*	</Dialog>*/}
				{/*)}*/}

				{/*<Snackbar*/}
				{/*	open={snackbarOpen}*/}
				{/*	onClose={() => setSnackbarOpen(false)}*/}
				{/*	message="Order placed"*/}
				{/*	autoHideDuration={2000}*/}
				{/*/>*/}
				<Box mt={2} display="flex" justifyContent="center">
					<Pagination
						count={Math.ceil(totalCount / pageSize)}
						page={pageIndex}
						onChange={(_, p) => setPageIndex(p)}
					/>
				</Box>
			</Box>
		</>
	);
}
