"use client"

import {Stack} from "@mui/system";
import {
	Autocomplete, Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from "@mui/material";
import {IWarehouse} from "@/Types/Domain/IWarehouse";

interface SupplyOrderWarehouseDialogProps {
	warehouses: IWarehouse[];
	streets: string[],
	cities: string[],
	states: string[],
	countries: string[],
	cityFilter: string;
	setCityFilter: (v: string) => void;
	stateFilter: string;
	setStateFilter: (v: string) => void;
	countryFilter: string;
	setCountryFilter: (v: string) => void;
	handleOrder: (warehouse: IWarehouse) => void;
}

export default function SupplyOrderWarehousesDialog({
														warehouses,
														streets,
														cities,
														states,
														countries,
														cityFilter,
														setCityFilter,
														stateFilter,
														setStateFilter,
														countryFilter,
														setCountryFilter,
														handleOrder,
													}: SupplyOrderWarehouseDialogProps) {
	return (
		<>
			<Stack direction="row" spacing={2} mb={2}>
				<Autocomplete
					options={cities}
					value={cityFilter}
					onChange={(_, v) => setCityFilter(v||'')}
					renderInput={p=><TextField {...p} label="City" size="small"/>}
					sx={{ width:120 }}
				/>
				<Autocomplete
					options={states}
					value={stateFilter}
					onChange={(_, v) => setStateFilter(v||'')}
					renderInput={p=><TextField {...p} label="State" size="small"/>}
					sx={{ width:120 }}
				/>
				<Autocomplete
					options={countries}
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
								<TableCell align="right">{w.warehouseAvailableCapacity}</TableCell>
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
	)
}
