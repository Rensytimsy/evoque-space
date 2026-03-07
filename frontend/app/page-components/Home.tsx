"use client"
import React, { useState, useEffect } from "react"

import { Search, Hammer, ShoppingCart, Paintbrush, ArrowRight, Shield, Sun, Cpu, ShieldCheck, Video, Lock, Droplets, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from "next/link";
import { useTheme } from "next-themes";


const INFRA_SERVICES = [
    {
        title: "Renewable Energy & Power",
        desc: "Tier-1 Solar PV installations and smart battery storage for energy independence.",
        image: "/services/renewable_energy.jpeg",
        icon: <Sun className="text-[var(--teal-dark-dark)]" />,
        link: "/services/solar"
    },
    {
        title: "Security & Surveillance Solutions",
        desc: "AI-powered CCTV systems with 24/7 remote monitoring and thermal imaging.",
        image: "/services/security_and_surveliance.jpg",
        icon: <Video className="text-[var(--teal-dark-dark)]" />,
        link: "/services/security_and_surveliance.jpg"
    },
    {
        title: "Perimeter Security",
        desc: "Advanced electric fencing and seismic sensors for total boundary protection.",
        image: "/services/perimeter_security.jpg",
        icon: <ShieldCheck className="text-[var(--teal-dark-dark)]" />,
        link: "/services/perimeter"
    },
    {
        title: "Access Control Solutions",
        desc: "Biometric and RFID systems to manage personnel flow securely and efficiently.",
        image: "/services/access_control.webp",
        icon: <Lock className="text-[var(--teal-dark-dark)]" />,
        link: "/services/access"
    },
    {
        title: "Plumbing & Sanitary Solutions",
        desc: "Precision engineering for modern water reticulation and waste management.",
        image: "/services/Plumbing_and_sanitary.jpeg",
        icon: <Droplets className="text-[var(--teal-dark-dark)]" />,
        link: "/services/plumbing"
    }
];


export default function HomePage() {
    const [current, setCurrent] = useState(0);
    const {theme} = useTheme()

    console.log(theme)

    // Auto-play logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === INFRA_SERVICES.length - 1 ? 0 : prev + 1));
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent(current === INFRA_SERVICES.length - 1 ? 0 : current + 1);
    const prevSlide = () => setCurrent(current === 0 ? INFRA_SERVICES.length - 1 : current - 1);

    return (
        <div className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[var(--teal-dark-dark)]/20">
            {/* <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" /> */}

            <header className="relative w-full pt-0 pb-12 z-10 lg:-mt-10">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Mission & Authority */}
                    <div>
                        <div className="relative space-y-8 lg:mt-10 mt-25">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-5xl leading-[1.1] tracking-tight">
                                    {/* Line 1: Power */}
                                    <span className="block text-[var(--teal-dark-dark)] dark:text-white font-bold">
                                        High-Performance <span className="text-[var(--teal-dark-light)] font-bold">Power</span>
                                    </span>

                                    {/* Line 2: Security */}
                                    <span className="block dark:text-slate-100 text-[var(--teal-dark-dark)] font-bold">
                                        Precision Security
                                    </span>

                                    {/* Line 3: Integration */}
                                    <span className="block relative">
                                        <span className="relative z-10 text-[var(--teal-dark-light)] font-bold dark:text-[var(--teal-light)]">
                                            Smart Integration
                                        </span>
                                        {/* Subtle underline for the final punchy word */}
                                        <span className="absolute bottom-0 left-0 right-2 h-13 w-96 p-2 -skew-x-15 bg-[var(--teal-dark-light)]/30 -z-10 hidden lg:block" />
                                    </span>
                                </h1>
                            </div>

                            <p className="text-lg font-semibold text-[var(--teal-dark-dark)] dark:text-white max-w-lg leading-relaxed">
                                Evoque Spaces Limited is a leading provider of integrated solar energy, security, and smart infrastructure solutions for residential and commercial developments.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href={{ pathname: "/pages/shop" }}>
                                    <button className="dark:bg-[var(--teal-light)] bg-[var(--teal-dark-dark)] hover:bg-[var(--teal-dark-dark)] text-white px-8 py-4 rounded-md font-bold transition-all flex items-center gap-2 group">
                                        Shop
                                        <ShoppingCart className="text-white" size={20} />
                                    </button>
                                </Link>
                                <button className="flex space-x-2  rounded-md border dark:text-white dark:border dark:border-2 dark:border-white border-4 text-[var(--teal-dark-dark)] hover:text-white hover:bg-[var(--teal-dark-dark)] px-8 py-4 font-bold transition-all">
                                    <p>View Solutions</p>
                                    <ArrowRight size={20} className="mt-1"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 group w-full max-w-[650px] mx-auto">
                            <div className="relative border-white/5  overflow-hidden rounded-md aspect-[4/5] sm:aspect-square md:aspect-[4/5]">
                                {INFRA_SERVICES.map((service, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all  duration-1000 rounded-md ease-in-out ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
                                            }`}
                                    >
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-contain lg:p-4"
                                        />

                                        {/* Content Overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                                            <div className="flex items-center gap-3 mb-4">
                                            </div>
                                            <div className="bg-[var(--teal-dark-dark)]/20 p-4 rounded-md">
                                                <h3 className="text-3xl font-bold text-white mb-3">
                                                    {service.title}
                                                </h3>
                                                
                                                <p className="hidden lg:block text-white text-sm leading-relaxed mb-8 max-w-sm">
                                                    {service.desc}
                                                </p>

                                                <button
                                                    onClick={() => window.location.href = service.link}
                                                    className="flex items-center gap-3 bg-[var(--teal-light)] text-white hover:text-[var(--teal-dark-dark)] px-6 py-3 rounded-xl font-bold text-sm transition-all hover:pr-8"
                                                >
                                                    Get Service or Products
                                                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Navigation Arrows */}
                                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-20">
                                    <button
                                        onClick={prevSlide}
                                        className="p-2 rounded-full bg-[var(--teal-dark-dark)]/25 backdrop-blur-md border border-white/10 text-white hover:bg-[var(--teal-light)] hover:text-black transition-all"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="p-2 rounded-full bg-[var(--teal-dark-dark)]/25 backdrop-blur-md border border-white/10 text-white hover:bg-[var(--teal-light)] hover:text-black transition-all"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                {/* Slide Indicators */}
                                <div className="absolute top-8 right-8 flex gap-2 z-20">
                                    {INFRA_SERVICES.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 transition-all duration-500 rounded-full ${i === current ? "w-8 bg-[var(--teal-light)]" : "w-2 bg-white/30"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        </div>
    )
}