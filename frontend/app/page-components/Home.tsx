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

interface Solution {
    id: string;
    title: string;
    tagline: string;
    description: string;
    features: string[];
    price: string;
    unit: string;
    category: string;
    badge?: string;
    accentColor: string;
    number: string;
}

const defaultSolutions: Solution[] = [
    {
        id: "1", number: "01",
        title: "Solar Solutions",
        tagline: "Own your electricity.",
        description: "High-efficiency monocrystalline panels engineered for East African rooftops. Reduce your electricity bill by up to 90% and gain full energy independence with a 25-year performance guarantee.",
        features: ["25-yr performance warranty", "Up to 22% cell efficiency", "Live monitoring app", "Impact-resistant glass"],
        price: "KSh 350,000", unit: "per system",
        category: "Residential", badge: "Best Seller",
        accentColor: "#F5C518",
    },
    {
        id: "2", number: "02",
        title: "Perimeter Security",
        tagline: "Power your operations.",
        description: "Utility-scale solar installations for businesses, factories, and commercial premises. Custom-engineered systems with guaranteed ROI within 4 years.",
        features: ["Custom system design", "Grid-tie & off-grid", "Tax incentive support", "24/7 remote monitoring"],
        price: "KSh 2,500,000", unit: "starting",
        category: "Commercial",
        accentColor: "#4ECDC4",
    },
    {
        id: "3", number: "03",
        title: "Cctv's Installation",
        tagline: "Free hot water, forever.",
        description: "Evacuated tube and flat-plate solar water heaters for homes, hotels, hospitals, and schools. Eliminate water heating costs entirely.",
        features: ["200L-5,000L capacity", "Stainless steel tank", "Backup electric element", "5-year full warranty"],
        price: "KSh 85,000", unit: "per unit",
        category: "Thermal",
        accentColor: "#FF6B6B",
    },
    {
        id: "4", number: "04",
        title: "Solar Gadgets",
        tagline: "Illuminate every road.",
        description: "All-in-one integrated solar street lights. Auto dusk-to-dawn operation with motion sensing. Perfect for estates, roads, and rural electrification.",
        features: ["Auto dusk-to-dawn", "PIR motion sensing", "3-5 night backup", "IP65 weatherproof"],
        price: "KSh 45,000", unit: "per pole",
        category: "Lighting",
        accentColor: "#F5C518",
    },
    {
        id: "5", number: "05",
        title: "Acess Control Solutions",
        tagline: "Water without limits.",
        description: "DC and AC solar pump systems for boreholes, rivers, and tanks. Agricultural irrigation, livestock watering, and community water supply across East Africa.",
        features: ["0.5HP-30HP range", "No generator required", "IoT water management", "Borehole & surface types"],
        price: "KSh 180,000", unit: "per system",
        category: "Agricultural", badge: "New",
        accentColor: "#4ECDC4",
    },
    {
        id: "6", number: "06",
        title: "Plumbing & Sanitary Solutions",
        tagline: "Energy around the clock.",
        description: "LiFePO4 lithium battery banks that store excess solar for nighttime or outage use. Compatible with new and existing solar installations.",
        features: ["LiFePO4 chemistry", "10-year design life", "Scalable from 5 kWh", "Remote management"],
        price: "KSh 120,000", unit: "per 5 kWh",
        category: "Storage",
        accentColor: "#FF6B6B",
    },
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
        <div className="flex justify-center align-center w-screen relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[var(--teal-dark-dark)]/20">
            <div className="absolute inset-0  mix-blend-multiply  bg-white  pointer-events-none bg-no-repeat bg-cover bg-center" />
            <div className="flex flex-col items-center w-full p-2 mt-20">
                <header className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 lg:pt-16 pb-12">

                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center lg:items-start w-full">

                        {/* LEFT — Copy */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full lg:w-1/2">
                            <h1 className="font-bold text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] tracking-tight text-[var(--teal-dark-dark)] dark:text-white">
                                <span className="block">
                                    High-Performance{" "}
                                    <span className="text-[var(--teal-dark-light)]">Power</span>
                                </span>
                                <span className="block dark:text-slate-100">Precision Security</span>
                                <span className="block relative">
                                    <span className="relative z-10 text-[var(--teal-dark-light)] dark:text-[var(--teal-light)]">
                                        Smart Integration
                                    </span>
                                    <span className="absolute bottom-0 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 h-3 w-64 -skew-x-12 bg-[var(--teal-dark-light)]/20 -z-10 hidden lg:block" />
                                </span>
                            </h1>

                            <p className="text-base font-medium text-[var(--teal-dark-dark)] dark:text-white max-w-sm leading-relaxed">
                                Evoque Spaces Limited is a leading provider of integrated solar energy,
                                security, and smart infrastructure solutions for residential and commercial
                                developments.
                            </p>

                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <Link href={{ pathname: "/shop" }}>
                                    <button className="bg-[var(--teal-dark-dark)] dark:bg-[var(--teal-light)] hover:opacity-90 text-white px-7 py-3.5 rounded-lg font-bold transition-all flex items-center gap-2">
                                        Visit Shop
                                        <ShoppingCart size={18} />
                                    </button>
                                </Link>
                                <Link href={{ pathname: "/services" }}>
                                    <button className="bg-[var(--teal-light)] dark:bg-[var(--teal-dark-dark)] text-white dark:text-white hover:bg-[var(--teal-dark-light)] hover:text-white hover:border-[var(--teal-dark-light)] px-7 py-3.5 rounded-lg font-bold transition-all">
                                        Explore Solutions
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Don't style this please */}
                        <div className="flex justify-center border-none items-center w-full lg:w-[600px]">
                            <div
                                className="relative bg-[url('/bg-five.png')] bg-no-repeat  border-none bg-cover bg-center rounded-xl 
            w-full max-w-[400px] lg:max-w-none overflow-hidden
            flex flex-col lg:flex-row justify-between items-stretch md:min-h-[450px] lg:min-h-[450px]  min-h-[400px] lg:max-h-[220px] relative border mb-10"
                            >
                                {/* LEFT — Image Section */}
                                <div className="absolute -right-0 h-64 lg:h-auto lg:w-3/6 lg:relative absolute h-full z-10 overflow-hidden">
                                    <img
                                        src="https://plus.unsplash.com/premium_photo-1682148196781-8bbcdfd7f537?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Solar panels"
                                        className="lg:min-w-full min-w-screen md:min-w-[450px] h-full object-cover blur-none lg:blur-none scale-110 brightness-45 lg:brightness-75"
                                    />
                                    <div className="absolute hidden lg:block top-2 left-2 flex items-center gap-2 bg-white border-none rounded-full px-3 py-1 shadow-sm">
                                        <span className="text-[var(--teal-dark-dark)] text-xs lg:text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                                            Security, Solar, Access control
                                        </span>
                                    </div>
                                </div>

                                {/* RIGHT — Details Section */}
                                <div className="absolute z-10 p-2 max-h-[20vh] border-none lg:left-30 w-full flex flex-col mt-40 justify-center lg:w-3/2 p-6 lg:p-10">
                                    <div className="lg:ml-35">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-5 h-px bg-white rounded" />
                                            <span className="lg:text-white text-white text-[10px] font-extrabold tracking-[0.18em] uppercase">
                                                Solar Solutions
                                            </span>
                                        </div>
                                        <h1 className="lg:text-white lg:text-[var(--teal-dark-dark)] text-white font-black leading-[1.05] text-3xl lg:text-4xl tracking-tight">
                                            Best <span className="text-[var(--teal-dark-light)]">Solar</span><br />
                                            Solution
                                        </h1>
                                        <p className="lg:text-white text-white mt-4 mb-6 text-sm font-md leading-relaxed max-w-[200px]">
                                            We provide the best solar solution for both commercial and residential buildings.
                                        </p>
                                        <div className="flex flex-wrap gap-6 mb-8">
                                            {[["98%", "Efficiency"], ["25Y", "Warranty"], ["60%", "Bill Cut"]].map(([val, label]) => (
                                                <div key={label} className="flex flex-col gap-0.5">
                                                    <span className="lg:text-white text-white text-xl lg:text-2xl font-black leading-none">{val}</span>
                                                    <span className="text-white text-[9px] uppercase tracking-widest opacity-90 font-bold">{label}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4">
                                            {/* <button className="bg-[var(--teal-light)] px-5 py-2.5 rounded-md text-xs lg:text-sm text-white font-bold hover:brightness-110 transition-all">
                                                View Solution →
                                            </button> */}
                                            {/* <button className="lg:text-[var(--teal-dark-dark)] bg-white text-[var(--teal-dark-dark)] hover:text-slate-300 text-[11px] border border-white/30 px-5 py-2.5 rounded-md font-medium transition-colors duration-200">
                                                Learn more
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </header>
            </div>
            <div className="absolute w-screen left-0 right-0 bottom-0 bg-[var(--teal-dark-dark)] dark:bg-[var(--teal-dark-light)] overflow-hidden py-5 border-t font-semibold">
                <div className="animate-ticker flex gap-16 whitespace-nowrap">
                    {[...defaultSolutions, ...defaultSolutions].map((item, i) => (
                        <div key={i} className="font-bebas text-xl tracking-wider text-white dark:text-[var(--teal-dark-dark)] flex items-center gap-6">
                            {item.title}
                            <span className="w-1.5 h-full rounded-full bg-white dark:bg-[var(--teal-dark-dark)] inline-block" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}