'use client'

import Image from "next/image";
import HomePage from "@/app/page-components/Home";
import AboutPage from "../pages/about/page";
import MoreInfo from "@/app/page-components/more-info";
import Services from "../pages/services/page";
import { PanelTop, BatteryMedium, Zap, House, Leaf, Sun } from "lucide-react";
import ContactPage from "../pages/contact/page";
import { TopServices } from "../page-components/top-services";


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
            <ContactPage />
        </div>
    );
}
