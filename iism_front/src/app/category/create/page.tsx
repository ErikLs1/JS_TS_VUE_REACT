"use client"

import Alert from "@mui/material/Alert";
import {Button, FormLabel, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {CategoryService} from "@/Services/CategoryService";
import {ICategory} from "@/Types/Domain/ICategory";

export default function CategoryCreate() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState("");
	const categoryService = new CategoryService();


	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted }
	} = useForm<ICategory>({
		defaultValues: {
			categoryName: '',
			categoryDescription: ''
		}
	});

	const onSubmit : SubmitHandler<ICategory> = async (data: ICategory) => {
		setErrorMessage("");
		try {
			const result = await categoryService.create(data);
			if (result.errors) {
				setErrorMessage(result.errors.join(', '));
				return;
			}
			router.push('/category')
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
					Add New Category for product
				</Typography>

				<div className="row g-2 mb-3">
					<div>
						<FormLabel id="demo-radio-buttons-group-label">Category name</FormLabel>
						<TextField
							fullWidth
							type="text"
							margin="none"
							error={isSubmitted && !!errors.categoryName}
							helperText={isSubmitted ? errors.categoryName?.message : ''}
							{...register('categoryName', { required: 'Name is required' })}
						/>
					</div>
					<div>
						<FormLabel id="demo-radio-buttons-group-label">Category description</FormLabel>
						<TextField
							fullWidth
							type="text"
							margin="none"
							error={isSubmitted && !!errors.categoryDescription}
							helperText={isSubmitted ? errors.categoryDescription?.message : ''}
							{...register('categoryDescription', { required: 'Description is required' })}
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
