"use client"
import { Building2, Hammer, Home, PenTool, Ruler, Users } from "lucide-react";


export default function Services() {
    const services = [
        {
            icon: PenTool,
            title: "Architectural Design",
            description: "Custom architectural designs that blend functionality with stunning aesthetics. We create spaces that inspire and endure.",
        },
        {
            icon: Building2,
            title: "Commercial Construction",
            description: "High-rise buildings, office complexes, and commercial spaces built to the highest standards of quality and safety.",
        },
        {
            icon: Home,
            title: "Residential Building",
            description: "From modern villas to family homes, we bring your dream residence to life with precision craftsmanship.",
        },
        {
            icon: Hammer,
            title: "Renovation & Remodeling",
            description: "Transform existing spaces with our expert renovation services. We breathe new life into properties.",
        },
        {
            icon: Ruler,
            title: "Project Management",
            description: "End-to-end project management ensuring timely delivery, cost efficiency, and uncompromising quality.",
        },
        {
            icon: Users,
            title: "Consultation Services",
            description: "Expert advice on construction feasibility, budgeting, and design optimization for your projects.",
        },
    ];
    return (
        <div>
            <section id="services" className="py-24 bg-white mt-24">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-black font-medium tracking-wider uppercase text-sm">What We Do</span>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
                            Our Services
                        </h2>
                        <p className="text-lg text-black">
                            Comprehensive construction and design services tailored to your unique vision and requirements.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className="group bg-[var(--teal-dark-dark)] rounded-md p-8 text-white hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                                    <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                                </div>
                                <h3 className="font-display text-xl text-white font-semibold text-foreground mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-white  leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}