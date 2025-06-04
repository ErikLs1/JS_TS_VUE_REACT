"use client"

import {LogoutRequestDto} from "@/types/Request/LogoutRequestDto";
import {AccountService} from "@/services/AccountService";
import {usePathname, useRouter} from "next/navigation";
import {useContext} from "react";
import Link from "next/link";
import {AccountContext} from "@/context/AccountContext";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {AppBar, Badge, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {pink} from "@mui/material/colors";


export default function Header(){
    const { accountInfo, setAccountInfo } = useContext(AccountContext);
    const router = useRouter();
    const pathname = usePathname();
    const accountService = new AccountService();

    const handleLogout = async () => {
        if (!accountInfo) return

        const req: LogoutRequestDto = {
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
        { label: "Home", href: "/"},
        { label: "Choose", href: "/chooseSchool"},
        { label: "Semester Subjects", href: "/semesterSubjects"},
        { label: "Requested Subjects", href: "/unfinishedStudentSubjects"},
    ];

    if (accountInfo?.role === "manager" && accountInfo?.jwt) {
        navItems.push(
            { label: "Available Subjects", href: "/availableSubjects" },
            { label: "Teacher Subjects", href: "/teacherSubjects" },
            { label: "Choose Subjects", href: "/teachingSubjects" }
        );
    }

    return (

        <AppBar position="static" color={"primary"}>
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
