"use client"

import {FormEvent} from "react";

export default function Register() {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// TODO: handle registration
	}

	return(
		<>
			<form onSubmit={handleSubmit} className="container py-5" style={{ maxWidth: 400 }}>
				<h1 className="h3 mb-4 fw-normal text-center">Create an Account</h1>

				{/* First and Last name */}
				<div className="row g-2 mb-3">
					<div className="col-md-6 form-floating">
						<input
							type="text"
							className="form-control"
							id="firstName"
							placeholder="First Name"
							required
						/>
						<label htmlFor="firstName">First name</label>
					</div>

					<div className="col-md-6 form-floating">
						<input
							type="text"
							className="form-control"
							id="lastName"
							placeholder="Last name"
							required
						/>
						<label htmlFor="lastName">Last name</label>
					</div>
				</div>

				{/* Email */}
				<div className="form-floating mb-3">
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="name@example.com"
						required
					/>
					<label htmlFor="email">Email address</label>
				</div>

				{/* Password */}
				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Password"
						required
					/>
					<label htmlFor="password">Password</label>
				</div>

				{/* Password confirm */}
				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="confirmPassword"
						placeholder="Confirm Password"
						required
					/>
					<label htmlFor="confirmPassword">Confirm password</label>
				</div>

				{/* Phone number */}
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="address"
						placeholder="Raja 4C, 12616 Tallinn, Estonia"
						required
					/>
					<label htmlFor="address">Address</label>
				</div>

				{/* Phone number */}
				<div className="form-floating mb-3">
					<input
						type="tel"
						className="form-control"
						id="phoneNumber"
						placeholder="+372 42383339"
						required
					/>
					<label htmlFor="phoneNumber">Phone number</label>
				</div>

				{/* Gender */}
				<div className="mb-3">
					<label htmlFor="gender" className="form-label">
						Gender
					</label>
					<select
						id="gender"
						className="form-select"
						defaultValue=""
						required
					>
						<option value="" disabled>
							Choose…
						</option>
						<option value="female">Female</option>
						<option value="male">Male</option>
					</select>
				</div>

				{/* Date of birth */}
				<div className="form-floating mb-4">
					<input
						type="date"
						className="form-control"
						id="dob"
						placeholder="Date of birth"
						required
					/>
					<label htmlFor="dob">Date of birth</label>
				</div>

				<button className="btn btn-primary w-100 py-2" type="submit">Sign Up</button>
			</form>
		</>
	)
}
