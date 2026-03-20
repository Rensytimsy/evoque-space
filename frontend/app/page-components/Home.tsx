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
    const { theme } = useTheme()

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
       <div className="flex justify-center align-center w-screen relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[var(--teal-dark-dark)]/20">
    
    {/* Updated Background Image Layer */}
    <div className="absolute inset-0 opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-normal bg-[var(--teal-dark-dark)] bg-[url('/hero-bg.jpg')] pointer-events-none bg-no-repeat bg-cover bg-center" />
    
    <div className="flex flex-col items-center w-full"> 
        <header className="relative w-screen pt-0 pb-22 z-10 lg:mt-25 mb-30 h-full p-2">
            <div className="flex flex-col items-center w-full">
                <div className="relative space-y-8 lg:mt-10 mt-25 text-center flex flex-col items-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl lg:text-5xl leading-[1.1] tracking-tight">
                            <span className="block text-[var(--teal-dark-dark)] dark:text-white font-bold">
                                High-Performance <span className="text-[var(--teal-dark-light)] font-bold">Power</span>
                            </span>
                            <span className="block dark:text-slate-100 text-[var(--teal-dark-dark)] font-bold">
                                Precision Security
                            </span>
                            <span className="block relative">
                                <span className="relative z-10 text-[var(--teal-dark-light)] font-bold dark:text-[var(--teal-light)]">
                                    Smart Integration
                                </span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-13 w-96 p-2 -skew-x-15 bg-[var(--teal-dark-light)]/30 -z-10 hidden lg:block" />
                            </span>
                        </h1>
                    </div>
                    <p className="text-lg font-semibold text-[var(--teal-dark-dark)] dark:text-white max-w-lg leading-relaxed mx-auto">
                        Evoque Spaces Limited is a leading provider of integrated solar energy, security, and smart infrastructure solutions for residential and commercial developments.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href={{ pathname: "/pages/shop" }}>
                            <button className="dark:bg-[var(--teal-light)] bg-[var(--teal-dark-dark)] hover:bg-[var(--teal-dark-dark)] text-white px-8 py-4 rounded-md font-bold transition-all flex items-center gap-2 group">
                                Visit Shop
                                <ShoppingCart className="text-white" size={20} />
                            </button>
                        </Link>
                        <Link href={{ pathname: "/pages/services" }}>
                            <button className="dark:bg-[var(--teal-light)] bg-white text-[var(--teal-dark-dark)] border border-2 border-[var(--teal-dark-dark)] hover:bg-[var(--teal-dark-light)] hover:text-white hover:border-white px-8 py-4 rounded-md font-bold transition-all flex items-center gap-2 group">
                                Explore Solutions
                            </button>
                        </Link>
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