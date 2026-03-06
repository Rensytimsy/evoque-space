"use client"
import { useState, useEffect, useRef } from "react";
import { MapPinned, Phone, Mail,  Timer, MapPinPen } from "lucide-react";

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

export default function ContactPage() {

    const [isDark, setIsDark] = useState()
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", property: "", service: "", location: "", details: "" });

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

    // ── Sub-components ───────────────────────────────────────
    function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
        const { ref, visible } = useScrollReveal();
        return (
            <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
                {children}
            </div>
        );
    }


    return (

        <section id="contact" className="relative py-24 px-6 lg:px-12 bg-slate-50 dark:bg-[#0a1a1a] overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--teal-light)] to-transparent opacity-30" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Content & Info */}
                    <Reveal>
                        <div className="space-y-8">
                            <div>
                                <h1 className="font-bold text-[var(--teal-dark-dark)] dark:text-[var(--teal-light)] text-sm tracking-tight uppercase mb-4">
                                    Let's hear from you
                                </h1>
                                <h2 className="font-bold text-4xl md:text-5xl text-slate-900 dark:text-white leading-tight tracking-tight">
                                    Let's Build Your<br />
                                    <p className="text-[var(--teal-dark-light)]">Future-Ready</p> Space
                                </h2>
                                <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                                    Tell us about your project and one of our engineers will respond within 24 hours with a tailored solution proposal.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    [<MapPinned size={23}/>, "Location", "Nairobi, Kenya"],
                                    [<Phone size={23} />, "Phone", "+254 727 494 414"],
                                    [<Mail size={23}/>, "Email", "info@evoquespaces.com"],
                                    [<Timer size={23} />, "Office Hours", "Mon – Fri, 8am – 6pm EAT"]
                                ].map(([icon, label, val]) => (
                                    <div key={0} className="flex items-center gap-5 group">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--teal-light)] text-white dark:bg-white/5 shadow-sm border border-slate-200 dark:border-white/10 group-hover:border-[var(--teal-light)] transition-colors text-xl">
                                            {icon}
                                        </div>
                                        <div>
                                            <div className="font-mono text-sm tracking-widest uppercase text-[var(--teal-dark-dark)] dark:text-slate-500 mb-1">
                                                {label}
                                            </div>
                                            <div className="text-slate-800 dark:text-slate-200 font-medium">
                                                {val}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Right Column: The Form */}
                    <Reveal delay={120}>
                        <div className="bg-white dark:bg-white/5 p-8 lg:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10">
                            <div className="space-y-5">
                                {/* Row 1 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {[
                                        { label: "Full Name", type: "text", ph: "John Kamau", key: "name" },
                                        { label: "Phone", type: "tel", ph: "+254 700 000 000", key: "phone" }
                                    ].map((field) => (
                                        <div key={field.key} className="flex flex-col gap-2">
                                            <label className="font-mono text-[9px] tracking-widest uppercase text-slate-500 ml-1">{field.label}</label>
                                            <input
                                                type={field.type}
                                                placeholder={field.ph}
                                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[var(--teal-light)] focus:ring-1 focus:ring-[var(--teal-light)] outline-none transition-all dark:text-white"
                                                value={(formData as any)[field.key]}
                                                onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-[9px] tracking-widest uppercase text-slate-500 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[var(--teal-light)] focus:ring-1 focus:ring-[var(--teal-light)] outline-none transition-all dark:text-white"
                                        value={formData.email}
                                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                    />
                                </div>

                                {/* Selects */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {[
                                        { label: "Property Type", key: "property", opts: ["Residential Home", "Commercial Building", "Industrial Facility", "Real Estate Development"] },
                                        { label: "Service Needed", key: "service", opts: ["Solar Energy System", "CCTV & Security", "Low-Voltage Networks", "Complete Package"] }
                                    ].map((field) => (
                                        <div key={field.key} className="flex flex-col gap-2">
                                            <label className="font-mono text-[9px] tracking-widest uppercase text-slate-500 ml-1">{field.label}</label>
                                            <select
                                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[var(--teal-light)] outline-none transition-all dark:text-white appearance-none"
                                                value={(formData as any)[field.key]}
                                                onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                                            >
                                                <option value="" className="dark:bg-slate-900">Select...</option>
                                                {field.opts.map(o => <option key={o} value={o} className="dark:bg-slate-900">{o}</option>)}
                                            </select>
                                        </div>
                                    ))}
                                </div>

                                {/* Location */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-[9px] tracking-widest uppercase text-slate-500 ml-1">Project Location</label>
                                    <input
                                        type="text"
                                        placeholder="City / County"
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[var(--teal-light)] outline-none transition-all dark:text-white"
                                        value={formData.location}
                                        onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-[9px] tracking-widest uppercase text-slate-500 ml-1">Project Details</label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[var(--teal-light)] outline-none transition-all dark:text-white resize-none"
                                        placeholder="Tell us about your requirements..."
                                        rows={4}
                                        value={formData.details}
                                        onChange={e => setFormData(p => ({ ...p, details: e.target.value }))}
                                    />
                                </div>

                                <button className="w-full group mt-4 flex items-center justify-center gap-3 bg-[var(--teal-dark-light)] hover:bg-[var(--teal-dark-dark)] dark:bg-[var(--teal-light)] text-white dark:text-[var(--teal-dark-dark)] py-4 rounded-xl font-bold tracking-widest uppercase text-xs transition-all dark:hover:bg-white hover:shadow-lg active:scale-[0.98]">
                                    Send Enquiry
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
