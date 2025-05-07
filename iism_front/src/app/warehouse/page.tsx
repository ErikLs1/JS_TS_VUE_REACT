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

export default function Warehous() {
	const warehouseService = new WarehouseService();
	const { accountInfo } = useContext(AccountContext);
	const router = useRouter();
	const [data, setData] = useState<IWarehouse[]>([]);

	useEffect(() => {
		if (!accountInfo?.jwt) {
			router.push("/login")
		}
		const fetchData = async () => {
			try {
				const result = await warehouseService.getAllAsync();
				if (result.errors) {
					console.log(result.errors);
					return;
				}
				setData(result.data!);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		fetchData();
	}, []);


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
				<TableContainer component={Paper}>
					<Table size="small" aria-label="warehouses table">
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 'bold',  fontSize: '1.1rem',  bgcolor: 'grey.100'}}>
									Address
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold',  fontSize: '1.1rem',  bgcolor: 'grey.100'}}>
									Email
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold',  fontSize: '1.1rem',  bgcolor: 'grey.100'}} align="right">
									Capacity
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold',  fontSize: '1.1rem',  bgcolor: 'grey.100'}} align="center">
									Edit
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold',  fontSize: '1.1rem',  bgcolor: 'grey.100'}} align="center">
									Delete
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((warehouse) => (
								<TableRow key={warehouse.id} hover>
									<TableCell>{warehouse.warehouseAddress}</TableCell>
									<TableCell>{warehouse.warehouseEmail}</TableCell>
									<TableCell align="right">{warehouse.warehouseCapacity}</TableCell>
									<TableCell align="center">
										<Link href={`/warehouse/edit/${warehouse.id}`} passHref >
											<IconButton color="primary">
												<EditIcon fontSize="small" />
											</IconButton>
										</Link>
									</TableCell>
									<TableCell align="center">
										<Link href={`/warehouse/delete/${warehouse.id}`} passHref >
											<IconButton aria-label="delete" size="small">
												<DeleteIcon fontSize="inherit" />
											</IconButton>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
