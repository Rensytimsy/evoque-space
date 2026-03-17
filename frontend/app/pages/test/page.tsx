"use client"

import React from 'react';
import { ShoppingCart, ArrowRight, ChevronLeft, ChevronRight, Zap, Shield, Cpu } from 'lucide-react';
import Link from 'next/link';

const SolarHero = () => {
  // Assuming these are passed or defined nearby
  const [current, setCurrent] = React.useState(0);
  const nextSlide = () => setCurrent((prev) => (prev === INFRA_SERVICES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? INFRA_SERVICES.length - 1 : prev - 1));

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-[#061a1a]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--teal-light)]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--teal-dark-light)]/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="relative w-full pt-20 pb-12 z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--teal-dark-light)]/10 border border-[var(--teal-dark-light)]/20 text-[var(--teal-dark-light)] dark:text-[var(--teal-light)] text-sm font-semibold mb-6">
              <Zap size={16} />
              <span>Future-Ready Energy Solutions</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-8">
              High-Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--teal-dark-light)] to-emerald-500">
                Sustainable Power
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed mb-10">
              Evoque Spaces Limited delivers integrated solar energy, smart security, and elite infrastructure for the modern world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pages/shop">
                <button className="bg-[var(--teal-dark-dark)] dark:bg-[var(--teal-light)] dark:text-black text-white px-10 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-[var(--teal-dark-light)]/20 flex items-center justify-center gap-3 group">
                  Explore Shop
                  <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="px-10 py-4 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                View Solutions
              </button>
            </div>
            
            {/* Quick Stats/Trust Marks */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex gap-8">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">99%</p>
                <p className="text-sm text-slate-500">Uptime</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">24/7</p>
                <p className="text-sm text-slate-500">Monitoring</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Slider */}
          <div className="relative group">
            {/* Soft Glow Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--teal-dark-light)]/20 to-transparent rounded-[2rem] blur-2xl transform rotate-3" />
            
            <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-[4/5] lg:aspect-[3/4]">
              {INFRA_SERVICES.map((service, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === current ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-105 pointer-events-none"
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8">
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl text-white">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-white/80 text-sm mb-6 line-clamp-2">{service.desc}</p>
                      
                      <Link href="https://wa.me/254727576955" target="_blank" className="inline-block">
                        <button className="flex items-center gap-2 bg-[var(--teal-light)] text-black px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white transition-colors group/btn">
                          Get Quotation
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Refined Navigation */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevSlide} className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-[var(--teal-light)] hover:text-black transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-[var(--teal-light)] hover:text-black transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Modern Pagination */}
              <div className="absolute top-6 right-6 flex gap-1.5 z-20">
                {INFRA_SERVICES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-[var(--teal-light)]" : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};