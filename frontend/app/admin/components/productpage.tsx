"use client"

import { useEffect, useState } from "react"
import AddProductPage from "./add-products"
import ProductTable from "./proudcts-table"
import axios from "axios"
import { Plus, X, Package } from "lucide-react"
import ProductPage from "@/app/page-components/productPage"

type Category = string

type Product = {
    id: string
    title: string
    price: number
    image: File | null
    description: string
    category: Category
}


export const ProductsAdminPage = ({ product }: { product: Product[] }) => {
    const [selected, setSelected] = useState(false);
    const [addOpen, setAddOpen] = useState(false);


    return (
        <div className="relative min-h-screen bg-slate-50">

            {/* ── Page header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[var(--teal-dark-dark)]">
                        <Package size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-[var(--teal-dark-dark)] leading-none">Products</h1>
                        <p className="text-xs text-slate-400 mt-0.5">{product.length} items in catalogue</p>
                    </div>
                </div>

                {/* Add Product toggle button */}
                <button
                    onClick={() => setAddOpen(true)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold
            bg-[var(--teal-dark-dark)] text-white shadow-sm
            hover:bg-[var(--teal-dark-light)] active:scale-95
            transition-all duration-150
            ${addOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                    <Plus size={16} strokeWidth={2.5} />
                    Add Product
                </button>
            </div>

            {/* ── Table area ──────────────────────────────────────────── */}
            <div className="px-8 py-6">
                <ProductTable products={product} />
            </div>

            {/* ── Slide-over backdrop ─────────────────────────────────── */}
            <div
                onClick={() => setAddOpen(false)}
                className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300
          ${addOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />

            {/* ── Add Product slide-over panel ────────────────────────── */}
            <div
                className={`fixed top-0 right-0 h-full z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${addOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Panel header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 bg-[var(--teal-dark-dark)]">
                    <div className="flex items-center gap-2">
                        <Plus size={18} className="text-white" />
                        <h2 className="text-base font-bold text-white">New Product</h2>
                    </div>
                    <button
                        onClick={() => setAddOpen(false)}
                        className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Scrollable form content */}
                <div className="flex-1 overflow-y-auto">
                    <AddProductPage />
                </div>
            </div>
        </div>
    )
}

export default ProductsAdminPage;
