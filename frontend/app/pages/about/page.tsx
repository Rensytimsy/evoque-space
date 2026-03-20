"use client"

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { Shield, Target, Leaf, Users, Award, Building, Cpu, Handshake, Blocks, BadgeCheck, Headset, Smile } from 'lucide-react';

const COLORS = {
    teal: "#3BC1A8",
    deep: "#005461",
    mid: "#1FADAD",
    white: "#ffffff",
    darkBg: "#005461",
    darkSurface: "#00404d",
    darkCard: "#003a46",
    darkBorder: "#0a6070",
};

const VALUES = [
    { num: "1", icon: <Cpu size={24} />, title: "Technical Excellence", desc: "We uphold the highest engineering and installation standards to ensure reliability, safety, and long-term system performance." },
    { num: "2", icon: "", title: "Integrity", desc: "We operate with transparency, accountability, and ethical business practices in every project and client engagement." },
    { num: "3", icon: "", title: "Innovation", desc: "We embrace emerging technologies in renewable energy, surveillance, and smart infrastructure to deliver future-ready solutions." },
    { num: "4", icon: "", title: "Reliability", desc: "We honor timelines, commitments, and service quality, ensuring clients can depend on our systems and support." },
    { num: "5", icon: "", title: "Customer-Centric", desc: "We tailor every solution to the specific needs of homeowners, developers, and institutions, prioritising functionality and value." },
    { num: "6", icon: "", title: "Sustainability", desc: "We promote environmentally responsible energy solutions that reduce carbon footprint and enhance long-term efficiency." },
];

const AboutPage = () => {
    const [isDark, setIsDark] = useState()

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

    function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
        const { ref, visible } = useScrollReveal();
        return (
            <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
                {children}
            </div>
        );
    }

    function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'IBM Plex Mono',monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: dark ? COLORS.teal : COLORS.deep, marginBottom: "16px" }}>
                {children}
            </div>
        );
    }

    const bg = isDark ? COLORS.darkBg : COLORS.white;
    const surface = isDark ? COLORS.darkSurface : "#f4fffe";
    const card = isDark ? COLORS.darkCard : "#ffffff";
    const border = isDark ? COLORS.darkBorder : "#cdeee9";
    const text = isDark ? "#e8f8f6" : "#0a2e35";
    const textMid = isDark ? "#9dd4cc" : "#2a6070";
    const textLight = isDark ? "#6aacaa" : "#4a8a90";

    return (
        <div className="relative mb-10 bg-white dark:bg-[var(--teal-dark-dark)]/20">
            <div className='lg:max-w-6xl lg:m-auto p-2'>
    <section className='w-full flex justify-center items-center py-20 mb-10'>
        <div className='max-w-7xl mx-auto px-6'>
            <div className='grid lg:grid-cols-2 gap-10 items-center'>
                <div className='lg:pr-10'>
                    <h1 className='text-[var(--teal-dark-dark)] mb-5 font-semibold dark:text-white text-2xl'>
                        About Evoque Spaces
                    </h1>
                    <h2 className="serif font-semibold text-5xl mb-6 text-[var(--teal-dark-dark)] dark:text-white leading-tight">
                        Engineering Secure & <em className='text-[var(--teal-light)]'>Sustainable Spaces</em>
                    </h2>
                    <p className='text-[var(--teal-dark-dark)] dark:text-white text-md leading-relaxed'>
                        <strong className='text-[var(--teal-light)] dark:text-white'>Evoque Spaces Limited</strong>, is a leading provider of integrated solar energy, security, and smart infrastructure solutions for residential and commercial developments.
                        We design and install reliable solar power systems, advanced CCTV and perimeter security solutions, and intelligent low-voltage networks that enhance safety, efficiency, and property value.
                    </p>
                    <p className='text-[var(--teal-dark-dark)] dark:text-white text-md mt-5 leading-relaxed'>
                        At Evoque Spaces Limited, we don’t just install systems — we build secure, energy-efficient, and future-ready spaces.
                    </p>
                </div>

                <div className='flex justify-center lg:justify-end'>
                    <div className='space-y-6 w-full max-w-md'>
                        {[
                            ["Our Vision", "To be a leading provider of integrated renewable energy, security, and smart infrastructure solutions in Kenya and across Africa, transforming spaces into secure, sustainable, and intelligent environments."],
                            ["Our Mission", "To design, deliver, and maintain high-performance solar, security, and electrical systems that enhance safety, energy independence, and operational efficiency."]
                        ].map(([tag, desc]) => (
                            <div key={tag} className='rounded-xl shadow-sm p-6 bg-slate-50 dark:bg-[var(--teal-dark-light)] border border-slate-100 dark:border-white/10'>
                                <div className="text-[var(--teal-light)] dark:text-white font-extrabold text-xl mb-3">{tag}</div>
                                <p className='text-gray-600 dark:text-teal-50/80 text-sm leading-relaxed'>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Values Section */}
    <section className="relative left-0 right-0 mb-20 px-6 ">
        <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-[#005461] dark:text-white">Our Core Values</h2>
            <div className="w-20 h-1.5 bg-[var(--teal-light)] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
                <ValueCard
                    key={i}
                    title={v.title}
                    desc={v.desc}
                />
            ))}
        </div>
    </section>
    <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-[#0C7779] rounded-[2rem] p-10 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-24 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-xl text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Join Our Community
                </h2>
                <p className="text-teal-50 text-lg mb-10 leading-relaxed">
                    Stay up to date with tech, innovations, solutions, and energy trends. 
                </p>

                <form className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <input 
                        type="email" 
                        required
                        placeholder="Enter your email" 
                        className="flex-1 bg-transparent px-6 py-4 text-white placeholder:text-teal-100 outline-none w-full" 
                    />
                    <button className="bg-[var(--teal-dark-dark)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--teal-dark-light)] transition-all active:scale-95 whitespace-nowrap">
                        Subscribe Now
                    </button>
                </form>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="flex -space-x-4 md:-space-x-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-[#0C7779] bg-slate-200 overflow-hidden shadow-xl">
                            <img src={`https://i.pravatar.cc/150?u=${i + 60}`} alt="Member" className="w-full h-full object-cover" />
                        </div>
                    ))}
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-[#0C7779] bg-teal-800 flex items-center justify-center text-white font-bold">+500</div>
                </div>
            </div>
        </div>
    </section>
    </div>
</div>
    
    );
};

// Sub-component for Value Cards
const ValueCard = ({ icon, title, desc }: { icon?: any, title: string, desc: string }) => (
    <div className="p-10 rounded-3xl border border-slate-100 shadow-xl bg-[var(--teal-dark-dark)] border-[var(--teal-dark-dark)]/30 transition-all group">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-white leading-relaxed">{desc}</p>
    </div>
);

export default AboutPage;