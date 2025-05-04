"use client"

import {FormEvent} from "react";

export default function Login() {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// TODO: handle login
	}

	return(
		<>
			<form onSubmit={handleSubmit} className="container py-5" style={{ maxWidth: 400}}>
					<h1 className="h3 mb-4 fw-normal text-center">Please sign in</h1>

				<div className="row g-2 mb-3">
					<div className="form-floating">
						<input
							type="email"
							className="form-control"
							id="floatingInput"
							placeholder="name@example.com"
							required
						/>
						<label htmlFor="floatingInput">Email address</label>
					</div>
					<div className="form-floating">
						<input
							type="password"
							className="form-control"
							id="floatingPassword"
							placeholder="Password"
							required
						/>
						<label htmlFor="floatingPassword">Password</label>
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
