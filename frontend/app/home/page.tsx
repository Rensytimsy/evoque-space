import Image from "next/image";
import HomePage from "@/app/page-components/Home";
import AboutPage from "../pages/about/page";
import MoreInfo from "@/app/page-components/more-info";
import Services from "../services/page";
import ContactPage from "../pages/contact/page";
import TopRequestedServices from "../page-components/services";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="">
            <HomePage />
            <TopRequestedServices />
            <AboutPage />
            <MoreInfo />
            <ContactPage />
        </div>
    );
}
