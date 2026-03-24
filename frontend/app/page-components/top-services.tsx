"use client"
import { useState, useEffect } from "react"
import { useServices } from "@/hooks/datafetch"
import Link from "next/link"

interface Service {
    title: string,
    description: string,
    price: number | undefined,
    subtitle: string,
    info: string,
    category: string,
    id: string
}


export const TopServices = () => {
    const { data, isLoading, error } = useServices()
    const [open, setOpen] = useState<boolean>(false)
    const [selectedService, setSelectedService] = useState<Service | null>({
        id: "",
        title: "",
        description: "",
        category: "",
        info: "",
        subtitle: "",
        price: undefined
    });
    const [showNumber, setShowNumber] = useState(false)
    console.log(selectedService)

    return (
        <div className="p-6 dark:bg-[var(--teal-dark-dark)]/20 dark:border-b-2 bg-white dark:border-b-[var(--teal-light)]">
<div className="flex flex-col items-center justify-center w-full py-10">

    <h1 className="text-3xl font-extrabold mb-10 text-center dark:text-white text-[var(--teal-dark-dark)]">Top Services</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 ">
        {data?.slice(0, 3).map((s: Service) => (
            <div
                key={s.id}
                onClick={() => { setSelectedService(s); setOpen(true); }}
                className="relative p-6 rounded-md border border-gray-300 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 bg-white dark:bg-[var(--teal-dark-light)] flex flex-col"
            >
                <h3 className="font-extrabold text-2xl mb-2 text-slate-800 dark:text-white">{s.title}</h3>
                <p className="text-teal-600 font-semibold text-md mb-3 dark:text-[var(--teal-dark-dark)]">{s.subtitle}</p>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-16">
                    {s.description}
                </p>

                <button className="absolute bottom-4 left-6 right-6 text-sm bg-[var(--teal-dark-dark)] hover:bg-[var(--teal-dark-light)] text-white font-semibold py-2 rounded-md">
                    View Solution →
                </button>
            </div>
        ))}
    </div>
</div>

            {open && selectedService && (
                <div 
                    onClick={() => setSelectedService(null)}
                    className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
                >
                    <div
                        onClick={(e) => e.stopPropagation()} 
                        className="relative h-[90vh] w-full max-w-md m-4 mt-10 bg-white rounded-md shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
                    >
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedService.title}</h2>
                                    <p className="text-sm text-gray-500 mt-1">{selectedService.subtitle}</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedService(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto">
                            <p className="text-md text-black mb-4">{selectedService.description}</p>
                            
                            <ol className="text-gray-600 list-disc pl-5 space-y-2 leading-relaxed">
                                {selectedService.info?.split("\n").map((line, i) => (
                                    <li key={i}>{line}</li>
                                ))}
                            </ol>

                            <div className="mt-8">
                                <span className="text-sm text-gray-600 uppercase tracking-wider font-semibold">Total Price</span>
                                <p className="text-3xl font-extrabold text-gray-800">
                                    KES {selectedService.price?.toLocaleString()} 
                                    <span className='text-md font-normal text-gray-500 ml-1'>/ per unit</span>
                                </p>
                            </div>
                        </div>


                        <div className="p-6 bg-gray-50 flex flex-col gap-3">
                            <button 
                            onClick={() => setShowNumber(true)}
                            className="w-full py-3 px-4 bg-[var(--teal-dark-dark)] hover:opacity-90 text-white font-semibold rounded-md transition-all">
                                {!showNumber ? "Get Solution": "call : +254 727 494 414"}
                            </button>
                            <Link href="https://wa.me/" className="w-full">
                                <button className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-md transition-all">
                                    Request Quotation
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
