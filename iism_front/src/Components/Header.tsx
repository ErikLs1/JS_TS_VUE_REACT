"use client"

import Link from "next/link";
import React, {useContext, useState} from "react";
import { AccountContext } from "@/Context/AccountContext";
import { ThemeSwitch } from "@/Components/ThemeSwitch";
import {usePathname, useRouter} from "next/navigation";
import {AccountService} from "@/Services/AccountService";
import {LogoutRequest} from "@/Types/Requests/LogoutRequest";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {AppBar, Badge, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {pink} from "@mui/material/colors";
import {useCart} from "@/Context/CartContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header(){
	const { accountInfo, setAccountInfo } = useContext(AccountContext);
	const [darkMode, setDarkMode] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const accountService = new AccountService();
	const { items } = useCart();

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

	const navItems: { label: string; href: string }[] = [
		{ label: "Home", href: "/" },
		{ label: "Products", href: "/shopProducts" },
		{ label: "Basket", href: "/shopBasket" },
	];

	if (accountInfo?.role === "manager" && accountInfo?.jwt) {
		navItems.push(
			{ label: "Warehouse", href: "/warehouse" },
			{ label: "Market", href: "/supplyMarket" },
			{ label: "Orders", href: "/orderManagement" }
		);
	}

	const handleThemeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDarkMode(e.target.checked);
		// TODO: Later
	};

	return (

		<AppBar position="static" color={darkMode ? "default" : "primary"}>
			<Toolbar>
				<Typography
					variant="h6"
					sx={{ flexGrow: 1, cursor: "pointer" }}
					onClick={() => router.push("/")}
				>
					WebApp
				</Typography>

				{/* Navigation Links */}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					{navItems.map((item) => (
						<Button
							key={item.href}
							component={Link}
							href={item.href}
							color="inherit"
							sx={{
								mx: 1,
								borderBottom:
									pathname === item.href ? "2px solid white" : "none",
							}}
						>
							{item.label}
						</Button>
					))}
				</Box>

				{/* Spacer */}
				<Box sx={{ flexGrow: 1 }} />

				{/* Actions */}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<ThemeSwitch checked={darkMode} onChange={handleThemeSwitch} sx={{ mr: 2 }} />

					{accountInfo?.jwt ? (
						<>
							<IconButton color="inherit" onClick={handleLogout} sx={{ mr: 1 }}>
								<ExitToAppIcon />
							</IconButton>

							<IconButton
								component={Link}
								href="/profile"
								color="inherit"
								sx={{ mr: 1 }}
							>
								<AccountBoxIcon sx={{ color: pink[500] }} />
							</IconButton>

							<IconButton
								component={Link}
								href="/shopBasket"
								color="inherit"
							>
								<Badge
									badgeContent={items.reduce((sum, i) => sum + i.quantity, 0)}
									color="secondary"
								>
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						</>
					) : (
						<>
							<Button
								component={Link}
								href="/login"
								color="inherit"
								sx={{ mr: 1 }}
							>
								Login
							</Button>
							<Button
								component={Link}
								href="/register"
								variant="outlined"
								color="inherit"
							>
								Sign Up
							</Button>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	)
}
