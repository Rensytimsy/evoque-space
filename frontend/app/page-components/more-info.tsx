"use client"
import { Award, Zap, ShieldCheck, Maximize, HeadphonesIcon } from 'lucide-react';


const WHY_CHOOSE_US = [
    {
        icon: <Award className="text-white" size={24} />,
        title: "Certified Technical Team",
        desc: "Licensed engineers with specialized training in smart infrastructure."
    },
    {
        icon: <Zap className="text-white" size={24} />,
        title: "End-to-End Execution",
        desc: "From initial survey to final testing, we handle the entire project lifecycle."
    },
    {
        icon: <ShieldCheck className="text-white" size={24} />,
        title: "Premium Trusted Brands",
        desc: "We exclusively use Tier-1 components and industry-leading hardware."
    },
    {
        icon: <Maximize className="text-white" size={24} />,
        title: "Scalable Solutions",
        desc: "Modular designs that grow alongside your property or business needs."
    },
    {
        icon: <HeadphonesIcon className="text-white" size={24} />,
        title: "After-Sales Support",
        desc: "Dedicated technical maintenance and 24/7 emergency response lines."
    }
];

export default function MoreInfo() {
    return (
        <section className="py-24 bg-[var(--teal-dark-light)] dark:bg-[#0a1a1a]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
                    <div className="max-w-2xl">

                        <h3 className="text-4xl md:text-5xl  text-white dark:text-white leading-tight">
                            Why leading developers <br />
                            <span className="text-[var(--teal-dark-dark)]">trust our expertise</span>
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10">
                    {WHY_CHOOSE_US.map((item, index) => (
                        <div key={index} className="flex gap-5 group">
                            {/* Icon Container */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[var(--teal-dark-dark)] dark:bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:text-white">
                                {item.icon}
                            </div>

                            {/* Text Content */}
                            <div>
                                <h4 className="text-lg  text-white font-semibold dark:text-white mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-white dark:text-slate-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}