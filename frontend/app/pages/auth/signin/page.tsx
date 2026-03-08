"use client"
import { Form, FormMessage, FormControl, FormDescription, FormField, FormLabel, FormItem } from "@/components/ui/form"
import { signInSchema, signUpSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Input } from "@/components/ui/input"
import { Facebook } from "lucide-react"
import { FaGoogle } from "react-icons/fa";


export default function SignInPage() {

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const handleSubmit = (values: z.infer<typeof signInSchema>) => {
        console.log(values)
    }



    return (
        <div className="flex justify-center align-center h-screen w-full bg-white dark:bg-[var(--teal-dark-dark)]/20">
            <div className="mt-20 mx-auto border rounded-md bg-[var(--teal-dark-light)] shadow-sm w-full max-w-md p-8 h-[80vh]">
                <div className="mb-8 text-center space-y-2">
                    <h2 className="text-3xl text-white font-semibold tracking-tight dark:text-white">Create Account</h2>
                    <p className="text-sm text-white">Provide Credentials</p>
                </div>

                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-bold">Email</FormLabel>
                                    <FormControl>
                                        <Input className="text-black outline-none border border-white bg-white" placeholder="johndoe@examplemail.com" {...field} />
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
                                        <Input className="text-black outline-none border border-white bg-white" placeholder="" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <button
                            className="w-full h-10 px-4 py-2 mt-2 rounded-md transition-colors bg-[var(--teal-dark-dark)] hover:opacity-90 text-white font-medium"
                            onClick={() => handleSubmit}
                        >
                            Login
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
                        <button className="flex items-center justify-center w-12 h-12 rounded-sm border transition-all bg-[var(--teal-dark-dark)] hover:bg-[var(--teal-dark-dark)]/90 text-white">
                            <FaGoogle size={24} fill="currentColor" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}