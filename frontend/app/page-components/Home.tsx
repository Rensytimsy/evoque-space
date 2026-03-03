"use client"
import React, { useState, useEffect } from "react"

import { Search, Home, Hammer, ShoppingCart, Paintbrush, ArrowRight, Menu, MapPin, CheckCircle, Phone, Star, House } from 'lucide-react';

const testimonials = [
    {
        name: "Timothy",
        message: "with evoque space, your feature dream house will come true",
        date: Date.now(),
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KZzfY42l0J1xR6WFbnzH_Sc3pJIvXCJMaA&s"
    },
    {
        name: "Sarah Jenkins",
        message: "The attention to detail is unmatched. They didn't just build a house; they created a sanctuary for my family.",
        date: Date.now(),
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KZzfY42l0J1xR6WFbnzH_Sc3pJIvXCJMaA&s"
    },
    {
        name: "Marcus Chen",
        message: "Evoque Space turned my vague sketches into a modern architectural masterpiece. Truly a seamless experience.",
        date: Date.now(),
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KZzfY42l0J1xR6WFbnzH_Sc3pJIvXCJMaA&s"
    },
    // {
    //     name: "Elena Rodriguez",
    //     message: "I never thought the renovation process could be this stress-free. Professional, creative, and highly recommended!",
    //     date: Date.now(),
    //     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KZzfY42l0J1xR6WFbnzH_Sc3pJIvXCJMaA&s"
    // },
    // {
    //     name: "David V.",
    //     message: "Elegance meets functionality. They maximized every square inch of my property while maintaining a stunning aesthetic.",
    //     date: Date.now(),
    //     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KZzfY42l0J1xR6WFbnzH_Sc3pJIvXCJMaA&s"
    // },
    // {
    //     name: "Amara Okafor",
    //     message: "From the first consultation to the final walkthrough, Evoque Space exceeded every expectation I had.",
    //     date: Date.now(),
    //     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KZzfY42l0J1xR6WFbnzH_Sc3pJIvXCJMaA&s"
    // }
]

export default function HomePage() {
    const [activeTab, setActiveTab] = useState('buy');
    return (
        <div className="min-h-screen lg:max-h-[90vh] bg-[#F4F9F9]">
            <div
                className="absolute inset-0 w-full h-screen bg-[var(--teal-dark-dark)] bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply opacity-90"
                aria-hidden="true"
            />
            <header className="h-auto relative pt-16 pb-32 overflow-hidden mt-23">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="z-10">
                        <span className="inline-block rounded-full bg-[var(--teal-dark-dark)] p-2 text-white font-bold text-sm mb-6">
                            Evoque Spaces Limited
                        </span>
                        <h1 className="text-6xl font-extrabold text-white leading-[1.1] mb-6">
                            Building Dreams <br />
                            <span className="text-[var(--teal-light)]">
                                Creating Spaces
                            </span>
                        </h1>
                        <p className="text-lg text-white mb-10 max-w-lg font-semibold mt-5">
                            Transform your vision into reality with Evoque Spaces. We specialize in designing, building, and renovating exceptional properties across Kenya.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            <button className="bg-[#249E94] hover:bg-[#1d827a] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#249E94]/20">
                                Enquire Now
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold transition-all">
                                View Projects
                            </button>
                        </div>

                        {/* Search/Filter UI */}
                        <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 max-w-xl">
                            <div className="flex gap-2 p-2 border-b border-slate-100 mb-2">
                                {['Buy', 'Rent', 'Renovate', 'Shop'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase())}
                                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab.toLowerCase() ? 'bg-[#249E94] text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 p-2">
                                <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
                                    <MapPin className="text-[#249E94]" size={20} />
                                    <input type="text" placeholder="Location or Product..." className="bg-transparent outline-none w-full text-sm" />
                                </div>
                                <button className="bg-[#005461] text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0C7779]">
                                    <Search size={18} /> Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative mb-10">
                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#3BC1A8]/20 rounded-full blur-3xl"></div>
                        <img
                            src="/homes/homeOne.jpeg"
                            alt="Modern House"
                            className="rounded-[2.5rem] border-8 border-white relative z-10 max-h-[650px]"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl z-20 flex items-center gap-5 border border-slate-100 min-w-[280px] transform transition-transform duration-300">
                            {/* Icon Container with soft pulse effect */}
                            <div className="relative">
                                <div className="w-14 h-14 bg-[#3BC1A8] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#3BC1A8]/30">
                                    <House size={28} />
                                </div>
                                <span className="absolute top-0 right-0 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3BC1A8] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3BC1A8]"></span>
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mb-1">
                                    New Listing
                                </p>

                                <div className="mb-2">
                                    <p className="text-[#005461] font-extrabold text-lg leading-tight">4 Bedrooms</p>
                                    <p className="text-slate-600 font-medium text-sm">
                                        KES <span className="text-[#005461] font-bold">22 Million</span>
                                    </p>
                                </div>

                                <button className="group flex items-center gap-1 text-[var(--teal-light)] underline font-bold hover:cursor-pointer text-xs font-bold uppercase tracking-wider hover:text-[#005461] transition-colors">
                                    Check it out
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}