"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ICategory} from "@/Types/Domain/ICategory";

type Props = {
	open: boolean;
	onClose: () => void;
	category: ICategory;
	onDelete: (id: string) => Promise<void>;
}

export default function CategoryDeleteDialog({ open, onClose, category, onDelete }: Props) {
	const handleConfirm = async () => {
		await onDelete(category.id);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="delete-dialog-title"
			aria-describedby="delete-dialog-description"
		>
			<DialogTitle id="delete-dialog-title">Delete Warehouse</DialogTitle>
			<DialogContent>
				<DialogContentText id="delete-dialog-description">
					Are you sure you want to delete the following warehouse?
				</DialogContentText>
				<DialogContentText>
					<strong>Name:</strong> {category.categoryName}
				</DialogContentText>
				<DialogContentText>
					<strong>Description:</strong> {category.categoryDescription}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button color="error" onClick={handleConfirm} autoFocus>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
