"use client";
import {
  Form,
  FormMessage,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { signInSchema, signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Facebook, LoaderCircle, EyeClosed, Eye, EyeOff, GalleryVerticalEnd } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { DataTable } from "../../../admin/components/data-table";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [loginError, setLoginError] = useState<string>("");
  const [successLogin, setSuccessLogin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}accounts/login/`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setLoginError("");
      setSuccessLogin("Success, welcom back!");
      console.log(res.data);
      setTimeout(() => {
        redirect("/");
      }, 1500);
    } catch (error: any) {
      setLoading(false);
      setSuccessLogin("");
      if (
        error.response.data.detail ===
        "No active account found with the given credentials"
      ) {
        setLoginError("Invalid Credentials");
      }
      console.log(error.response.data.detail);
    }
  };

  console.log(loading)

  const google_login = useGoogleLogin({
    onSuccess: async (response) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}accounts/google/login/`,
        {
          access_token: response.access_token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      setLoading(true);
      setSuccessLogin("Success, welcom back!");
      setLoginError("");
      setTimeout(() => {
        redirect("/");
      }, 1500);
      console.log(res.data);
    },
    onError: () => {
      setLoading(false);
      setSuccessLogin("");
      setLoginError("Something went wrong!");
      console.log("Login Not Successfull");
    },
  });

  const handleError = (errorMessage: string) => {
    setLoginError(errorMessage);
    setSuccessLogin("");
    setTimeout(() => {
      setLoginError("");
    }, 2000);
  };

  console.log(loginError);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      {/* Toast: Error */}
      <div
        className={cn(
          "fixed top-5 right-0 z-50 transform transition-all duration-500 ease-in-out",
          loginError
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0",
        )}
      >
        {loginError && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-l-md shadow-lg font-semibold text-sm">
            {loginError}
          </div>
        )}
      </div>

      {/* Toast: Success */}
      <div
        className={cn(
          "fixed top-5 right-0 z-50 transform transition-all duration-500 ease-in-out",
          successLogin
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0",
        )}
      >
        {successLogin && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-l-md shadow-lg font-semibold text-sm">
            {successLogin}
          </div>
        )}
      </div>

      {/* Card */}
      <div
        className={"flex flex-col gap-6 w-full max-w-sm"}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center lg:mt-20">
              <h1 className="text-xl font-bold tracking-tight text-[var(--teal-dark-light)]">Welcome back</h1>
              <p className="text-sm text-muted-foreground">
                login to Evoque Spaces
              </p>
            </div>

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="border-gray-200 shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {/* <a
                      href="#"
                      className="text-xs text-muted-foreground underline underline-offset-4 hover:text-primary"
                    >
                      Forgot password?
                    </a> */}
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="pr-10 border  border-gray-200 shodow-none"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
            type="submit" className="w-full bg-[var(--teal-dark-light)] hover:bg-[var(--teal-dark-dark)]" disabled={loading}>
              {loading ? (
                <LoaderCircle size={16} className="animate-spin mr-2" />
              ) : null}
              Login
            </Button>

            {/* Divider */}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>

            {/* Social login */}
            <Button
              variant="outline"
              type="button"
              className="w-full border-gray-200 shadow-none"
              onClick={() => google_login()}
            >
              <FaGoogle className="mr-2 size-4" />
              Continue with Google
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground px-4">
          By clicking continue, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
