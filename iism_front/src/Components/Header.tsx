"use client"

import Link from "next/link";

export default function Header(){
	return (
		<>
			<header className="p-3 text-bg-dark">
				<div className="container">
					<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

						<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
							<li><Link href="/" className="nav-link px-2 text-secondary">Home</Link></li>
							<li><Link href="/shopProducts" className="nav-link px-2 text-white">Products</Link></li>
							<li><Link href="#" className="nav-link px-2 text-white">FAQs</Link></li>
							<li><Link href="#" className="nav-link px-2 text-white">About</Link></li>
						</ul>

						<div className="text-end">
							<Link href="/login" type="button" className="btn btn-outline-light me-2">Login</Link>
							<Link href="/register" type="button" className="btn btn-warning">Sign-up</Link>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
