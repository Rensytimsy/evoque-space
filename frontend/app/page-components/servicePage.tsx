"use client"
import { Award, Zap, ShieldCheck, Maximize, HeadphonesIcon } from 'lucide-react';

import { useState, useRef, useEffect } from "react"
import Link from "next/link";
import axios from "axios"

const SERVICES = [
    {
        num: "01",
        icon: "☀️",
        tag: "Solar Energy",
        title: "Solar Power Systems",
        desc: "Complete solar energy design and installation for maximum efficiency. We assess your energy needs and deliver systems providing consistent output and significant long-term savings.",
        features: ["Rooftop & Ground-Mount Installations", "Battery Storage & Backup", "Grid-Tied, Off-Grid & Hybrid", "Energy Monitoring & Management", "Maintenance & Performance Reports"],
        highlight: true,
    },
    {
        num: "02",
        icon: "📷",
        tag: "Security",
        title: "CCTV & Perimeter Security",
        desc: "Advanced surveillance and access control systems providing complete coverage and real-time monitoring for homes and commercial properties of every scale.",
        features: ["HD & 4K Camera Systems", "Electric Fence & Perimeter Alarms", "Access Control & Biometrics", "Remote Monitoring & Alerts", "Intercom & Gate Automation"],
        highlight: false,
    },
    {
        num: "03",
        icon: "🔌",
        tag: "Smart Infrastructure",
        title: "Low-Voltage Networks",
        desc: "Intelligent building infrastructure including structured cabling, networking, home automation, and smart building integration systems built to last.",
        features: ["Structured Data Cabling", "Home & Building Automation", "Fibre & Network Infrastructure", "AV & Public Address Systems", "Smart Lighting & Control"],
        highlight: false,
    },
];

interface Service {
    title: string,
    description: string,
    price: number | undefined,
    subtitle: string,
    info: string,
    category: string,
    id: string
}

export default function ServicePageData({servicesdata}:{servicesdata: Service[]}) {
    const [close, setClose] = useState<boolean>(true)
    const [selectedService, setSelectedService] = useState<Service>({
        id: "",
        title: "",
        description: "",
        category: "",
        info: "",
        subtitle: "",
        price: undefined
    })


    function showSelectedService({id, title, description, subtitle, category, info, price}:Service){
        setSelectedService({id, title, description, subtitle, category, info, price})
        setClose(false)
    }


    return (
        <div>
            <section className="relative py-24 bg-white dark:bg-[var(--teal-dark-dark)]/20 overflow-hidden">
               
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="w-full max-w-7xl mx-auto px-4 py-5">
                    <div className="flex flex-col md:flex-row md:items-end justify-around mb-5 gap-4">
                        <div className="relative pl-6 md:pl-8">
                            <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[var(--teal-dark-light)] rounded-full" />
                            <h1 className="text-5xl md:text-5xl font-black tracking-tighter text-[var(--teal-dark-dark)] dark:text-white uppercase leading-[0.85]">
                                Our Services
                            </h1>
                            <h2 className="mt-6 text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 leading-tight max-w-xl">
                                Integrated <span className="text-[var(--teal-dark-light)]">Solutions</span> for Modern Spaces
                            </h2>
                        </div>
                        <div className="md:max-w-xs">
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed  border-gray-200 dark:border-gray-800 pl-4">
                                Delivering high-performance engineering from renewable energy to advanced security systems.
                            </p>
                        </div>
                    </div>

                </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-8 mt-12">
                        {servicesdata.map((s, i) => (
                            <div key={i} className="border shadow-xs rounded-xl">
                                <div className="relative group dark:bg-[var(--teal-dark-dark)] h-full flex flex-col bg-white p-8 rounded-2xl">

                                    <h3 className="text-[var(--teal-dark-dark)] dark:text-white text-2xl font-semibold mb-4">
                                        {s.title}
                                    </h3>

                                    <p className="text-[var(--teal-dark-dark)] dark:text-white mb-8 leading-relaxed">
                                        {s.subtitle}
                                    </p>

                                    <p className="text-[var(--teal-dark-dark)] dark:text-white mb-8 leading-relaxed">
                                        {s.description}
                                    </p>
                                    <ul className="list-disc list-inside text-[var(--teal-dark-dark)] mb-5 dark:text-white mb-8 space-y-2">
                                        {s.info.split('\n', 5).map((item, index) => (
                                            <li key={index} className="leading-relaxed">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="absolute bottom-1 w-[95%]  left-2 right-0  p-1 rounded-md flex  items-stretch border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                                        <Link 
                                            href="https://wa.me/254727576955" 
                                            target="_blank" 
                                            className="flex-[1.2] group border-r border-gray-100 dark:border-gray-800"
                                        >
                                            <button className="w-full h-full p-4 flex items-center justify-center gap-2 bg-[var(--teal-dark-dark)] dark:bg-[var(--teal-light)] text-white dark:text-[var(--teal-dark-dark)] transition-all hover:opacity-90">
                                                <span className="text-[10px] font-black uppercase tracking-widest">Get Quotation</span>
                                                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                                            </button>
                                        </Link>
                                        <a 
                                            href="tel:+254727576955" 
                                            className="flex-1 group"
                                        >
                                            <button className="w-full h-full p-4 flex flex-col items-center hover:text-[var(--teal-dark-dark)] justify-center bg-[var(--teal-light)] border border-1 border-[var(--teal-light)] dark:bg-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <span className="text-[10px] uppercase text-[var(--teal-dark-dark)] dark:text-gray-500 font-bold">Call Now</span>
                                                <p className="text-[13px] mt-1 font-bold text-[var(--teal-dark-dark)] dark:text-white">+254 727 576 955</p>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}