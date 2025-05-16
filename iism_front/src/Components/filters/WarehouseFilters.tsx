"use client"

import {Autocomplete, Box, Button, TextField} from "@mui/material";
import {Stack} from "@mui/system";

interface WarehouseFiltersProps {
	streetFilter: string;
	cityFilter: string;
	stateFilter: string;
	countryFilter: string;
	streets: string[];
	cities: string[];
	states: string[];
	countries: string[];
	onStreetChange: (v: string) => void;
	onCityChange: (v: string) => void;
	onStateChange: (v: string) => void;
	onCountryChange: (v: string) => void;
	onClear: () => void;
}

export default function WarehouseFilters({
											 streetFilter,
											 cityFilter,
											 stateFilter,
											 countryFilter,
											 streets,
											 cities,
											 states,
											 countries,
											 onStreetChange,
											 onCityChange,
											 onStateChange,
											 onCountryChange,
											 onClear,
										 } : WarehouseFiltersProps) {
	return (
		<Stack direction="row" spacing={2} mb={2}>
			<Autocomplete
				options={streets}
				value={streetFilter}
				onChange={(_, v) => onStreetChange(v ?? '')}
				getOptionLabel={(opt) => opt ?? ""}
				renderInput={params => <TextField {...params} label="Street" variant="outlined" />}
				sx={{ width: 200 }}
			/>
			<Autocomplete
				options={cities}
				value={cityFilter}
				onChange={(_, v) => onCityChange(v ?? '')}
				getOptionLabel={(opt) => opt ?? ""}
				renderInput={params => <TextField {...params} label="City" variant="outlined" />}
				sx={{ width: 150 }}
			/>
			<Autocomplete
				options={states}
				value={stateFilter}
				onChange={(_, v) => onStateChange(v ?? '')}
				getOptionLabel={(opt) => opt ?? ""}
				renderInput={params => <TextField {...params} label="State" variant="outlined" />}
				sx={{ width: 150 }}
			/>
			<Autocomplete
				options={countries}
				value={countryFilter}
				onChange={(_, v) => onCountryChange(v ?? '')}
				getOptionLabel={(opt) => opt ?? ""}
				renderInput={params => <TextField {...params} label="Country" variant="outlined" />}
				sx={{ width: 150 }}
			/>
			<Button onClick={onClear}>Clear</Button>
		</Stack>
	)
}
