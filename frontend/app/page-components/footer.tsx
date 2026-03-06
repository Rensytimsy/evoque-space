"use client"
import { Linkedin, Twitter, Facebook, ArrowUpRight } from "lucide-react"
import { stylish } from "@/fonts"
export default function Footer() {

    const nowDate = new Date()


    return (
        <footer className={`bg-[var(--teal-dark-dark)] pt-20 pb-10 px-6 lg:px-12 z-100 ${stylish.className}`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 pb-16 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-4xl text-white tracking-tight mb-2">Evoque Spaces <span className="text-[var(--teal-light)] text-md">Limited</span></h2>
                            <p className="text-white text-sm tracking-[0.2em]">
                                Solar · Security · Smart Infrastructure
                            </p>
                        </div>
                        <p className="text-white text-md leading-relaxed max-w-sm">
                            Building secure, energy-efficient, and future-ready spaces across Kenya and Africa since 2014. Professional excellence in every watt and wire.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: <Linkedin size={18} />, label: "in" },
                                { icon: <Twitter size={18} />, label: "tw" },
                                { icon: <Facebook size={18} />, label: "fb" },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href="#"
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white hover:bg-[var(--teal-light)] hover:text-[var(--teal-dark-dark)] transition-all duration-300 shadow-inner"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    {[
                        {
                            title: "Services",
                            items: ["Solar Energy", "CCTV & Surveillance", "Perimeter Security", "Low-Voltage Networks", "Smart Automation"]
                        },
                        {
                            title: "Company",
                            items: ["About Us", "Vision & Mission", "Our Process", "Products", "Careers"]
                        },
                        {
                            title: "Contact",
                            items: ["info@evoquespaces.com", "+254 727 494 414", "Nairobi, Kenya", "Mon–Fri 8am–6pm", "24/7 Support Line"]
                        }
                    ].map((column) => (
                        <div key={column.title}>
                            <h3 className="text-[var(--teal-light)] font-semibold text-lg tracking-[0.2em] uppercase mb-6 ">
                                {column.title}
                            </h3>
                            <ul className="space-y-4">
                                {column.items.map(item => (
                                    <li key={item}>
                                        <a href="#" className="text-white hover:text-[var(--teal-light)] text-md transition-colors flex items-center group gap-1">
                                            {item}
                                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-8">
                        <span className="text-md tracking-widest text-white uppercase">
                            © {nowDate.getFullYear()} Evoque Spaces Ltd
                        </span>
                        <div className="hidden md:block h-4 w-px bg-white/10" />
                        <div className="flex gap-4  text-md tracking-widest text-slate-500 uppercase">
                            <a href="#" className="hover:text-white transition-colors text-white text-sm">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors text-white text-sm">Terms</a>
                        </div>
                    </div>

                    <span className="text-md text-white hover:text-white transition-colors cursor-default">
                        Secure. Sustainable. Future-Ready.
                    </span>

                </div>
                <br />
                <div className="flex justify-center align-center">
                    <a href="https://www.linkedin.com/in/timothy-mutwiri-9900a2262/" className="text-white underline text-sm text-center">( Website Developed and Designed by Timothy +254746964592 )</a>
                </div>
            </div>
        </footer>
    )
}