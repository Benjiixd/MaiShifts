"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { parseCookies, destroyCookie } from 'nookies';
import { useEffect, useState } from "react"

export default function Account() {
    const router = useRouter(); // Initialize the router
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const cookies = parseCookies();
        const userToken = cookies["auth-status"];

        if (userToken === "no-token") {
            router.push('/login');
            return;
        }

        if (userToken && userToken !== "no-token") {
            const user = cookies["auth-status"];

            if (user) {
                try {
                    // Decode the URL-encoded string
                    const decodedUser = decodeURIComponent(user);

                    // Parse the decoded JSON string
                    const parsedUser = JSON.parse(decodedUser);

                    setUsername(parsedUser?.username);
                    setEmail(parsedUser?.email);
                } catch (error) {
                    console.error("Failed to decode or parse auth-token:", error);
                }
            } else {
                console.warn("auth-token cookie is undefined");
            }
        }
    }, [router]);

    const handleLogout = () => {
        destroyCookie(null, "auth-status");
        destroyCookie(null, "token");
        router.push('/login');
    };

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-bold text-center mb-6">Account</h1>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Username:</h2>
                    <p className="text-gray-700">{username || "Loading..."}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Email:</h2>
                    <p className="text-gray-700">{email || "Loading..."}</p>
                </div>
                <Button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                    Logout
                </Button>
            </div>
        </main>
    )
}
