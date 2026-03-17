import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "./page-components/navigationbar";
import Footer from "./page-components/footer";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ShoppingCartContextProvider } from "@/hooks/use-context";
import { GoogleOAuthProvider } from "@react-oauth/google"
import Providers from "@/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Evoque Space Limited",
    description: "Building Dreams Creating Spaces",
    icons: {
        icon: "/esl-logo.png",
        apple: "/esl-logo.png",
    },
};

import { inter } from "@/fonts"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased`}
            >
                <NextThemesProvider
                    defaultTheme="system"
                    attribute="class"
                >
                    <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
                        <ShoppingCartContextProvider>
                            <NavigationBar />
                            <div>
                                <Providers>
                                    {children}  
                                </Providers>
                            </div>
                        </ShoppingCartContextProvider>
                        <Footer />
                    </GoogleOAuthProvider>
                </NextThemesProvider>
            </body>
        </html>
    );
}
