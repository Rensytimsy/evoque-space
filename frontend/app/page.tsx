import Link from "next/link";
import Image from "next/image";
import HomePage from "./page-components/Home";
import AboutPage from "./pages/about/page";
import MoreInfo from "@/app/page-components/more-info";
import Services from "./services/page";
import ContactPage from "./pages/contact/page";
import TopRequestedServices from "./page-components/services";
import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
    return (
        <div className="">
            <div>
                            <Link href={{ pathname: "https://wa.me/254727576955" }} target='_blank'>
                                <div className='fixed right-1 bottom-5 z-100 lg:bottom-5 md:bottom-5 flex justify-center align-center dark:bg-green-400 bg-green-400  w-16 h-15 rounded-full'>
                                    <FaWhatsapp size={50} className='text-white dark:text-white mt-1' />
                                </div>
                            </Link>
            </div>
            <HomePage />
            <TopRequestedServices />
            <AboutPage />
            <MoreInfo />
            <ContactPage />
        </div>
    );
}
