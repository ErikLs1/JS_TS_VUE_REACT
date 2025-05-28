"use client"
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapActivation from "@/helpers/BootstrapActivation";
import {AccountContext, IAccountInfo} from "@/context/AccountContext";
import Header from '@/components/Header';
import {useEffect, useState} from 'react';

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const [accountInfo, setAccountInfo] = useState<IAccountInfo | undefined>(undefined);

    useEffect(() => {
        const jwt = localStorage.getItem("_jwt");
        const refreshToken = localStorage.getItem("_refreshToken");
        const role = localStorage.getItem("_role") || undefined;

        if (jwt && refreshToken) {
            setAccountInfo({ jwt, refreshToken, role });
        }
    }, []);

    const updateAccountInfo = (value: IAccountInfo) => {
        setAccountInfo(value);
        localStorage.setItem("_jwt", value.jwt!);
        localStorage.setItem("_refreshToken", value.refreshToken!);
        localStorage.setItem("_role", value.role!);
    }

    return (
        <html lang="en">
        <body>
        <AccountContext.Provider value={{
            accountInfo: accountInfo,
            setAccountInfo: updateAccountInfo,
        }}>
            <Header />
            <main className="flex-fill">
                {children}
            </main>
            <BootstrapActivation />
        </AccountContext.Provider>
        </body>
        </html>
    );
}

