"use client"

import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow, Typography
} from "@mui/material";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import { Stack } from "@mui/system";
import { AccountContext } from "@/Context/AccountContext";
import { WarehouseService } from "@/Services/WarehouseService";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IWarehouse } from "@/Types/Domain/IWarehouse";
import WarehouseEditDialog from "@/Components/dialogs/WarehouseEditDialog";
import WarehouseDeleteDialog from "@/Components/dialogs/WarehouseDeleteDialog";
import { InventoryService } from "@/Services/InventoryService";
import WarehouseRow from "@/Components/WarehouseRow";
import WarehouseFilters from "@/Components/filters/WarehouseFilters";


export default function Warehous() {
	const warehouseService = new WarehouseService();
	const inventoryService = new InventoryService();
	const { accountInfo } = useContext(AccountContext);
	const router = useRouter();
	const [data, setData] = useState<IWarehouse[]>([]);

	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [selected, setSelected] = useState<IWarehouse | null>(null);

	// filter values
	const [streetFilter, setStreetFilter] = useState<string>("");
	const [cityFilter, setCityFilter] = useState<string>("");
	const [stateFilter, setStateFilter] = useState<string>("");
	const [countryFilter, setCountryFilter] = useState<string>("");

	// options fo each filter
	const [streets, setStreets] = useState<string[]>([]);
	const [cities, setCities] = useState<string[]>([]);
	const [states, setStates] = useState<string[]>([]);
	const [countries, setCountries] = useState<string[]>([]);


	useEffect(() => {
		const storedJwt = localStorage.getItem("_jwt");
		if (!accountInfo?.jwt && !storedJwt) {
			router.push("/login")
			return;
		}
		const initData = async () => {
			const filters = await warehouseService.getFilters();
			if (!filters.errors && filters.data) {
				setStreets(filters.data.streets);
				setCities(filters.data.cities);
				setStates(filters.data.states);
				setCountries(filters.data.countries);
			}

			const allWarehouses = await warehouseService.getFilteredWarehouses({});
			if (!allWarehouses.errors && allWarehouses.data) {
				setData(allWarehouses.data);
			}
		}

		initData();
	}, []);

	useEffect(() => {
		const applyFilters = async () => {
			const res = await warehouseService.getFilteredWarehouses({
				street: streetFilter || undefined,
				city: cityFilter || undefined,
				state: stateFilter || undefined,
				country: countryFilter || undefined,
			});

			if (!res.errors && res.data) {
				setData(res.data);
			}
		}

		applyFilters();
	}, [streetFilter, cityFilter, stateFilter, countryFilter]);

	const handleEdit = (w: IWarehouse) => { setSelected(w); setEditOpen(true); };
	const handleDelete = (w: IWarehouse) => { setSelected(w); setDeleteOpen(true); }

	const onUpdate = async (updated: IWarehouse) => {
		await warehouseService.update(updated.id, updated);
		const refetch = await warehouseService.getFilteredWarehouses({
			street: streetFilter, city: cityFilter, state: stateFilter, country: countryFilter
		});

		if (!refetch.errors && refetch.data) setData(refetch.data);
	}

	const onConfirmDelete = async (id: string) => {
		await warehouseService.delete(id);
		const refetch = await warehouseService.getFilteredWarehouses({
			street: streetFilter, city: cityFilter, state: stateFilter, country: countryFilter
		});

		if (!refetch.errors && refetch.data) setData(refetch.data);
	}

	// Clear filters helper function
	const clearFilters = () => {
		setStreetFilter("");
		setCityFilter("");
		setStateFilter("");
		setCountryFilter("");
	}
	return (
		<>
			<Box mt={8} mb={4} sx={{ maxWidth: 1000, mx: 'auto' }}>
				{/* Header */}
				<Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h4" component="h1">
						Warehouses
					</Typography>
					<Link href="/warehouse/create" passHref>
						<Button variant="contained" startIcon={<AddIcon />} color="primary">
							New Warehouse
						</Button>
					</Link>
				</Stack>

				{/* Filters */}
				<WarehouseFilters
					streetFilter={streetFilter}
					cityFilter={cityFilter}
					stateFilter={stateFilter}
					countryFilter={countryFilter}
					streets={streets}
					cities={cities}
					states={states}
					countries={countries}
					onStreetChange={setStreetFilter}
					onCityChange={setCityFilter}
					onStateChange={setStateFilter}
					onCountryChange={setCountryFilter}
					onClear={() => { clearFilters() }}
				/>

				{/* Table */}
				<Paper>
					<TableContainer>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell>Address</TableCell>
									<TableCell>Email</TableCell>
									<TableCell align="right">Capacity</TableCell>
									<TableCell align="center">Edit</TableCell>
									<TableCell align="center">Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map(warehouse => (
									<WarehouseRow
										key={warehouse.id}
										warehouse={warehouse}
										onEdit={handleEdit}
										onDelete={handleDelete}
										inventoryService={inventoryService}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>

				{selected && (
					<WarehouseEditDialog
						open={editOpen}
						onClose={() => setEditOpen(false)}
						warehouse={selected}
						onUpdate={onUpdate}
					/>
				)}

				{selected && (
					<WarehouseDeleteDialog
						open={deleteOpen}
						onClose={() => setDeleteOpen(false)}
						warehouse={selected}
						onDelete={onConfirmDelete}
					/>
				)}
			</Box>
		</>
	);
}
