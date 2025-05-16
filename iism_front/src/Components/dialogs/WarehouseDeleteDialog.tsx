import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IWarehouse} from "@/Types/Domain/IWarehouse";

type Props = {
	open: boolean;
	onClose: () => void;
	warehouse: IWarehouse;
	onDelete: (id: string) => Promise<void>;
}

export default function WarehouseDeleteDialog({ open, onClose, warehouse, onDelete }: Props) {
	const handleConfirm = async () => {
		await onDelete(warehouse.id);
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
					<strong>Address:</strong> {warehouse.warehouseAddress}
				</DialogContentText>
				<DialogContentText>
					<strong>Email:</strong> {warehouse.warehouseEmail}
				</DialogContentText>
				<DialogContentText>
					<strong>Capacity:</strong> {warehouse.warehouseCapacity}
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
