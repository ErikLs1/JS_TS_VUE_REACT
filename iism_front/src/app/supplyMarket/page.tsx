"use client"

import {
	Autocomplete,
	Box,
	Button, Card, CardActionArea, CardContent, Grid,
	IconButton,
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

// Define the shape of your supply item
export type SupplyItem = {
	productName: string;
	category:    string;
	description: string;
	supplierName:    string;
	supplierAddress: string;
	supplierEmail:   string;
	supplierPhone:   string;
	unitCost:        number;
};

// Dummy data array
const dummyItems: SupplyItem[] = Array.from({ length: 8 }).map((_, i) => ({
	productName:    `Product ${i + 1}`,
	category:       ['Electronics','Furniture','Clothing','Food'][i % 4],
	description:    `Description for product ${i + 1}`,
	supplierName:   `Supplier ${((i % 4) + 1)}`,
	supplierAddress:`123 Main St, City ${i + 1}`,
	supplierEmail:  `supplier${i+1}@example.com`,
	supplierPhone:  `+1-800-000-${1000 + i}`,
	unitCost:       10 + i * 2
}));

export default function SupplyMarket() {
	const warehouseService = new WarehouseService();

	const [cities]       = useState(["Chicago","Atlanta","Long Beach","Dallas"]);
	const [states]       = useState(["IL","GA","CA","TX"]);
	const [countries]    = useState(["USA","Canada","Mexico"]);
	const [categories]   = useState(["Electronics","Furniture","Clothing","Food & Beverage"]);
	const [suppliers]    = useState(["GlobalTech Ltd","HomeComfort Inc","FashionHub","FreshHarvest Foods"]);

	const [cityFilter,   setCityFilter]   = useState("");
	const [stateFilter,  setStateFilter]  = useState("");
	const [countryFilter,setCountryFilter]= useState("");
	const [categoryFilter, setCategoryFilter] = useState("");
	const [supplierFilter, setSupplierFilter] = useState("");

	// dialog / order flow
	const [selectedItem, setSelectedItem] = useState<SupplyItem | null>(null);
	const [step,         setStep]         = useState<0|1>(0);
	const [quantity,     setQuantity]     = useState(1);

	// warehouses & their own filters
	const [warehouses,   setWarehouses]   = useState<IWarehouse[]>([]);
	const [wCity,        setWCity]        = useState("");
	const [wState,       setWState]       = useState("");
	const [wCountry,     setWCountry]     = useState("");

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	// load all warehouses once
	useEffect(() => {
		warehouseService.getAllAsync().then(res => {
			if (!res.errors && res.data) setWarehouses(res.data);
		});
	}, []);

	// re‐filter warehouses when user hits step 1 or changes wCity/wState/wCountry
	useEffect(() => {
		if (step === 1) {
			warehouseService
				.getFilteredWarehouses({
					city:    wCity   || undefined,
					state:   wState  || undefined,
					country: wCountry|| undefined,
				})
				.then(res => {
					if (!res.errors && res.data) setWarehouses(res.data);
				});
		}
	}, [step, wCity, wState, wCountry]);


	const openDialog = (item: SupplyItem) => {
		setSelectedItem(item);
		setQuantity(1);
		setStep(0);
		// reset warehouse filters too:
		setWCity("");
		setWState("");
		setWCountry("");
	};
	const closeDialog = () => setSelectedItem(null);
	const handleNext  = () => setStep(1);
	const handleOrder = (warehouse: IWarehouse) => {
		console.log(`Order ${quantity}×${selectedItem?.productName} to warehouse ${warehouse.id}`);
		// TODO: API call here...
		setSelectedItem(null);
		setSnackbarOpen(true);
	};

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
					{dummyItems.map((item, idx) => (
						<SupplyCard
							key={item.productName}
							item={item}
							onClick={openDialog}
						/>
					))}
				</Grid>
				{selectedItem && (
					<Dialog open onClose={closeDialog} fullWidth maxWidth="md">
						<DialogTitle>{selectedItem.productName}</DialogTitle>
						<DialogContent dividers>
							{step === 0 ? (
								<>
									<SupplyOrderInfoDialog
										item={selectedItem}
										quantity={quantity}
										setQuantity={setQuantity}
									/>
								</>
							) : (
								<>  {/* step 1: choose warehouse */}
									<SupplyOrderWarehousesDialog
										warehouses={warehouses}
										cityFilter={wCity}
										setCityFilter={setWCity}
										stateFilter={wState}
										setStateFilter={setWState}
										countryFilter={wCountry}
										setCountryFilter={setWCountry}
										handleOrder={handleOrder}/>
								</>
							)}
						</DialogContent>
						<DialogActions>
							<Button onClick={closeDialog}>Cancel</Button>
							{step === 0 ? (
								<Button onClick={handleNext} variant="contained">Next</Button>
							) : null}
						</DialogActions>
					</Dialog>
				)}

				<Snackbar
					open={snackbarOpen}
					onClose={() => setSnackbarOpen(false)}
					message="Order placed"
					autoHideDuration={2000}
				/>
			</Box>
		</>
	);
}
