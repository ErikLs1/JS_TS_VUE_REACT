"use client"

import Alert from "@mui/material/Alert";
import {Button, FormLabel, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function WarehouseCreate() {
	type WarehouseInputs = {
		warehouseAddress: string;
		warehouseEmail: string;
		warehouseCapacity: number;
	}

	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted }
	} = useForm<WarehouseInputs>({
		defaultValues: {
			warehouseAddress: '',
			warehouseEmail: ''
		}
	});

	const onSubmit : SubmitHandler<WarehouseInputs> = async (data: WarehouseInputs) => {
		console.log(data);
		router.push("/");
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
								required: 'Email is required'
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
								required: 'Capacity is required'
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
