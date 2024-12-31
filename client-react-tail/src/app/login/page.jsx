'use client'

import React, { useState } from 'react';
import Cookies from 'js-cookie' // Import js-cookie for handling cookies
import { useRouter } from 'next/navigation' // Import useRouter for client-side navigation
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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const signInSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})

const createSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Must be a valid email address.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})

export function FailedLogin({ message }) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {message || "Wrong username or password. Please try again."}
            </AlertDescription>
        </Alert>
    )
}

export function FailedCreate({ message }) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {message || "Username already exists, select another one."}
            </AlertDescription>
        </Alert>
    )
}

export default function ProfileForm() {
    const router = useRouter(); // Initialize the router
    const signInForm = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const createForm = useForm({
        resolver: zodResolver(createSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    });

    const [loginFailed, setLoginFailed] = useState(false);
    const [createFailed, setCreateFailed] = useState(false);
    const [createErrorMessage, setCreateErrorMessage] = useState('');
    const [currentTab, setCurrentTab] = useState('signIn');

    const onSignIn = async (data) => {
        try {
            console.log("Sign In", data);
            const response = await fetch('http://104.248.200.63:3020/database/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.ok) {
                const responseData = await response.json(); // Process the JSON response
                console.log("Response Data:", responseData);
                console.log("success")
                Cookies.set('token', responseData.token); // Save the token in the cookies
                router.push('/'); // Navigate to the home page

                setTimeout(() => {
                    window.location.reload();
                }, 2000); // Add a slight delay before reloading
            }
            console.log(response);
            setLoginFailed(false); // Reset the login failed state on successful login

        } catch (error) {
            console.error('Fetch failed:', error);
            setLoginFailed(true); // Set the login failed state on error
        }
    }

    const onCreate = async (data) => {
        try {
            console.log("Create", data);
            const response = await fetch('http://104.248.200.63:3020/database/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setCreateErrorMessage(errorData.message || 'An error occurred. Please try again.');
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Success:', responseData);
            window.location.reload();
            setCreateFailed(false); // Reset the create failed state on successful creation
        } catch (error) {
            console.error('Fetch failed:', error);
            setCreateFailed(true); // Set the create failed state on error
        }
    }

    return (
        <main className="flex h-[770px] w-screen flex-col items-center">
            <Card>
                <CardHeader>
                    <CardTitle>{currentTab === 'signIn' ? 'Sign In' : 'Create Account'}</CardTitle>
                    <CardDescription>{currentTab === 'signIn' ? 'Sign In to your' : 'Create a new'} mAI gym account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="signIn" className="w-[400px]" onValueChange={value => setCurrentTab(value)}>
                        <TabsList>
                            <TabsTrigger value="signIn">Sign in</TabsTrigger>
                            <TabsTrigger value="Create">Create</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signIn">
                            {loginFailed && <FailedLogin />}
                            <Form {...signInForm}>
                                <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-8">
                                    <FormField
                                        control={signInForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="username" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={signInForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Password" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Sign in</Button>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="Create">
                            {createFailed && <FailedCreate message={createErrorMessage} />}
                            <Form {...createForm}>
                                <form onSubmit={createForm.handleSubmit(onCreate)} className="space-y-8">
                                    <FormField
                                        control={createForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="username" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={createForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={createForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Password" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Create</Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter>
                    <p>Terms of service</p>
                </CardFooter>
            </Card>
        </main>
    )
}
