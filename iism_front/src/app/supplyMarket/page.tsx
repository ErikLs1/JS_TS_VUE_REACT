"use client"

import {
	Box,
	Button, Grid,
	Pagination,
	Snackbar,
	Typography
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
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
import {StockOrderService} from "@/Services/StockOrderService";
import {CreateStockOrderRequest} from "@/Types/Requests/CreateStockOrderRequest";

// TODO REFACTORING
export default function SupplyMarket() {
	const productSuppliersService = new ProductSuppliersService();
	const warehouseService = new WarehouseService();
	const stockOrderService = new StockOrderService();

	const { accountInfo } = useContext(AccountContext);
	const router = useRouter();

	// State for product supplier filter options
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

	// Dialog state
	const [selectedProductSupplier, setSelectedProductSupplier] = useState<ProductSupplierDto | null>(null);
	const [step, setStep] = useState<0 | 1>(0);
	const [quantity, setQuantity] = useState(1);

	// State for warehouse filter options
	const [wStreets, setWStreets] = useState<string[]>([]);
	const [wCities, setWCities] = useState<string[]>([]);
	const [wStates, setWStates] = useState<string[]>([]);
	const [wCuntries, setWCountries] = useState<string[]>([]);


	// Warehouses + filters
	const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
	const [wStreetFilter, setWStreetFilter] = useState("");
	const [wCityFilter, setWCityFilter] = useState("");
	const [wStateFilter, setWStateFilter] = useState("");
	const [wCountryFilter, setWCountryFilter] = useState("");

	// Snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);

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
		const initProductSuppliers = async () => {
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
		initProductSuppliers()
	}, [pageIndex,
		cityFilter,
		stateFilter,
		countryFilter,
		categoryFilter,
		supplierFilter
	]);


	// initial warehouses loading
	useEffect(() => {
		const initWarehousesAndFilters = async () => {
			const filters = await warehouseService.getFilters();
			if (!filters.errors && filters.data) {
				setWStreets(filters.data.streets);
				setWCities(filters.data.cities);
				setWStates(filters.data.states);
				setWCountries(filters.data.countries);
			}

			const warehouses = await warehouseService.getAllAsync();
			if (!warehouses.errors && warehouses.data) {
				setWarehouses(warehouses.data);
			}
		}

		initWarehousesAndFilters();
	}, []);

	// reload each time filters change
	useEffect(() => {
		const initFilteredWarehouses = async () => {
			if (step === 1) {
				var res = await warehouseService.getFilteredWarehouses({
					street: wStreetFilter || undefined,
					city: wCityFilter || undefined,
					state: wStateFilter || undefined,
					country: wCountryFilter || undefined
				})

				if (!res.errors && res.data) {
					setWarehouses(res.data);
				}
			}
		}

		initFilteredWarehouses();
	}, [step, wStreetFilter, wCityFilter, wStateFilter, wCountryFilter]);


	const openDialog = (ps: ProductSupplierDto) => {
		setSelectedProductSupplier(ps);
		setQuantity(1);
		setStep(0);
		setWStreetFilter("");
		setWCityFilter("");
		setWStateFilter("");
		setWCountryFilter("");
	}

	const closeDialog = () => setSelectedProductSupplier(null);
	const handleNext = () => setStep(1);

	const handleOrder = async (w: IWarehouse)=> {
		if (!selectedProductSupplier) return;

		const req: CreateStockOrderRequest = {
			supplierId:  selectedProductSupplier.supplierId,
			warehouseId: w.id,
			products: [{
				productId: selectedProductSupplier.productId,
				quantity: quantity,
				unitCost: selectedProductSupplier.unitCost,
			}]
		};

		stockOrderService.PlaceStockOrder(req).then(res => {
			if (!res.errors) {
				setSnackbarOpen(true);
				closeDialog();
			} else {
				console.error(res.errors);
			}
		});
	}

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
							onClick={() => openDialog(item)}
						/>
					))}
				</Grid>
				{selectedProductSupplier && (
					<Dialog open onClose={closeDialog} fullWidth maxWidth="md">
						<DialogTitle>{selectedProductSupplier.product.productName}</DialogTitle>
						<DialogContent dividers>
							{step === 0 ? (
								<>
									<SupplyOrderInfoDialog
										item={{
											productName:     selectedProductSupplier.product!.productName,
											description:     selectedProductSupplier.product!.productDescription,
											supplierName:     selectedProductSupplier.supplier!.supplierName,
											supplierAddress:     selectedProductSupplier.supplier!.supplierAddress,
											supplierEmail:     selectedProductSupplier.supplier!.supplierEmail,
											supplierPhone:     selectedProductSupplier.supplier!.supplierPhoneNumber,
											unitCost:     selectedProductSupplier.unitCost,
										}}
										quantity={quantity}
										setQuantity={q => setQuantity(q)}
									/>
								</>
							) : (
								<>  {/* step 1: choose warehouse */}
									<SupplyOrderWarehousesDialog
										warehouses={warehouses}
										streets={wStreets}
										cities={wCities}
										states={wStates}
										countries={wCuntries}
										cityFilter={wCityFilter}
										setCityFilter={setWCityFilter}
										stateFilter={wStateFilter}
										setStateFilter={setWStateFilter}
										countryFilter={wCountryFilter}
										setCountryFilter={setWCountryFilter}
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
