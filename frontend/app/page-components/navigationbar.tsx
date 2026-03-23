'use client'

import React, { useState, useEffect } from 'react';
import { Home, Menu, X, ShoppingCart, ChevronDown, Search, Hammer, Building2, User2, Sun, Moon, Phone, Info, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from "next/link"
import { stylish } from '@/fonts';
import { useTheme } from 'next-themes';
import { FaWhatsapp } from "react-icons/fa";
import { useGoogleOneTapLogin } from '@react-oauth/google';
import axios from "axios"
import { useShoppingCart } from '@/hooks/use-context';

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false)
    const { setTheme } = useTheme()
    const { cart } = useShoppingCart()


    useGoogleOneTapLogin({
        onSuccess: async (googleresponse) => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}accounts/google/login/`,
                {
                    "access_token": googleresponse.credential
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
        },
        onError: () => {
            return console.log("Login failed")
        }
    })


    // Handle scroll effect for glassmorphism
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.onscroll = () => {
                setIsScrolled(window.scrollY > 20);
            };
        }
    }, [])

    const navLinks = [
        { name: 'Home', href: '/home', icon: <Building2 size={25} /> },
        { name: 'Services', href: '/pages/services', icon: <Hammer size={25} /> },
        { name: 'About', href: '/pages/about', icon: <Info size={25} /> },
        { name: 'Shop', href: '/shop', icon: <ShoppingCart size={25} /> },
        { name: 'contact', href: '/pages/contact', icon: <Phone size={25} /> },
    ];

    const path = usePathname()

    return (
        <nav className={`${path.startsWith("/admin/dashboard") ? "hidden" : "block"} ${stylish.className} dark:bg-[var(--teal-dark-dark)] fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white backdrop-blur-md shadow-md py-2' : path !== "/" ? 'bg-white py-2' : 'bg-white backdrop-blur-md py-3'}`}>
            <Link href={{ pathname: "https://wa.me/254727576955" }} target='_blank'>
                <div className='fixed right-0 top-22 flex justify-center align-center dark:bg-green-400 bg-green-400  w-16 h-14 rounded-md'>
                    <FaWhatsapp size={50} className='text-white dark:text-white' />
                </div>
            </Link>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* LOGO */}
                <div className="flex items-center gap-2 group cursor-pointer"
                >
                    <Link href="/">
                        <div className="w-15 h-15 rounded-lg flex items-center justify-center transition-colors">
                            <img src="/esl-logo.png" alt="evoque space logo" className='h-12' />
                        </div>
                    </Link>
                </div>

                {/* DESKTOP LINKS */}
                <div className={`hidden md:flex items-center gap-10  p-4 pr-6 pl-6 rounded-full`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-1.5 font-normal dark:text-white flex-col ${isScrolled ? "text-[var(--teal-dark-dark)]" : "text-[var(--teal-dark-dark)]"} ${path === link.href && "text-[var(--teal-dark-dark)]"} hover:text-[var(--teal-dark-dark)] text-xl`}
                        >
                            {link.name}
                            {path === link.href && <div className={`${isScrolled ? "w-full rounded-full h-[3px] -mt-1 bg-[var(--teal-dark-dark)]" : "w-full rounded-full h-[3px] -mt-1 bg-[var(--teal-light)]"}`}>

                            </div>}
                        </a>

                    ))}
                </div>

                {/* DESKTOP ACTIONS */}
                <div className="hidden md:flex items-center gap-5">
                    <button
                        onClick={() => {
                            setIsDark(!isDark),
                                isDark ? setTheme("light") : setTheme("dark")
                        }}
                        className={`p-2 rounded-lg dark:bg-gray-800 transition-colors duration-300 ${isScrolled ? "bg-[var(--teal-dark-light)] text-white" : "bg-[var(--teal-dark-dark)] text-white"}`}
                        aria-label="Toggle Theme"
                    >
                        {isDark ? (
                            <Sun className={`w-5 h-5 text-black ${isScrolled ? "text-[var(--teal-dark-dark)] text-white" : "text-[var(--teal-dark-dark)] text-white"}`} />
                        ) : (
                            <Moon className={`w-5 h-5 text-slate-700 ${isScrolled ? "text-[var(--teal-dark-dark)] text-white" : "text-[var(--teal-dark-dark)] text-white"}`} />
                        )}
                    </button>
                    <button className={`p-2 ${isScrolled ? "text-[var(--teal-dark-dark)]" : "text-[var(--teal-dark-dark)]"} dark:text-white hover:bg-[var(--teal-light)] hover:text-[var(--teal-dark-dark)] rounded-full transition-all`}>
                        <User2 size={24} className='' />
                    </button>
                    <div className={`relative p-2 ${isScrolled ? "text-[var(--teal-light)]" : "text-[var(--teal-dark-dark)]"} dark:text-white hover:bg-[var(--teal-light)] hover:text-[var(--teal-dark-dark)] rounded-full cursor-pointer`}>
                        <ShoppingCart size={25} />
                        <span className="absolute top-1 right-1 bg-[var(--teal-dark-dark)] text-white text-md w-4 h-4 rounded-full flex items-center dark:bg-white dark:text-black justify-center font-bold">{cart?.length}</span>
                    </div>
                    <Link href={{ pathname: "https://wa.me/254727576955" }}>
                        <button className={`flex  space-x-2 bg-[var(--teal-dark-light)] ${isScrolled ? "border border-2-white bg-white text-[var(--teal-dark-dark)]" : "text-white"} px-6 py-2.5 dark:bg-[var(--teal-dark-light)]  dark:text-white rounded-md font-bold hover:bg-[#0C7779]`}>
                            <p className='text-md font-semibold md:hidden lg:block'>Request Quatation</p>
                        </button>
                    </Link>
                    <Link href={{ pathname: "/pages/auth/signin" }}>
                        <button className={`flex  space-x-2 bg-[var(--teal-dark-dark)] text-white px-6 py-2.5 dark:bg-[var(--teal-dark-light)]  dark:text-white rounded-md font-bold hover:bg-[var(--teal-dark-light)]`}>
                            <p className='text-md font-semibold md:hidden lg:block'>Sign In</p>
                            <LogIn className='' size={20} />
                        </button>
                    </Link>
                </div>



                {/* MOBILE MENU TOGGLE */}
                <div className={`relative p-2 lg:hidden ml-20 ${isScrolled ? "text-[var(--teal-light)]" : "text-[var(--teal-dark-dark)]"} dark:text-white hover:bg-[var(--teal-light)] hover:text-[var(--teal-dark-dark)] rounded-full cursor-pointer`}>
                    <ShoppingCart size={28} />
                    <span className="absolute top-1 right-1 bg-[var(--teal-dark-dark)] text-white text-md w-5 h-5 rounded-full flex items-center dark:bg-white dark:text-black justify-center font-bold">{0}</span>
                </div>

                <button
                    onClick={() => {
                        setIsDark(!isDark),
                            isDark ? setTheme("light") : setTheme("dark")
                    }}
                    className={`absolute lg:hidden md:hidden right-20 p-2 rounded-lg dark:bg-gray-800 transition-colors duration-300 ${isScrolled ? "bg-[var(--teal-light)] text-white" : "bg-[var(--teal-dark-light)] text-white"}`}
                    aria-label="Toggle Theme"
                >
                    {isDark ? (
                        <Sun className={`w-5 h-5 text-black ${isScrolled ? "text-[var(--teal-dark-dark)] text-white" : "text-[var(--teal-dark-dark)] text-white"}`} />
                    ) : (
                        <Moon className={`w-5 h-5 text-slate-700 ${isScrolled ? "text-[var(--teal-dark-dark)] text-white" : "text-[var(--teal-dark-dark)] text-white"}`} />
                    )}
                </button>
                <button
                    className={`md:hidden p-2 dark:text-white ${isScrolled ? "text-[var(--teal-dark-dark)]" : "text-[var(--teal-dark-dark)]"} text-xl`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE OVERLAY MENU */}
            <div className={`fixed h-full inset-0 top-[72px] mt-3 ${isScrolled ? "bg-white min-h-screen" : "bg-white z-0 min-h-screen"} z-50 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col p-6 gap-6 ">

                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-4 text-xl font-bold ${isScrolled ? "text-[var(--teal-dark-dark)] " : "text-[var(--teal-dark-dark)]"} border-b border-slate-100 pb-4`}
                        >
                            <span className={`${isScrolled ? "text-[var(--teal-dark-dark)]" : "text-[var(--teal-dark-dark)]"}`}>{link.icon}</span>
                            {link.name}
                        </a>
                    ))}
                    <div className="mt-4 flex flex-col gap-4">
                        <button className="w-full bg-slate-100 text-[#005461] py-4 rounded-2xl font-bold">
                            My Cart (3 Items)
                        </button>
                        <button className="w-full bg-[#005461] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#005461]/20">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;