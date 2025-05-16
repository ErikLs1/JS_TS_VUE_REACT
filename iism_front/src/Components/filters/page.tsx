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
import {useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {CategoryService} from "@/Services/CategoryService";
import {ICategory} from "@/Types/Domain/ICategory";
import CategoryEditDialog from "@/Components/dialogs/CategoryEditDialog";
import CategoryDeleteDialog from "@/Components/dialogs/CategoryDeleteDialog";

export default function Category() {
	const categoryService = new CategoryService();
	const { accountInfo } = useContext(AccountContext);
	const router = useRouter();
	const [data, setData] = useState<ICategory[]>([]);

	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [selected, setSelected] = useState<ICategory | null>(null);

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
			const result = await categoryService.getAllAsync();
			if (result.errors) {
				console.error(result.errors);
				return;
			}
			setData(result.data!);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};

	const handleEdit = (w: ICategory) => {
		setSelected(w);
		setEditOpen(true);
	};

	const handleDelete = (w: ICategory) => {
		setSelected(w);
		setDeleteOpen(true);
	}

	const onUpdate = async (updated: ICategory) => {
		await categoryService.update(updated.id, updated);
		await fetchData();
	}

	const onConfirmDelete = async (id: string) => {
		await categoryService.delete(id);
		await fetchData();
	}

	return (
		<>
			<Box mt={8} mb={4} sx={{ maxWidth: 1000, mx: 'auto' }}>
				{/* Header */}
				<Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h4" component="h1">
						Categories
					</Typography>
					<Link href="/iism_front/src/Components/dialogs/category/create" passHref>
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
									<TableCell align="left">Name</TableCell>
									<TableCell align="center">Description</TableCell>
									<TableCell align="center">Edit</TableCell>
									<TableCell align="center">Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((category) => (
									<TableRow key={category.id} hover>
										<TableCell align="left">{category.categoryName}</TableCell>
										<TableCell align="center">{category.categoryDescription}</TableCell>
										<TableCell align="center">
											<IconButton onClick={() => handleEdit(category)}>
												<EditIcon fontSize="small" />
											</IconButton>
										</TableCell>
										<TableCell align="center">
											<IconButton onClick={() => handleDelete(category)}>
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
					<CategoryEditDialog
						open={editOpen}
						onClose={() => setEditOpen(false)}
						category={selected}
						onUpdate={onUpdate}
					/>
				)}

				{selected && (
					<CategoryDeleteDialog
						open={deleteOpen}
						onClose={() => setDeleteOpen(false)}
						category={selected}
						onDelete={onConfirmDelete}
					/>
				)}
			</Box>
		</>
	);
}
