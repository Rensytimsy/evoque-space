"use client"

import { useState, useMemo, useEffect } from "react";
import { Search, ShoppingBasket, ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";
import axios from "axios"
import { ProductData, useShoppingCart } from "@/hooks/use-context";
import { unstable_cache } from "next/cache";


const categories = ["All", "Bathrooms","Decor", "Kitchen", "Bedroom", "Living Room", "Lighting", "Surveillance", "Solar accessories"];
const priceRanges = [
    { label: "Under 1000", min: 0, max: 500 },
    { label: "1000 - 10,000", min: 500, max: 1000 },
    { label: "10,000 - 50,000", min: 1000, max: 2000 },
    { label: "Over 50,000", min: 2000, max: Infinity },
];
const sortOptions = ["Featured", "Low Price", "High Price", "Top Rated"];


export default  function ShopPage({productdata}:{productdata: ProductData[]}) {

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("Featured");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [product, setProducts] = useState<ProductData[]>(productdata);
    const [isScrolled, setIsScrolled] = useState(false)

    const {cart, checkout, addToCart} = useShoppingCart()
    // const data = getAllProducts();
    // console.log(data);


    const toggleWishlist = (id: number) => setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

    const togglePriceRange = (label: string) => setSelectedPrices(p => p.includes(label) ? p.filter(x => x !== label) : [...p, label]);
    const toggleTag = (tag: string) => setSelectedTags(p => p.includes(tag) ? p.filter(x => x !== tag) : [...p, tag]);


const filtered = useMemo(() => {
    if (!Array.isArray(product)) return [];
    
    let list = [...product];
    
    if (search) {
        list = list.filter(p => 
            p.title?.toLowerCase().includes(search.toLowerCase()) || 
            p.description?.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    if (selectedCategory && selectedCategory !== "All") {
        list = list.filter(p => 
            p.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
    }
    
    if (selectedPrices.length > 0) {
        list = list.filter(p => {
            const price = typeof p.price === 'string' ? parseFloat(p.price) : p.price;
            return selectedPrices.some(label => {
                const range = priceRanges.find(r => r.label === label);
                return range && price >= range.min && price < range.max;
            });
        });
    }
    
    if (sortBy === "Price: Low to High") {
        list = [...list].sort((a, b) => {
            const priceA = typeof a.price === 'string' ? parseFloat(a.price) : a.price;
            const priceB = typeof b.price === 'string' ? parseFloat(b.price) : b.price;
            return priceA - priceB;
        });
    } else if (sortBy === "Price: High to Low") {
        list = [...list].sort((a, b) => {
            const priceA = typeof a.price === 'string' ? parseFloat(a.price) : a.price;
            const priceB = typeof b.price === 'string' ? parseFloat(b.price) : b.price;
            return priceB - priceA;
        });
    }
    
    return list;
}, [search, selectedCategory, selectedPrices, sortBy, product]);

    const hasFilters = selectedPrices.length > 0 || selectedTags.length > 0 || selectedCategory !== "All" || !!search;


    return (
        <div className="min-h-screen mt-20 bg-white dark:bg-[var(--teal-dark-dark)]/20">
            <div className="relative overflow-hidden border-b rounded-br-4xl rounded-bl-4xl p-2">
                <div className={`fixed top-18 w-full left-0 py-10  right-0 rounded-br-4xl rounded-bl-4xl z-20 px-4 md:px-10 py-4 md:py-6 bg-white dark:bg-[var(--teal-dark-dark)]`}>

                    <div className="max-w-7xl mx-auto lg:mt-8 flex flex-col md:flex-row items-center gap-4">

                        <div className="relative flex-1 w-full group lg:ml-[20%]">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-sm transition-transform group-focus-within:scale-110">
                                <Search size={23} className="text-[var(--teal-dark-dark)]" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search — bathtubs, vanities, lighting..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full lg:w-full border border-[var(--teal-dark-dark)] rounded-full font-jost text-sm outline-none pl-12 pr-4 py-4 bg-white text-[var(--teal-dark-dark)]"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto lg:mr-10">
                            <div className="relative flex-1 md:flex-none">
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="w-full md:w-56 font-jost text-sm font-semibold tracking-wide uppercase px-5 py-4 outline-none cursor-pointer bg-[var(--teal-dark-dark)] text-white rounded-full"
                                >
                                    {sortOptions.map(o => <option key={o} className="bg-white text-black">{o}</option>)}
                                </select>
                            </div>

                            <div className="hidden lg:flex items-center gap-2 pl-4 border-l">
                                <span className="font-jost text-sm tracking-wide font-semibold whitespace-nowrap text-white">
                                    {filtered.length} results
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="flex">
                <aside className={`hidden h-full lg:block sticky top-40 sidebar-transition flex-shrink-0 bg-white dark:bg-[var(--teal-dark-dark)]/20`}
                    style={{
                        width: sidebarOpen ? "268px" : "0px", minWidth: sidebarOpen ? "268px" : "0px",
                        padding: sidebarOpen ? "28px 24px" : "0px"
                    }}>
                    <div style={{ opacity: sidebarOpen ? 1 : 0, transition: "opacity 0.2s" }}>

                        <div className="mb-8 mt-12">
                            <SidebarTitle label="Category" />
                            <div className="bg-white dark:bg-transparent flex flex-col text-left space-y-3 p-4">
                                {categories.map(c => (
                                    <button key={c} className={`${selectedCategory === c ? "bg-[var(--teal-dark-dark)] text-white dark:bg-[var(--teal-dark-light)]" : ""} space-y-2 border-[var(--teal-dark-dark)] dark:border-gray-100 dark:text-white  px-2 py-1 rounded-sm text-[var(--teal-dark-dark)] text-start font-semibold`}
                                        onClick={() => setSelectedCategory(c)}>{c}</button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="font-jost  tracking-tight uppercase mb-4 font-extrabold flex items-center gap-2 text-black text-md dark:text-white">
                                Price Range
                                {selectedPrices.length > 0 && (
                                    <button className="font-jost text-[10px] tracking-tight dark:text-white uppercase underline cursor-pointer text-black"
                                        onClick={() => setSelectedPrices([])}>Clear</button>
                                )}
                            </div>
                            {priceRanges.map(r => (
                                <label key={r.label} className="font-jost flex items-center gap-2.5 py-1.5 text-sm cursor-pointer text-black dark:text-white">
                                    <input type="checkbox" className="w-4 h-4 cursor-pointer flex-shrink-0"
                                        checked={selectedPrices.includes(r.label)} onChange={() => togglePriceRange(r.label)} />
                                    {r.label}
                                </label>
                            ))}
                        </div>

                        <div className="mb-8">
                            <SidebarTitle label="Tags" />
                            <div className="flex flex-wrap gap-1.5">
                                {["Bestseller", "New", "Premium"].map(t => (
                                    <button key={t} className="font-semibold text-sm tracking-[1px] bg-[var(--teal-dark-dark)] text-white dark:text-white uppercase px-3 py-1.5 transition-all duration-200 rounded-full"
                                        onClick={() => toggleTag(t)}>{t}</button>
                                ))}
                            </div>
                        </div>

                        {hasFilters && (
                            <div className="mb-8">
                                <SidebarTitle label="Active Filters" />
                                <button className="font-jost text-md tracking-[1.5px] uppercase underline cursor-pointer"
                                    style={{ color: "#fff", background: "none", border: "none" }}
                                    onClick={() => { setSelectedPrices([]); setSelectedTags([]); setSelectedCategory("All"); setSearch(""); }}>
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                <main className="flex-1 p-4 md:p-7 mt-32 lg:mt-24">
  {filtered.length === 0 ? (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <p className="text-2xl font-light tracking-widest text-[var(--teal-dark-dark)] dark:text-white">
        No products found
      </p>
      <p className="font-jost text-sm mt-2 text-[var(--teal-light)] dark:text-white">
        Try adjusting your search or filters
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtered.map((p) => (
        <div 
          key={p.id} 
          className="group relative flex flex-col bg-white dark:bg-[var(--teal-dark-dark)] border border-gray-200 rounded-md dark:border-[var(--teal-dark-dark)] rounded-md overflow-hidden"
        >
          <div className="aspect-square w-full flex justify-center items-center p-4 bg-[var(--teal-dark-light)]/10 dark:bg-gray-900/50">
            <img
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${p.image}`}
              alt={p.title}
              className="max-h-[200px] max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow items-center text-center">
            <h3 className="text-lg font-semibold text-[var(--teal-dark-dark)] dark:text-white line-clamp-1">
              {p.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 line-clamp-2">
              {p.description}
            </p>
            <div className="mt-auto pt-3">
              <p className="text-xl font-bold text-[var(--teal-dark-light)] dark:text-teal-400">
                Kes {p.price?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</main>
            </div>
        </div>
    );
}

function SidebarTitle({ label }: { label: string }) {
    return (
        <div className="tracking-tight uppercase dark:text-white font-extrabold mb-4 flex items-center gap-2 text-black text-md">
            {label}
        </div>
    );
}