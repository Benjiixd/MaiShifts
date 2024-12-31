'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { parseCookies } from 'nookies';

export default function Header() {
    const [username, setUsername] = useState(null);
    let pathname = usePathname();
    pathname = pathname === '/' ? 'Home' : pathname.charAt(1).toUpperCase() + pathname.slice(2);

    useEffect(() => {
        const cookies = parseCookies();
        const userToken = cookies["auth-status"];

        if (userToken && userToken !== "no-token") {
            const user = cookies["auth-status"];

            if (user) {
                try {
                    // Decode the URL-encoded string
                    const decodedUser = decodeURIComponent(user);

                    // Parse the decoded JSON string
                    const parsedUser = JSON.parse(decodedUser);

                    const username = parsedUser?.username;
                    setUsername(username);
                } catch (error) {
                    console.error("Failed to decode or parse auth-token:", error);
                }
            } else {
                console.warn("auth-token cookie is undefined");
            }
        }
    }, []);

    return (
        <header className="flex items-center justify-between w-full p-8 bg-#e5e7eb">
            <h1 className="text-2xl font-bold">mAI gym</h1>
            <nav className="flex gap-4">
                <Link href="/test">
                    <p className="text-2xl font-bold cursor-pointer">{pathname}</p>
                </Link>
            </nav>
            {username ? (
                <Link href={`/user/${username}`}>
                    <h1 className="text-2xl font-bold">{username}</h1>
                </Link>
            ) : (
                <Link href="/login">
                    <h1 className="text-2xl font-bold">LOGIN</h1>
                </Link>
            )}
        </header>
    );
}
