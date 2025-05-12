"use client"

import {
	Autocomplete,
	Box,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow, TextField, Typography
} from "@mui/material";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from "@mui/system";
import { AccountContext } from "@/Context/AccountContext";
import { WarehouseService } from "@/Services/WarehouseService";
import {useContext, useEffect, useMemo, useState} from "react";
import { useRouter } from "next/navigation";
import {IWarehouse} from "@/Types/Domain/IWarehouse";
import WarehouseEditDialog from "@/Components/WarehouseEditDialog";
import WarehouseDeleteDialog from "@/Components/WarehouseDeleteDialog";

export default function Warehous() {
	const warehouseService = new WarehouseService();
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

	return (
		<>
			<Box mt={8} mb={4} sx={{ maxWidth: 1000, mx: 'auto' }}>
				{/* Header */}
				<Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h4" component="h1">
						Warehouses
					</Typography>
					<Link href="/warehouse/create" passHref>
						<Button
							variant="contained"
							startIcon={<AddIcon />}
							color="primary"
						>
							New Warehouse
						</Button>
					</Link>
				</Stack>

				{/* Filters */}
				<Stack direction="row" spacing={2} mb={2}>
					<Autocomplete
						options={streets}
						value={streetFilter}
						onChange={(_, v) => setStreetFilter(v ?? '')}
						getOptionLabel={(opt) => opt ?? ""}
						renderInput={params => <TextField {...params} label="Street" variant="outlined" />}
						sx={{ width: 200 }}
					/>
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
					<Button onClick={() => {
						setStreetFilter('');
						setCityFilter('');
						setStateFilter('');
						setCountryFilter('');
					}}>
						Clear
					</Button>
				</Stack>

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
								{data.map((warehouse) => (
									<TableRow key={warehouse.id} hover>
										<TableCell>{warehouse.warehouseAddress}</TableCell>
										<TableCell>{warehouse.warehouseEmail}</TableCell>
										<TableCell align="right">{warehouse.warehouseCapacity}</TableCell>
										<TableCell align="center">
											<IconButton onClick={() => handleEdit(warehouse)}>
												<EditIcon fontSize="small" />
											</IconButton>
										</TableCell>
										<TableCell align="center">
											<IconButton onClick={() => handleDelete(warehouse)}>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</TableCell>
									</TableRow>
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
