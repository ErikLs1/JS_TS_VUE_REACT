import * as React from "react";
import {
	Box,
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

import {
	KeyboardArrowDown as KeyboardArrowDownIcon,
	KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import {IWarehouse} from "@/Types/Domain/IWarehouse";
import {useState} from "react";
import {WarehouseInventoryItemDto} from "@/Types/Responses/WarehouseInventoryItemDto";
import {InventoryService} from "@/Services/InventoryService";

export default function WarehouseProduct({ warehouse }: { warehouse: IWarehouse }) {
	const inventoryService = new InventoryService();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [items, setItems] =
		useState<WarehouseInventoryItemDto[] | null>(null);

	const handleToggle = async () => {
		setOpen(!open);
		if (!open && items === null) {
			setLoading(true);
			const inv = await inventoryService.GetProductsForWarehouse(warehouse.id);
			setItems(inv.data!);
			setLoading(false);
		}
	};

	return (
		<>
			<TableRow sx={{"& > *": {borderBottom: "unset"}}}>
				<TableCell>
					<IconButton size="small" onClick={handleToggle}>
						{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
					</IconButton>
				</TableCell>
				<TableCell>{warehouse.warehouseAddress}</TableCell>
				<TableCell>{warehouse.warehouseEmail}</TableCell>
				<TableCell align="right">{warehouse.warehouseCapacity}</TableCell>
			</TableRow><TableRow>
				<TableCell
					style={{padding: 0}}
					colSpan={4}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{margin: 2}}>
							<Typography variant="h6" gutterBottom>
								Inventory
							</Typography>
							{loading ? (
								<Typography>Loading...</Typography>
							) : items && items.length > 0 ? (
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell>Product</TableCell>
											<TableCell>Description</TableCell>
											<TableCell align="right">Qty</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{items.map((row) => (
											<TableRow key={row.productId}>
												<TableCell>{row.productName}</TableCell>
												<TableCell>{row.productDescription}</TableCell>
												<TableCell align="right">{row.quantity}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							) : (
								<Typography>No stock in this warehouse.</Typography>
							)}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
);
}
