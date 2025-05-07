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
import {Stack} from "@mui/system";

type Warehouse = {
	id: number;
	warehouseAddress: string;
	warehouseEmail: string;
	warehouseCapacity: number;
}

const rows: Warehouse[] = [
	{
		id: 1,
		warehouseAddress: '123 Main St, Springfield',
		warehouseEmail: 'springfield@warehouse.com',
		warehouseCapacity: 500
	},
	{
		id: 2,
		warehouseAddress: '456 Elm Ave, Shelbyville',
		warehouseEmail: 'shelbyville@warehouse.com',
		warehouseCapacity: 750
	},
	{
		id: 3,
		warehouseAddress: '789 Oak Blvd, Capital City',
		warehouseEmail: 'capital@warehouse.com',
		warehouseCapacity: 1200
	}
];

export default function Warehous() {
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
							{rows.map((row) => (
								<TableRow key={row.id} hover>
									<TableCell>{row.warehouseAddress}</TableCell>
									<TableCell>{row.warehouseEmail}</TableCell>
									<TableCell align="right">{row.warehouseCapacity}</TableCell>
									<TableCell align="center">
										<Link href={`/warehouse/edit/${row.id}`} passHref >
											<IconButton color="primary">
												<EditIcon fontSize="small" />
											</IconButton>
										</Link>
									</TableCell>
									<TableCell align="center">
										<Link href={`/warehouse/delete/${row.id}`} passHref >
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
