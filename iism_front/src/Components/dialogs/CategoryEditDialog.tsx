import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {SubmitHandler, useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import {useEffect} from "react";
import {ICategory} from "@/Types/Domain/ICategory";


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
	category: ICategory;
	onUpdate: (data: ICategory) => Promise<void>;
}

export default function CategoryEditDialog({open, onClose, category, onUpdate}: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors, isSubmitting}
	} = useForm<ICategory>({
		defaultValues: category
	})

	const handleSave: SubmitHandler<ICategory> = async (data) => {
		await onUpdate(data);
		onClose();
	}

	useEffect(() => {
		reset(category);
	}, [category, reset]);

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
							type="text"
							{...register('categoryName', { required: 'Name is required' })}
							error={!!errors.categoryName}
							helperText={errors.categoryName?.message}
						/>
						<TextField
							fullWidth
							margin="normal"
							label="Description"
							type="text"
							{...register('categoryDescription', { required: 'Description is required' })}
							error={!!errors.categoryDescription}
							helperText={errors.categoryDescription?.message}
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
