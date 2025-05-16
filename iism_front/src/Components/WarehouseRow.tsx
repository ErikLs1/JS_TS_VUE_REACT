"use client"

import {
	Box,
	Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow, Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { IWarehouse } from "@/Types/Domain/IWarehouse";
import { InventoryService } from "@/Services/InventoryService";
import { WarehouseInventoryItemDto } from "@/Types/Responses/WarehouseInventoryItemDto";
import Alert from "@mui/material/Alert";

interface RowProps {
	warehouse: IWarehouse;
	onEdit: (w: IWarehouse) => void;
	onDelete: (w: IWarehouse) => void;
	inventoryService: InventoryService;
}

export default function WarehouseRow({
										 warehouse,
										 onEdit,
										 onDelete,
										 inventoryService
} : RowProps) {
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState<WarehouseInventoryItemDto[]>([]);
	const [loading, setLoading] = useState(false);

	const handleToggle = async () => {
		const next = !open;
		setOpen(next);
		if (next && items.length === 0) {
			setLoading(true);
			const res = await inventoryService.GetProductsForWarehouse(warehouse.id);
			if (!res.errors && res.data) setItems(res.data);
			setLoading(false);
		}
	};

	return (
		<>
			<TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton size="small" onClick={handleToggle}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>{warehouse.warehouseAddress}</TableCell>
				<TableCell>{warehouse.warehouseEmail}</TableCell>
				<TableCell align="right">{warehouse.warehouseCapacity}</TableCell>
				<TableCell align="center">
					<IconButton onClick={() => onEdit(warehouse)}><EditIcon fontSize="small" /></IconButton>
				</TableCell>
				<TableCell align="center">
					<IconButton onClick={() => onDelete(warehouse)}><DeleteIcon fontSize="small" /></IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">Products</Typography>
							{loading ? (
								<Typography>Loading...</Typography>
							) : items.length === 0 ? (
								<Alert severity="info">Warehouse is empty</Alert>
							): (
								<Table size="small" aria-label="products">
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell>Description</TableCell>
											<TableCell align="right">Quantity</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{items.map(item => (
											<TableRow key={item.productId}>
												<TableCell>{item.productName}</TableCell>
												<TableCell>{item.productDescription}</TableCell>
												<TableCell align="right">{item.quantity}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							)}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}

