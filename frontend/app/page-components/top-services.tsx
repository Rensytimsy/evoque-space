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
    const [close, setClose] = useState<boolean>(true)
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

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Top Services</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[200px] mb-10 ">
                {data?.slice(0, 3).map((s:Service) => (
                    <div 
                        key={s.id} 
                        onClick={() => setSelectedService(s)}
                        className="relative p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    >
                        <h3 className="font-bold text-2xl">{s.title}</h3>
                        <p>{s.subtitle}</p>
                        <p className="mb-4 mt-2 text-md mb-10 ">{s.description}</p>
                        <button className="absolute bottom-0 mb-2 text-sm bg-[var(--teal-dark-light)] text-white font-semibold p-2">View Solution →</button>
                    </div>
                ))}
            </div>

            {selectedService && (
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

