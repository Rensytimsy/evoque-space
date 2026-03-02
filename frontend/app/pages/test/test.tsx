"use client"

import React, { useState } from 'react';
import { Search, Home, Hammer, ShoppingCart, Paintbrush, ArrowRight, Menu, MapPin } from 'lucide-react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- NAVIGATION --- */}
      {/* <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#005461] rounded-xl flex items-center justify-center">
              <Home className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#005461]">Aura<span className="text-[#3BC1A8]">Build</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-[#0C7779]">
            <a href="#" className="hover:text-[#3BC1A8] transition-colors">Properties</a>
            <a href="#" className="hover:text-[#3BC1A8] transition-colors">Services</a>
            <a href="#" className="hover:text-[#3BC1A8] transition-colors">Shop</a>
            <a href="#" className="hover:text-[#3BC1A8] transition-colors">Portfolio</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-[#005461]"><ShoppingCart size={22} /></button>
            <button className="bg-[#005461] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0C7779] transition-all shadow-lg shadow-[#005461]/20">
              Get Started
            </button>
          </div>
        </div>
      </nav> */}

      {/* --- HERO SECTION --- */}
      <header className="relative pt-16 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-[#3BC1A8]/10 text-[#0C7779] font-bold text-sm mb-6">
              DESIGN • BUILD • FURNISH
            </span>
            <h1 className="text-6xl font-extrabold text-[#005461] leading-[1.1] mb-6">
              Your Entire Home <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0C7779] to-[#3BC1A8]">
                In One Ecosystem.
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg">
              From finding the perfect plot to custom renovations and curated furniture. We don't just list houses; we build lifetimes.
            </p>

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

          <div className="relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#3BC1A8]/20 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" 
              alt="Modern House" 
              className="rounded-[2.5rem] shadow-2xl border-8 border-white relative z-10"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-slate-100">
              <div className="w-12 h-12 bg-[#3BC1A8] rounded-full flex items-center justify-center text-white">
                <Paintbrush size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">New Service</p>
                <p className="text-[#005461] font-bold">AI Interior Design</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#005461] mb-4">Our Expertise</h2>
            <div className="w-20 h-1.5 bg-[#3BC1A8] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Home size={32}/>} 
              title="Real Estate" 
              desc="Verified luxury listings and plot acquisitions with transparent legal processing."
              color="#005461"
            />
            <ServiceCard 
              icon={<Hammer size={32}/>} 
              title="Build & Reno" 
              desc="Expert architectural design and construction management for new builds or upgrades."
              color="#0C7779"
            />
            <ServiceCard 
              icon={<ShoppingCart size={32}/>} 
              title="Housing Products" 
              desc="Direct access to premium materials, smart home tech, and designer furniture."
              color="#249E94"
            />
          </div>
        </div>
      </section>

      {/* --- FEATURED PROPERTIES / PRODUCTS MIX --- */}
      <section className="py-24 bg-[#005461]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Collection</h2>
              <p className="text-[#3BC1A8]">Curated properties and exclusive home products.</p>
            </div>
            <button className="text-white flex items-center gap-2 hover:gap-4 transition-all border-b border-[#249E94] pb-1">
              View All <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <ItemCard 
              type="PROPERTY"
              img="https://images.unsplash.com/photo-1600607687940-4e524cb35797?auto=format&fit=crop&q=80&w=500"
              title="Emerald Villa"
              price="$1,200,000"
              tag="Luxury"
            />
            <ItemCard 
              type="PRODUCT"
              img="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=500"
              title="Nordic Velvet Sofa"
              price="$2,450"
              tag="Best Seller"
            />
            <ItemCard 
              type="PROPERTY"
              img="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=500"
              title="Urban Loft"
              price="$450,000"
              tag="Modern"
            />
             <ItemCard 
              type="PRODUCT"
              img="https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&q=80&w=500"
              title="Smart Lighting Kit"
              price="$899"
              tag="New Arrival"
            />
          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <footer className="bg-[var(--teal-dark-dark)] py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500">© 2026 AuraBuild Systems. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-[#005461] hover:text-[#3BC1A8]">Instagram</a>
            <a href="#" className="text-[#005461] hover:text-[#3BC1A8]">LinkedIn</a>
            <a href="#" className="text-[#005461] hover:text-[#3BC1A8]">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ServiceCard = ({ icon, title, desc, color }) => (
  <div className="group p-10 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-slate-100">
    <div className={`mb-6 text-white w-16 h-16 rounded-2xl flex items-center justify-center`} style={{ backgroundColor: color }}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-[#005461] mb-4">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const ItemCard = ({ type, img, title, price, tag }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all">
    <div className="relative h-64">
      <img src={img} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0C7779]">
        {type}
      </div>
      <div className="absolute top-4 right-4 bg-[#3BC1A8] text-white px-3 py-1 rounded-full text-[10px] font-bold">
        {tag}
      </div>
    </div>
    <div className="p-5">
      <h4 className="font-bold text-[#005461] text-lg mb-1">{title}</h4>
      <p className="text-[#249E94] font-bold">{price}</p>
    </div>
  </div>
);

export default LandingPage;