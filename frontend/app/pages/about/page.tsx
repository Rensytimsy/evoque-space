import React, { ReactNode } from 'react';
import { Shield, Target, Leaf, Users, Award, Building } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* --- HERO SECTION --- */}
            <section className="relative py-24 bg-[var(--teal-dark-light)] overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2060')] bg-cover bg-center mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className='mt-4 mb-6'>

                    </div>
                    <p className='text-white font-semibold text-lg'>About Us</p>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-200 mb-8 mt-6">
                        Evoque Space Building Excellence
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
                        <div className="lg:w-1/3 mt-8">
                            <h2 className="text-white font-bold uppercase tracking-[0.2em] text-sm mb-4">
                                Since 2014
                            </h2>
                            <p className="text-4xl font-extrabold text-white leading-tight">
                                Decades of <br />
                                <span className="text-white">Craftsmanship</span> <br />
                                in every brick.
                            </p>
                        </div>

                        <div className="lg:w-2/3 space-y-8 mt-4">
                            <div className="relative">

                                <div className="absolute -left-6 top-0 bottom-0 w-[2px] h-[18em] bg-[var(--teal-light)] hidden md:block" />

                                <p className="text-white text-xl leading-relaxed font-medium italic text-left">
                                    "Evoque Spaces Limited is a premier construction firm in Kenya, dedicated to translating
                                    <span className="text-white font-semibold not-italic"> ambitious architectural visions </span>
                                    into tangible landmarks."
                                </p>
                            </div>

                            <div className="grid md:grid-cols-1 gap-8 text-white text-base leading-relaxed">
                                <p className='text-left'>
                                    With a decade of mastery in the field, we lead the industry across residential, commercial,
                                    and transformative renovation sectors. Our collective of seasoned architects and engineers
                                    unite to deliver projects that redefine expectations.
                                </p>
                                <p className='text-left'>
                                    At our core, we don’t just engineer structures; we cultivate enduring partnerships.
                                    We focus on building the spaces where your future happens and the
                                    <span className="text-white font-medium"> relationships that make them possible.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- THE MISSION SECTION --- */}
            <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                {/* --- LEFT SIDE: THE BRANDED VISUAL --- */}
                <div className="relative group">
                    {/* Abstract Background Decoration */}
                    <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#3BC1A8]/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#005461]/10 rounded-full blur-3xl" />

                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-[var(--teal-light)] to-[var(--teal-light-light)] rounded-[2.5rem] relative overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                            {/* Subtle Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

                            {/* The Frame Overlay */}
                            <div className="absolute inset-6 border border-[var(--teal-light)] rounded-[1.8rem]" />

                            {/* Central Logo Mark */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <div className="relative">
                                    <span className="absolute -inset-4 bg-[#3BC1A8]/20 blur-xl rounded-full" />
                                    <p className="relative font-display text-8xl md:text-9xl font-black text-[#3BC1A8] tracking-tighter">
                                        ESL
                                    </p>
                                </div>
                                <div className="mt-4 flex flex-col items-center">
                                    <div className="w-12 h-1 bg-[#249E94] mb-3" />
                                    <p className="text-black tracking-[0.4em] text-xs font-bold uppercase">
                                        Evoque Spaces
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Trust Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#3BC1A8] rounded-full flex items-center justify-center text-white">
                                <Award size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: CONTENT & STATS --- */}
                <div className="flex flex-col gap-10">
                    <div className="space-y-6">
                        <h2 className="text-5xl font-extrabold text-[#005461] leading-[1.1]">
                            Driven by Precision, <br />
                            <span className="text-[#249E94]">Inspired by People.</span>
                        </h2>

                        <div className="space-y-4">
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Since our inception, <span className="text-[#005461] font-semibold">Evoque Spaces</span> has been committed to raising the standard of housing in East Africa. We realized that a home isn't just a structure; it's an ecosystem.
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                By integrating professional renovation and bespoke interior design, we provide a seamless journey for homeowners and investors alike.
                            </p>
                        </div>
                    </div>

                    {/* Certifications Chips */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-[#3BC1A8]/20 flex items-center justify-center text-[#0C7779]">
                                <Award size={18} />
                            </div>
                            <span className="font-bold text-[#005461] text-sm">ISO 9001:2015</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-[#3BC1A8]/20 flex items-center justify-center text-[#0C7779]">
                                <Building size={18} />
                            </div>
                            <span className="font-bold text-[#005461] text-sm">NCA Class 1</span>
                        </div>
                    </div>

                    {/* Stats Grid - Now properly aligned at the bottom */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        {[
                            { value: '500+', label: 'Projects' },
                            { value: '12+', label: 'Years' },
                            { value: '98%', label: 'Happy' },
                            { value: '47', label: 'Counties' },
                        ].map(({ value, label }) => (
                            <div key={label} className="p-4 bg-[var(--teal-dark-dark)] rounded-2xl group  transition-colors duration-300">
                                <p className="text-2xl font-black text-white">{value}</p>
                                <p className="text-sm text-white font-bold uppercase tracking-widest">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CORE VALUES --- */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#005461]">Our Core Values</h2>
                    <div className="w-20 h-1.5 bg-[var(--teal-light)] mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                    <ValueCard
                        icon={<Shield />}
                        title="Integrity First"
                        desc="We believe in transparent pricing and honest timelines. No hidden costs, ever."
                    />
                    <ValueCard
                        icon={<Target />}
                        title="Unmatched Precision"
                        desc="From the foundation to the final coat of paint, our detail-oriented approach ensures perfection."
                    />
                    <ValueCard
                        icon={<Leaf />}
                        title="Sustainability"
                        desc="We prioritize eco-friendly materials and energy-efficient building techniques for a greener Kenya."
                    />
                </div>
            </section>

            {/* --- TEAM TEASER --- */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="bg-[#0C7779] rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-4xl font-bold text-white mb-6">Meet the Visionaries</h2>
                        <p className="text-white/80 text-lg mb-8">
                            Our team consists of seasoned architects, master builders, and creative interior designers with over a decade of collective experience in the Kenyan market.
                        </p>
                        <button className="bg-white text-[#005461] px-10 py-4 rounded-xl font-bold hover:bg-[#3BC1A8] hover:text-white transition-all shadow-xl shadow-black/20">
                            Hear From The Team
                        </button>
                    </div>
                    <div className="relative z-10 flex -space-x-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-[#0C7779] bg-slate-200 overflow-hidden shadow-2xl">
                                <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Team Member" />
                            </div>
                        ))}
                    </div>
                    {/* Decorative background shape */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3BC1A8] opacity-10 skew-x-12 translate-x-20"></div>
                </div>
            </section>
        </div>
    );
};

// Sub-component for Value Cards
const ValueCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl border-[var(--teal-dark-dark)]/30 transition-all group">
        <div className="w-14 h-14 bg-[var(--teal-dark-light)] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <h3 className="text-2xl font-bold text-[#005461] mb-4">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
);

export default AboutPage;