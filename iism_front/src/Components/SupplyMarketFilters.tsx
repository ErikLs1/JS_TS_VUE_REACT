import {Stack} from "@mui/system";
import {Autocomplete, Button, TextField} from "@mui/material";

interface SupplyMarketFiltersProps {
	cities: string[];
	states: string[];
	countries: string[];
	categories: string[];
	suppliers: string[];
	city: string;
	setCity: (v: string) => void;
	state: string;
	setState: (v: string) => void;
	country: string;
	setCountry: (v: string) => void;
	category: string;
	setCategory: (v: string) => void;
	supplier: string;
	setSupplier: (v: string) => void;
	onClear: () => void;
}

export default function SupplyMarketFilters({
												cities, states, countries, categories, suppliers, city,
												setCity, state, setState, country, setCountry, category,
												setCategory, supplier, setSupplier, onClear
											}: SupplyMarketFiltersProps) {
	return (
		<>
			{/* Filters */}
			<Stack direction="row" spacing={2} mb={2}>
				<Autocomplete
					options={cities}
					value={city}
					onChange={(_, v) => setCity(v ?? '')}
					getOptionLabel={(opt) => opt ?? ""}
					renderInput={params => <TextField {...params} label="City" variant="outlined" />}
					sx={{ width: 150 }}
				/>
				<Autocomplete
					options={states}
					value={state}
					onChange={(_, v) => setState(v ?? '')}
					getOptionLabel={(opt) => opt ?? ""}
					renderInput={params => <TextField {...params} label="State" variant="outlined" />}
					sx={{ width: 150 }}
				/>
				<Autocomplete
					options={countries}
					value={country}
					onChange={(_, v) => setCountry(v ?? '')}
					getOptionLabel={(opt) => opt ?? ""}
					renderInput={params => <TextField {...params} label="Country" variant="outlined" />}
					sx={{ width: 150 }}
				/>
				<Autocomplete
					options={categories}
					value={category}
					onChange={(_, v) => setCategory(v ?? '')}
					getOptionLabel={(opt) => opt ?? ""}
					renderInput={params => <TextField {...params} label="Category" variant="outlined" />}
					sx={{ width: 150 }}
				/>
				<Autocomplete
					options={suppliers}
					value={supplier}
					onChange={(_, v) => setSupplier(v ?? '')}
					getOptionLabel={(opt) => opt ?? ""}
					renderInput={params => <TextField {...params} label="Supplier" variant="outlined" />}
					sx={{ width: 150 }}
				/>
				<Button onClick={onClear}>
					Clear
				</Button>
			</Stack>
		</>
	)
}
