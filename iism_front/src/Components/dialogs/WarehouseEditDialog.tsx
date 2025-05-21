"use client"


import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {IWarehouse} from "@/Types/Domain/IWarehouse";
import {SubmitHandler, useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import {useEffect} from "react";


const BootstrapDialog = styled(Dialog)(({theme}) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

type Props = {
	open: boolean;
	onClose: () => void;
	warehouse: IWarehouse;
	onUpdate: (data: IWarehouse) => Promise<void>;
}

export default function WarehouseEditDialog({open, onClose, warehouse, onUpdate}: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors, isSubmitting}
	} = useForm<IWarehouse>({
		defaultValues: warehouse
	})

	const handleSave: SubmitHandler<IWarehouse> = async (data) => {
		await onUpdate(data);
		onClose();
	}

	useEffect(() => {
		reset(warehouse);
	}, [warehouse, reset]);

	return (
		<>
			<BootstrapDialog onClose={onClose} open={open} fullWidth maxWidth="sm">
				<DialogTitle sx={{ m: 0, p: 2 }}>
					Edit Warehouse
					<IconButton
						aria-label="close"
						onClick={onClose}
						sx={{ position: 'absolute', right: 8, top: 8 }}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<form onSubmit={handleSubmit(handleSave)}>
					<DialogContent dividers>
						<TextField
							fullWidth
							margin="normal"
							label="Address"
							{...register('warehouseAddress', { required: 'Address is required' })}
							error={!!errors.warehouseAddress}
							helperText={errors.warehouseAddress?.message}
						/>
						<TextField
							fullWidth
							margin="normal"
							label="Email"
							type="email"
							{...register('warehouseEmail', {
								required: 'Email is required',
								pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
							})}
							error={!!errors.warehouseEmail}
							helperText={errors.warehouseEmail?.message}
						/>
						<TextField
							fullWidth
							margin="normal"
							label="Capacity"
							type="number"
							{...register('warehouseCapacity', { required: 'Capacity is required', min: { value: 1, message: 'Must be at least 1' } })}
							error={!!errors.warehouseCapacity}
							helperText={errors.warehouseCapacity?.message}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={onClose}>Cancel</Button>
						<Button type="submit" disabled={isSubmitting}>Update</Button>
					</DialogActions>
				</form>
			</BootstrapDialog>
		</>
	)
}
