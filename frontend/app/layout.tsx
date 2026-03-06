import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "./page-components/navigationbar";
import Footer from "./page-components/footer";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <NavigationBar />
          <div>
            {children}
          </div>
          <Footer />
      </body>
    </html>
  );
}
