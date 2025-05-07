"use client";

import { useForm, SubmitHandler } from "react-hook-form"
import {useContext, useState} from "react";
import {useRouter} from "next/navigation";
import Alert from "@mui/material/Alert"
import {FormLabel, TextField} from "@mui/material";
import {AccountService} from "@/Services/AccountService";
import {AccountContext} from "@/Context/AccountContext";

export default function Login() {
	const accountService = new AccountService();
	const { setAccountInfo } = useContext(AccountContext)
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState("");

	type LoginInputs = {
		email: string;
		password: string;
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted }
	} = useForm<LoginInputs>({
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit : SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
		console.log(data);
		setErrorMessage("Loading...");

		try {
			var result = await accountService.loginAsync(data.email, data.password);
			if (result.errors) {
				setErrorMessage(result.statusCode + " - " + result.errors[0]);
				return;
			}

			setErrorMessage("");

			setAccountInfo!({
				jwt: result.data?.jwt,
				refreshToken: result.data?.refreshToken
			});
			router.push("/");


		} catch (error) {
			setErrorMessage("Login failed - " + (error as Error).message);
		}
	};

	return(
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="container py-5" style={{ maxWidth: 400}}>
				{errors.password?.type === 'required' && (
					<Alert severity="warning" sx={{ mb: 2 }}>
						Please fill all the fields
					</Alert>
				)}

				{errorMessage}
				<h1 className="h3 mb-4 fw-normal text-center">Please sign in</h1>

				<div className="row g-2 mb-3">
					<div>
						<FormLabel id="demo-radio-buttons-group-label">Email address</FormLabel>
						<TextField
							fullWidth
							type="email"
							margin="none"
							error={isSubmitted && !!errors.email}
							helperText={isSubmitted ? errors.email?.message : ''}
							{...register('email', { required: 'Email is required' })}
						/>
					</div>
					<div>
						<FormLabel id="demo-radio-buttons-group-label">Password</FormLabel>
						<TextField
							fullWidth
							type="password"
							margin="none"
							error={isSubmitted && !!errors.password}
							helperText={isSubmitted ? errors.password?.message : ''}
							{...register('password', {
								required: 'Password is required'
							})}
						/>
					</div>
				</div>

					<div className="form-check text-start my-3">
						<input
							className="form-check-input"
							type="checkbox"
							value="remember-me"
							id="checkDefault"
						/>
						<label className="form-check-label" htmlFor="checkDefault">
							Remember me
						</label>
					</div>
					<button className="btn btn-primary w-100 py-2" type="submit">Login</button>
			</form>
		</>
	)
}
