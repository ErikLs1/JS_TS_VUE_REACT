"use client"

import Link from "next/link";
import React, {useContext, useState} from "react";
import { AccountContext } from "@/Context/AccountContext";
import { ThemeSwitch } from "@/Components/ThemeSwitch";
import { useRouter } from "next/navigation";
import {AccountService} from "@/Services/AccountService";
import {LogoutRequest} from "@/Types/Requests/LogoutRequest";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {IconButton} from "@mui/material";
import {pink} from "@mui/material/colors";

export default function Header(){
	const { accountInfo, setAccountInfo } = useContext(AccountContext);
	const [darkMode, setDarkMode] = useState(false);
	const router = useRouter();
	const accountService = new AccountService();

	const handleLogout = async () => {
		if (!accountInfo) return

		const req: LogoutRequest = {
			refreshToken: accountInfo.refreshToken!
		};

		const result = await accountService.logoutAsync(req);

		if (!result.errors) {
			setAccountInfo!({})
			setAccountInfo!({});
			localStorage.removeItem("_jwt");
			localStorage.removeItem("_refreshToken");
			localStorage.removeItem("_role");
			router.push("/login");
		} else {
			// you might want to show result.errors[0]
			console.error("Logout failed:", result.errors);
		}
	}

	const handleThemeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDarkMode(e.target.checked);
		// TODO: Later
	};

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
							<li><Link href="/shopBasket" className="nav-link px-2 text-white">Basket</Link></li>
							{accountInfo?.role === "manager" && accountInfo?.jwt &&
								<>
									<li><Link href="/category" className="nav-link px-2 text-white">Category</Link></li>
									<li><Link href="/warehouse" className="nav-link px-2 text-white">Warehouse</Link></li>
								</>
							}
						</ul>

						<div className="text-end">
							<ThemeSwitch
								checked={darkMode}
								onChange={handleThemeSwitch}
								className="me-3"
							/>
							{accountInfo?.jwt ?
								<>
									<button className="btn btn-outline-light me-2" onClick={handleLogout}>Logout
									</button>
									<Link href="/profile">
										<IconButton>
											<AccountBoxIcon sx={{color: pink[500]}}/>
										</IconButton>
									</Link>
								</>
								:
								<>
									<Link href="/login" type="button" className="btn btn-outline-light me-2">Login</Link>
									<Link href="/register" type="button" className="btn btn-warning">Sign-up</Link>
								</>

							}
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
