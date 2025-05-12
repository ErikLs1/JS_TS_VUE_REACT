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

// Define the shape of your supply item
type SupplyItem = {
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

	// filter values
	const [cityFilter, setCityFilter] = useState<string>("");
	const [stateFilter, setStateFilter] = useState<string>("");
	const [countryFilter, setCountryFilter] = useState<string>("");
	const [categoryFilter, setCategoryFilter] = useState<string>("");
	const [supplierFilter, setSupplierFilter] = useState<string>("");

	// options fo each filter
	// const [cities, setCities] = useState<string[]>([]);
	// const [states, setStates] = useState<string[]>([]);
	// const [countries, setCountries] = useState<string[]>([]);
	// const [categories, setCategories] = useState<string[]>([]);
	// const [suppliers, setSuppliers] = useState<string[]>([]);

	// data for demo
	const cities= [ "Chicago", "Atlanta", "Long Beach", "Dallas" ];
	const states = [ "IL", "GA", "CA", "TX" ];
	const countries = [ "USA", "Canada", "Mexico" ];
	const categories = [ "Electronics", "Furniture", "Clothing", "Food & Beverage" ];
	const suppliers = [ "GlobalTech Ltd", "HomeComfort Inc", "FashionHub", "FreshHarvest Foods" ];


	// const handleEdit = (w: IWarehouse) => { setSelected(w); setEditOpen(true); };
	// const handleDelete = (w: IWarehouse) => { setSelected(w); setDeleteOpen(true);


	const warehouseService = new WarehouseService();
	// dialog states
	const [selectedItem, setSelectedItem] = useState<SupplyItem | null>(null);
	const [step, setStep] = useState<0 | 1>(0);
	const [quantity, setQuantity] = useState<number>(1);

	const handleClose = () => setSelectedItem(null);
	// warehouses & filters
	const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
	const [cityFilter1, setCityFilter1] = useState<string>('');
	const [stateFilter1, setStateFilter1] = useState<string>('');
	const [countryFilter1, setCountryFilter1] = useState<string>('');
	// load all warehouses initially
	useEffect(() => {
		(async () => {
			const res = await warehouseService.getAllAsync();
			if (!res.errors && res.data) setWarehouses(res.data);
		})();
	}, []);

	// re-filter on filter change
	useEffect(() => {
		if (step === 1) {
			(async () => {
				const res = await warehouseService.getFilteredWarehouses({
					city: cityFilter || undefined,
					state: stateFilter || undefined,
					country: countryFilter || undefined
				});
				if (!res.errors && res.data) setWarehouses(res.data);
			})();
		}
	}, [cityFilter, stateFilter, countryFilter, step]);

	const closeDialog = () => setSelectedItem(null);

	const openDialog = (item: SupplyItem) => {
		setSelectedItem(item);
		setQuantity(1);
		setStep(0);
	};

	// Snackbar state
	const [snackbarOpen, setSnackbarOpen]         = useState(false);

	const handleCardClick = (item: SupplyItem) => {
		setSelectedItem(item);
		setQuantity(1);
	};

	const handleDialogClose = () => setSelectedItem(null);

	const handleNext = () => setStep(1);
	const handleOrder = async (warehouse: IWarehouse) => {
		console.log(`Order ${quantity}x ${selectedItem?.productName} to`, warehouse.id);
		// TODO: API call
		setSelectedItem(null);
		setSnackbarOpen(true);
	};
	function SlideTransition(props: SlideProps) {
		return <Slide {...props} direction="up" />;
	}

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<>
			<Box mt={8} mb={4} sx={{ maxWidth: 1000, mx: 'auto' }}>
				{/* Header */}
				<Typography variant="h4" component="h1">Stock market</Typography>


				{/* Filters */}
				<Stack direction="row" spacing={2} mb={2}>
					<Autocomplete
						options={cities}
						value={cityFilter}
						onChange={(_, v) => setCityFilter(v ?? '')}
						getOptionLabel={(opt) => opt ?? ""}
						renderInput={params => <TextField {...params} label="City" variant="outlined" />}
						sx={{ width: 150 }}
					/>
					<Autocomplete
						options={states}
						value={stateFilter}
						onChange={(_, v) => setStateFilter(v ?? '')}
						getOptionLabel={(opt) => opt ?? ""}
						renderInput={params => <TextField {...params} label="State" variant="outlined" />}
						sx={{ width: 150 }}
					/>
					<Autocomplete
						options={countries}
						value={countryFilter}
						onChange={(_, v) => setCountryFilter(v ?? '')}
						getOptionLabel={(opt) => opt ?? ""}
						renderInput={params => <TextField {...params} label="Country" variant="outlined" />}
						sx={{ width: 150 }}
					/>
					<Autocomplete
						options={categories}
						value={categoryFilter}
						onChange={(_, v) => setCategoryFilter(v ?? '')}
						getOptionLabel={(opt) => opt ?? ""}
						renderInput={params => <TextField {...params} label="Category" variant="outlined" />}
						sx={{ width: 150 }}
					/>
					<Autocomplete
						options={suppliers}
						value={supplierFilter}
						onChange={(_, v) => setSupplierFilter(v ?? '')}
						getOptionLabel={(opt) => opt ?? ""}
						renderInput={params => <TextField {...params} label="Supplier" variant="outlined" />}
						sx={{ width: 150 }}
					/>
					<Button onClick={() => {
						setCityFilter('');
						setStateFilter('');
						setCountryFilter('');
						setCategoryFilter('');
						setSupplierFilter('');
					}}>
						Clear
					</Button>
				</Stack>

				{/* Card products */}
				<Grid container spacing={2}>
					{dummyItems.map((item, idx) => (
						<Grid size={{ xs: 12, sm: 6, md: 4}} key={idx}>
							<Card>
								<CardActionArea onClick={ () => handleCardClick(item)}>
									<CardContent>
										<Typography variant="h6">
											{item.productName}
										</Typography>
										<Typography variant="subtitle2" color="text.secondary">
											{item.supplierName}
										</Typography>
										<Typography variant="body2">
											${item.unitCost} / unit
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
				{selectedItem && (
					<Dialog open onClose={closeDialog} fullWidth maxWidth="md">
						<DialogTitle>{selectedItem.productName}</DialogTitle>
						<DialogContent dividers>
							{step === 0 ? (
								<>
									<Typography>Category: {selectedItem.category}</Typography>
									<Typography>{selectedItem.description}</Typography>
									<Typography variant="subtitle2">Supplier info:</Typography>
									<Typography>Name: {selectedItem.supplierName}</Typography>
									<Typography>Address: {selectedItem.supplierAddress}</Typography>
									<Typography>Email: {selectedItem.supplierEmail}</Typography>
									<Typography>Phone: {selectedItem.supplierPhone}</Typography>
									<TextField
										size="small"
										label="Qty"
										type="number"
										InputProps={{ inputProps: { min: 1 } }}
										value={quantity}
										onChange={e => setQuantity(Math.max(1, parseInt(e.target.value)||1))}
									/>
								</>
							) : (
								<>  {/* step 1: choose warehouse */}
									<Stack direction="row" spacing={2} mb={2}>
										<Autocomplete
											options={[...new Set(warehouses.map(w=>w.warehouseAddress))]}
											value={cityFilter}
											onChange={(_, v) => setCityFilter(v||'')}
											renderInput={p=><TextField {...p} label="City" size="small"/>}
											sx={{ width:120 }}
										/>
										<Autocomplete
											options={[...new Set(warehouses.map(w=>w.warehouseAddress))]}
											value={stateFilter}
											onChange={(_, v) => setStateFilter(v||'')}
											renderInput={p=><TextField {...p} label="State" size="small"/>}
											sx={{ width:120 }}
										/>
										<Autocomplete
											options={[...new Set(warehouses.map(w=>w.warehouseAddress))]}
											value={countryFilter}
											onChange={(_, v) => setCountryFilter(v||'')}
											renderInput={p=><TextField {...p} label="Country" size="small"/>}
											sx={{ width:120 }}
										/>
									</Stack>
									<TableContainer component={Paper}>
										<Table size="small">
											<TableHead>
												<TableRow>
													<TableCell>Address</TableCell>
													<TableCell>Email</TableCell>
													<TableCell align="right">Capacity</TableCell>
													<TableCell align="center">Order Here</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{warehouses.map(w => (
													<TableRow key={w.id} hover>
														<TableCell>{w.warehouseAddress}</TableCell>
														<TableCell>{w.warehouseEmail}</TableCell>
														<TableCell align="right">{w.warehouseCapacity}</TableCell>
														<TableCell align="center">
															<Button size="small" onClick={() => handleOrder(w)}>
																Order
															</Button>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
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
