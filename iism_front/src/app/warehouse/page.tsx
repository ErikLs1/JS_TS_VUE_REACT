"use client"

import {
	Box,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow, Typography
} from "@mui/material";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from "@mui/system";
import { AccountContext } from "@/Context/AccountContext";
import { WarehouseService } from "@/Services/WarehouseService";
import {useContext, useEffect, useState} from "react";
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

	useEffect(() => {
		const storedJwt = localStorage.getItem("_jwt");
		if (!accountInfo?.jwt && !storedJwt) {
			router.push("/login")
			return;
		}
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const result = await warehouseService.getAllAsync();
			if (result.errors) {
				console.error(result.errors);
				return;
			}
			setData(result.data!);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};

	const handleEdit = (w: IWarehouse) => {
		setSelected(w);
		setEditOpen(true);
	};

	const handleDelete = (w: IWarehouse) => {
		setSelected(w);
		setDeleteOpen(true);
	}

	const onUpdate = async (updated: IWarehouse) => {
		await warehouseService.update(updated.id, updated);
		await fetchData();
	}

	const onConfirmDelete = async (id: string) => {
		await warehouseService.delete(id);
		await fetchData();
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
