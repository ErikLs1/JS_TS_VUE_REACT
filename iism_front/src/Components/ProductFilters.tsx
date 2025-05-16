"use client"

import {
	Autocomplete,
	Box,
	Button,
	TextField,
} from "@mui/material";

interface ShopProductFiltersProps {
	productName: string;
	onProductNameChange: (v: string) => void;
	category: string | null;
	onCategoryChange: (v: string | null) => void;
	minPrice?: number;
	onMinPriceChange: (v?: number) => void;
	maxPrice?: number;
	onMaxPriceChange: (v?: number) => void;
	categories: string[];
	onApply: () => void;
	onClear: () => void;
}

export default function ShopProductFilters({
											   productName,
											   onProductNameChange,
											   category,
											   onCategoryChange,
											   minPrice,
											   onMinPriceChange,
											   maxPrice,
											   onMaxPriceChange,
											   categories,
											   onApply,
											   onClear,
} : ShopProductFiltersProps) {
	return (
	<Box display="flex" gap={2} flexWrap="wrap" mb={4}>
		<TextField
			label="Product name"
			value={productName}
			onChange={e => onProductNameChange(e.target.value)}
		/>
		<Autocomplete
			options={categories}
			value={category}
			onChange={(_, v) => onCategoryChange(v)}
			renderInput={params => <TextField {...params} label="Category" />}
			sx={{ width: 200 }}
		/>
		<TextField
			label="Min price"
			type="number"
			value={minPrice ?? ''}
			onChange={e => onMinPriceChange(e.target.value ? Number(e.target.value) : undefined)}
		/>
		<TextField
			label="Max price"
			type="number"
			value={maxPrice ?? ''}
			onChange={e => onMaxPriceChange(e.target.value ? Number(e.target.value) : undefined)}
		/>
		<Button variant="outlined" onClick={onApply}>
			Apply
		</Button>
		<Button onClick={onClear}>
			Clear
		</Button>
	</Box>
	)
}
