'use client'

import Image from "next/image";
import LandingPage from "./pages/test/page";
import NavigationBar from "./page-components/navigationbar";
import HomePage from "./page-components/Home";
import AboutPage from "./pages/about/page";
import Services from "./pages/services/page";
import ContactPage from "./pages/contact/page";
import { Sun, BatteryMedium, Zap, PanelTop, Leaf, House } from 'lucide-react';
import Footer from "./page-components/footer";
import MoreInfo from "./page-components/more-info";
import { TopServices } from "./page-components/top-services";


const SOLAR_ITEMS = [
    { icon: <PanelTop size={20} />, label: "PV Panel Installation" },
    { icon: <BatteryMedium size={20} />, label: "Energy Storage" },
    { icon: <Zap size={20} />, label: "Smart Grid Integration" },
    { icon: <House size={20} />, label: "Residential Systems" },
    { icon: <Leaf size={20} />, label: "Eco-Consulting" },
];

export default function Home() {
    return (
        <div className="">
            <HomePage />
            <TopServices />
            <AboutPage />
            <MoreInfo />
            <div>
                <div className="w-full bg-[var(--teal-dark-dark)] py-6 border-y border-teal-800/30">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-8">

                            {/* Label / Branding */}
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="p-2 bg-[var(--teal-light)] rounded-full text-white">
                                    <Sun className="animate-pulse" size={18} />
                                </div>
                                <span className="text-white font-bold uppercase tracking-widest text-xs">
                                    Solar Solutions
                                </span>
                            </div>

                            {/* Vertical Divider (Desktop Only) */}
                            <div className="hidden md:block h-8 w-px bg-teal-700/50" />

                            {/* Scrollable/Flex List */}
                            <div className="flex flex-1 items-center justify-between overflow-x-auto no-scrollbar gap-8">
                                {SOLAR_ITEMS.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 group cursor-default shrink-0"
                                    >
                                        <span className="text-[var(--teal-light)] group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </span>
                                        <span className="text-teal-50/80 text-sm font-medium whitespace-nowrap group-hover:text-white transition-colors">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ContactPage />
        </div>
    );
}
