"use client"
import React, { useState, useEffect } from "react"

import { Search, Hammer, ShoppingCart, Paintbrush, ArrowRight, Shield, Sun, Cpu, ShieldCheck, Video, Lock, Droplets, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from "next/link";
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
        <div className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute -inset-0 lg:-left-55 lg:w-2/3 w-2/2 lg:bg-[var(--teal-dark-light)] bg-[var(--teal-dark-light)] md:bg-white dark:bg-[var(--teal-dark-dark)] lg:skew-x-25 md:skew-x-54 md:left-10 md:w-3/2 skew-x-30 -left-85"></div>

            {/* Subtle Grid Overlay for "Technical" feel */}
            {/* <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" /> */}

            <header className="relative w-full pt-20 pb-12 z-10">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Mission & Authority */}
                    <div>
                        <div className="space-y-8 mt-10">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-7xl leading-[1.1] tracking-tight">
                                    {/* Line 1: Power */}
                                    <span className="block lg:text-white dark:text-white">
                                        High-Performance <span className="sm:text-[var(--teal-dark-dark)] ">Power</span>
                                    </span>

                                    {/* Line 2: Security */}
                                    <span className="block dark:text-slate-100 lg:text-white">
                                        Precision Security
                                    </span>

                                    {/* Line 3: Integration */}
                                    <span className="block relative">
                                        <span className="relative z-10 text-[var(--teal-dark-dark)] dark:text-[var(--teal-light)]">
                                            Smart Integration
                                        </span>
                                        {/* Subtle underline for the final punchy word */}
                                        <span className="absolute bottom-2 left-0 h-3 w-48 bg-[var(--teal-light)]/20 -z-10 hidden lg:block" />
                                    </span>
                                </h1>
                            </div>

                            <p className="text-lg lg:text-white max-w-lg leading-relaxed">
                                Evoque Spaces Limited is a leading provider of integrated solar energy, security, and smart infrastructure solutions for residential and commercial developments.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href={{ pathname: "/pages/shop" }}>
                                    <button className="dark:bg-[var(--teal-light)] bg-[var(--teal-dark-dark)] hover:bg-[var(--teal-dark-dark)] text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 group">
                                        Shop
                                        <ShoppingCart className="text-white" size={20} />
                                    </button>
                                </Link>
                                {/* <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all">
                                    View Our Projects
                                </button> */}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Component */}
                    <div className="relative">
                        {/* Main Architectural Image */}
                        <div className="relative z-10 group w-full max-w-[650px] mx-auto">
                            {/* Soft Glow Background */}
                            <div className="absolute -inset-4  rounded-[3rem]" />

                            {/* Main Container */}
                            <div className="relative border-white/5 overflow-hidden rounded-md bg-transparent aspect-[4/5] sm:aspect-square md:aspect-[4/5]">

                                {/* Slides */}
                                {INFRA_SERVICES.map((service, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
                                            }`}
                                    >
                                        {/* Background Image */}
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-contain"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0  to-transparent" />

                                        {/* Content Overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div>
                                                    <div className="p-2 bg-[var(--teal-light)] backdrop-blur-md rounded-lg w-10">
                                                        {service.icon}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-[var(--teal-dark-dark)]/20 p-4 rounded-md">
                                                <h3 className="text-3xl font-bold text-white mb-3">
                                                    {service.title}
                                                </h3>
                                                {/* 
                                                <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-sm">
                                                    {service.desc}
                                                </p> */}

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