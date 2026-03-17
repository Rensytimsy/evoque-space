"use client"
import { Award, Zap, ShieldCheck, Maximize, HeadphonesIcon } from 'lucide-react';

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

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

export default function Services() {
    const [isDark, setIsDark] = useState();
    const [services, setServices] = useState<Service[]>([]);
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

    function useScrollReveal() {
        const ref = useRef<HTMLDivElement>(null);
        const [visible, setVisible] = useState(false);
        useEffect(() => {
            const el = ref.current;
            if (!el) return;
            const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.1 });
            io.observe(el);
            return () => io.disconnect();
        }, []);
        return { ref, visible };
    }

    function showSelectedService({id, title, description, subtitle, category, info, price}:Service){
        setSelectedService({id, title, description, subtitle, category, info, price})
        setClose(false)
    }

    useEffect(() => {
        const get_services = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}services/`)
                setServices(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        get_services()
    }, [])

    console.log(services)


    const WHY_CHOOSE_US = [
        {
            icon: <Award className="text-[var(--teal-light)]" size={24} />,
            title: "Certified Technical Team",
            desc: "Licensed engineers with specialized training in smart infrastructure."
        },
        {
            icon: <Zap className="text-[var(--teal-light)]" size={24} />,
            title: "End-to-End Execution",
            desc: "From initial survey to final testing, we handle the entire project lifecycle."
        },
        {
            icon: <ShieldCheck className="text-[var(--teal-light)]" size={24} />,
            title: "Premium Trusted Brands",
            desc: "We exclusively use Tier-1 components and industry-leading hardware."
        },
        {
            icon: <Maximize className="text-[var(--teal-light)]" size={24} />,
            title: "Scalable Solutions",
            desc: "Modular designs that grow alongside your property or business needs."
        },
        {
            icon: <HeadphonesIcon className="text-[var(--teal-light)]" size={24} />,
            title: "After-Sales Support",
            desc: "Dedicated technical maintenance and 24/7 emergency response lines."
        }
    ];

    return (
        <div>
            <section className="relative py-24 bg-white dark:bg-[var(--teal-dark-dark)]/20 overflow-hidden">
                {!close && <div 
                onClick={() => setClose(true)}
                className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
                    <div 
                    className="relative h-[90vh] w-full max-w-md m-4 mt-10 bg-white rounded-md shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Header Section */}
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800">{selectedService.title}</h2>
                            <p className="text-sm text-gray-500 mt-1">{selectedService.subtitle}</p>
                        </div>

                        <div>
                            <p className="text-md text-black mt-1 p-2">{selectedService.description}</p>
                        </div>

                        {/* Body Section */}
                        <div className="p-6 flex-1">
                            <ol className="text-gray-600 list-disc leading-relaxed">
                                {selectedService.info.split("\n").map((l, i) => (
                                    <li key={i}>{l}</li>
                                ))}
                            </ol>

                            <div className="mt-8">
                                <span className="text-sm text-gray-600 uppercase tracking-wider font-semibold">Total Price</span>
                                <p className="text-3xl font-extrabold text-gray-600">KES {selectedService.price} /<span className='text-md font-semibold'>per unit</span></p>
                            </div>
                        </div>

                        {/* Footer/Actions Section */}
                        <div className="p-6 bg-gray-50 flex flex-col gap-3">
                            <button className="w-full py-3 px-4 bg-[var(--teal-dark-dark)]  hover:bg-[var(--teal-dark-light)] text-white font-semibold rounded-md transition-all shadow-lg shadow-blue-200">
                                Get Solution
                            </button>
                            <Link href={{ pathname: "https://google.com"}}>
                                <button className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-[var(--teal-dark-dark)] hover:text-white text-gray-700 font-semibold rounded-md transition-all">
                                    Request Quotation
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>}
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <span className="dark:text-white font-bold text-[var(--teal-dark-dark)] font-bold tracking-widest uppercase text-sm block mb-2">
                                    Our Services
                                </span>
                                <h2 className="dark:text-white font-bold text-4xl md:text-5xl text-slate-900 leading-tight">
                                    Integrated <em className="text-[var(--teal-dark-light)] not-italic font-bold">Solutions</em><br />
                                    for Modern Spaces
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-8 mt-12">
                        {services.map((s, i) => (
                            <div key={i}>
                                <div className="group dark:bg-[var(--teal-dark-dark)] h-full flex flex-col bg-slate-50 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 hover:bg-white">

                                    <h3 className="text-[var(--teal-dark-dark)] dark:text-white text-2xl font-semibold mb-4">
                                        {s.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-white mb-8 leading-relaxed">
                                        {s.subtitle}
                                    </p>

                                    <p className="text-slate-600 dark:text-white mb-8 leading-relaxed">
                                        {s.description}
                                    </p>
                                    <ul className="list-disc list-inside text-slate-600 dark:text-white mb-8 space-y-2">
                                        {s.info.split('\n').map((item, index) => (
                                            <li key={index} className="leading-relaxed">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* <ul className="space-y-3 mb-10 flex-grow dark:text-white">
                                        {s.info.map(f => (
                                            <li key={f} className="flex dark:text-white items-start gap-3 text-slate-700 text-sm">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--teal-dark-dark)] dark:bg-[var(--teal-light)] shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul> */}

                                    <button
                                        onClick={() => showSelectedService(s)}
                                        className="mt-auto flex items-center gap-2 dark:bg-[var(--teal-light)] font-mono text-xs tracking-[0.12em] bg-[var(--teal-dark-dark)] rounded-sm dark:hover:text-[var(--teal-dark-dark)] w-full p-2 uppercase text-white font-bold hover:text-[var(--teal-light)] transition-all"
                                    >
                                        Request Quatation <span className="text-lg">→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}