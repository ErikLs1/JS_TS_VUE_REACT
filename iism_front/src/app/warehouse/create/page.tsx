"use client"

import Alert from "@mui/material/Alert";
import {Button, FormLabel, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {IWarehouse} from "@/Types/Domain/IWarehouse";
import {WarehouseService} from "@/Services/WarehouseService";

export default function WarehouseCreate() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState("");
	const warehouseService = new WarehouseService();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted }
	} = useForm<IWarehouse>({
		defaultValues: {
			warehouseAddress: '',
			warehouseEmail: '',
			warehouseCapacity: 0
		}
	});

	const onSubmit : SubmitHandler<IWarehouse> = async (data: IWarehouse) => {
		setErrorMessage("");
		try {
			const result = await warehouseService.create(data);
			if (result.errors) {
				setErrorMessage(result.errors.join(', '));
				return;
			}
			router.push('/warehouse')
		} catch (error) {
			setErrorMessage('Unexpected error occurred!!!')
		}
	};

	return(
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="container py-5" style={{ maxWidth: 400}}>
				{isSubmitted && (
					<Alert severity="warning" sx={{ mb: 2 }}>
						Please fill in all the fields
					</Alert>
				)}

				<Typography variant="h4" component="h1">
					Add New Warehouse Location
				</Typography>

				<div className="row g-2 mb-3">
					<div>
						<FormLabel id="demo-radio-buttons-group-label">Warehouse address</FormLabel>
						<TextField
							fullWidth
							type="text"
							margin="none"
							error={isSubmitted && !!errors.warehouseAddress}
							helperText={isSubmitted ? errors.warehouseAddress?.message : ''}
							{...register('warehouseAddress', { required: 'Address is required' })}
						/>
					</div>
					<div>
						<FormLabel id="demo-radio-buttons-group-label">Contact email</FormLabel>
						<TextField
							fullWidth
							type="email"
							margin="none"
							error={isSubmitted && !!errors.warehouseEmail}
							helperText={isSubmitted ? errors.warehouseEmail?.message : ''}
							{...register('warehouseEmail', {
								required: 'Email is required',
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Enter a valid email address'
								}
							})}
						/>
					</div>
					<div>
						<FormLabel id="demo-radio-buttons-group-label">Warehouse Capacity</FormLabel>
						<TextField
							fullWidth
							type="number"
							margin="none"
							error={isSubmitted && !!errors.warehouseCapacity}
							helperText={isSubmitted ? errors.warehouseCapacity?.message : ''}
							{...register('warehouseCapacity', {
								required: 'Capacity is required',
								min: { value: 1, message: 'Capacity must be at least 1' }
							})}
						/>
					</div>
				</div>
				<Button variant="contained" type="submit" endIcon={<SendIcon />}>
					Create
				</Button>
			</form>
		</>
	)
}
