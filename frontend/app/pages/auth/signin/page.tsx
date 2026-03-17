"use client"
import { Form, FormMessage, FormControl, FormDescription, FormField, FormLabel, FormItem } from "@/components/ui/form"
import { signInSchema, signUpSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Input } from "@/components/ui/input"
import { Facebook, LoaderCircle } from "lucide-react"
import { FaGoogle } from "react-icons/fa";
import axios, { AxiosError } from "axios"
import { DataTable } from '../../../admin/components/data-table';
import { useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import {redirect} from "next/navigation"


export default function SignInPage() {

    const [loginError, setLoginError] = useState<string>("")
    const [successLogin, setSuccessLogin] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}accounts/login/`, values, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setLoginError("")
            setSuccessLogin("Success, welcom back!")
            setLoading(true)
            console.log(res.data)
            setTimeout(() => {
                redirect("/")
            }, 1500)
        } catch (error: any) {
            setLoading(false)
            setSuccessLogin("")
            if (error.response.data.detail === "No active account found with the given credentials") {
                setLoginError("Invalid Credentials")
            }
            console.log(error.response.data.detail);
        }
    }

    const google_login = useGoogleLogin({
        onSuccess: async (response) => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}accounts/google/login/`,
                {
                    "access_token": response.access_token
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            setLoading(true)
            setSuccessLogin("Success, welcom back!")
            setLoginError("")
            setTimeout(() => {
                redirect("/")
            }, 1500)
            console.log(res.data)
        },
        onError: () => {
            setLoading(false)
            setSuccessLogin("")
            setLoginError("Something went wrong!")
            console.log("Login Not Successfull")
        }
    })

    const handleError = (errorMessage: string) => {
        setLoginError(errorMessage);
        setSuccessLogin("");
        setTimeout(() => {
            setLoginError('');
        }, 2000);
    };

    console.log(loginError)


    return (
        <div className="flex justify-center align-center w-full bg-white dark:bg-[var(--teal-dark-dark)]/20">
            <div className="mt-40 mx-auto rounded-xl w-full h-[600px] mb-20 border max-w-md p-8 bg-card h-[60vh]">
                <div className="mb-8 text-center space-y-2">
                    <h2 className="text-3xl text-[var(--teal-dark-dark)] font-semibold tracking-tight dark:text-white">Log in</h2>
                    <p className="text-sm text-muted-foreground">Provide Credentials</p>
                </div>

                <div className={`
                    fixed top-20 right-0 z-50
                    transform transition-all duration-500 ease-in-out
                    ${loginError ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                `}>
                    {loginError && (
                        <div className="bg-red-400 text-white p-2 rounded-md shadow-lg font-semibold">
                            <p>{loginError}</p>
                        </div>
                    )}
                </div>
                <div className={`
                    fixed top-20 right-0 z-50
                    transform transition-all duration-500 ease-in-out
                    ${successLogin ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                `}>
                    {successLogin && (
                        <div className="bg-green-500 text-white p-2 rounded-md shadow-lg font-semibold">
                            <p>{successLogin}</p>
                        </div>
                    )}
                </div>

                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-bold">Email</FormLabel>
                                    <FormControl>
                                        <Input className="dark:bg-white text-black outline-none border border-white bg-white" placeholder="johndoe@examplemail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-bold">Password</FormLabel>
                                    <FormControl>
                                        <Input className="dark:bg-white text-black outline-none border border-white bg-white" placeholder="" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <button
                            className="relative flex justify-around w-full h-10 px-4 py-2 mt-2 rounded-md transition-colors bg-[var(--teal-dark-dark)] hover:opacity-90 text-white font-medium"
                            onClick={() => handleSubmit}
                        >
                            Login
                            <LoaderCircle size={20} className={`${successLogin ? "block" : "hidden"} absolute top-3 right-35 animate-spin`}/>
                        </button>
                    </form>
                </Form>

                <div className="mt-8">
                    <div className="relative mb-6">
                        {/* <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div> */}
                        <div className="relative flex justify-center text-md">
                            <span className=" px-2 text-white dark:text-white">Or Sign In Using</span>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button className="flex items-center justify-center w-12 h-12 rounded-sm border bg-[var(--teal-dark-dark)] transition-all hover:bg-[var(--teal-dark-dark)]/90 text-white">
                            <Facebook size={24} fill="currentColor" />
                        </button>
                        <button
                            className="flex items-center justify-center w-12 h-12 rounded-sm border transition-all bg-[var(--teal-dark-dark)] hover:bg-[var(--teal-dark-dark)]/90 text-white"
                            onClick={() => google_login()}
                        >
                            <FaGoogle size={24} fill="currentColor" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}