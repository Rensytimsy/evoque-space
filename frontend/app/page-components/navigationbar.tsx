'use client'

import React, { useState, useEffect } from 'react';
import { Home, Menu, X, ShoppingCart, ChevronDown, Search, Hammer, Building2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
      if (typeof window !== 'undefined') {
        window.onscroll = () => {
          setIsScrolled(window.scrollY > 20);
        };
      }
  }, [])

  const navLinks = [
    { name: 'Home', href: '/', icon: <Building2 size={25} /> },
    { name: 'Properties', href: '/pages/properties', icon: <Building2 size={25} /> },
    { name: 'Services', href: '/pages/services', icon: <Hammer size={25} /> },
    { name: 'About', href: '/pages/about', icon: <Hammer size={25} /> },
    { name: 'Shop', href: '/pages/shop', icon: <ShoppingCart size={25} /> },
    { name: 'Portfolio', href: '#portfolio', icon: <Home size={25} /> },
  ];

  console.log(isScrolled)

  const path = usePathname()
  console.log(path)

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white backdrop-blur-md shadow-md py-3' : path != "/" ? 'bg-[var(--teal-dark-light)] py-5' : 'bg-transparent backdrop-blur-md py-5'}
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-15 h-15 rounded-lg flex items-center justify-center group-hover:bg-[#3BC1A8] transition-colors">
            <img src="/esl-logo.png" alt="evoque space logo" className='h-12'/>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <div className={`hidden md:flex items-center gap-10 bg-[var(--teal-dark-dark)]/50 p-4 pr-6 pl-6 rounded-full`}>
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`flex items-center gap-1.5 font-semibold flex-col ${isScrolled ? "text-[var(--teal-dark-dark)]" : "text-white"} ${path === link.href && "text-[var(--teal-dark-dark)]"} hover:text-white transition-colors`}
            >
              {link.name}
              {path === link.href && <div className={`${isScrolled ? "w-full rounded-full h-[3px] -mt-1 bg-[var(--teal-dark-dark)]" : "w-full rounded-full h-[3px] -mt-1 bg-[var(--teal-light)]"}`}>

              </div>}
            </a>
            
          ))}
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-5">
          <button className={`p-2 ${isScrolled ? "text-[var(--teal-dark-light)]" : "text-white"} hover:bg-slate-100 rounded-full transition-all`}>
            <Search size={20} />
          </button>
          <div className={`relative p-2 ${isScrolled ? "text-[var(--site-light)]" : "text-white"} hover:bg-[var(--teal-light)] rounded-full cursor-pointer`}>
            <ShoppingCart size={20} />
            <span className="absolute top-1 right-1 bg-[var(--teal-dark-dark)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{0}</span>
          </div>
          <button className="bg-[#005461] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#0C7779] hover:shadow-lg hover:shadow-[#005461]/20 transition-all">
            Sign In
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className={`md:hidden p-2 ${isScrolled ? "text-[var(--teal-dark-dark)]" : "text-white"} text-xl`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <div className={`fixed h-full inset-0 top-[72px] mt-3 ${isScrolled ? "bg-white min-h-screen" : "bg-white z-0 min-h-screen"} z-50 transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col p-6 gap-6 ">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 text-xl font-bold ${isScrolled ? "text-[var(--teal-dark-dark)] " : "text-[var(--teal-dark-dark)]"} border-b border-slate-100 pb-4`}
            >
              <span className={`${isScrolled ? "text-[var(--teal-dark-dark)]" : "text-[var(--teal-dark-dark)]"}`}>{link.icon}</span>
              {link.name}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-4">
            <button className="w-full bg-slate-100 text-[#005461] py-4 rounded-2xl font-bold">
              My Cart (3 Items)
            </button>
            <button className="w-full bg-[#005461] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#005461]/20">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;