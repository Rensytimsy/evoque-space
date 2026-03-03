"use client"

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";

const products = [
    { id: 1, name: "Freestanding Soaking Tub", category: "Bathrooms", price: 2840, rating: 4.8, reviews: 124, tag: "Bestseller", img: "🛁", desc: "Oval cast-iron soaker with matte white finish" },
    { id: 2, name: "Rainfall Shower System", category: "Bathrooms", price: 1290, rating: 4.7, reviews: 89, tag: "New", img: "🚿", desc: "Ceiling-mount 12in head with thermostatic valve" },
    { id: 3, name: "Wall-Mount Vanity", category: "Bathrooms", price: 980, rating: 4.5, reviews: 67, tag: null, img: "🪞", desc: "Floating oak vanity with integrated basin" },
    { id: 4, name: "Steam Shower Enclosure", category: "Bathrooms", price: 3450, rating: 4.9, reviews: 43, tag: "Premium", img: "🚿", desc: "Frameless tempered glass with steam generator" },
    { id: 5, name: "Clawfoot Bathtub", category: "Bathrooms", price: 3200, rating: 4.8, reviews: 58, tag: null, img: "🛁", desc: "Victorian cast-iron with brushed brass feet" },
    { id: 6, name: "Modular Kitchen Island", category: "Kitchen", price: 2100, rating: 4.6, reviews: 201, tag: "Bestseller", img: "🍽️", desc: "Solid walnut top with integrated wine rack" },
    { id: 7, name: "Farmhouse Sink", category: "Kitchen", price: 760, rating: 4.7, reviews: 155, tag: null, img: "🚰", desc: "Apron-front fireclay in antique white" },
    { id: 8, name: "Pot Filler Faucet", category: "Kitchen", price: 390, rating: 4.5, reviews: 88, tag: "New", img: "🚰", desc: "Articulated brass wall-mount, matte black" },
    { id: 9, name: "Linen Storage Cabinet", category: "Bedroom", price: 670, rating: 4.4, reviews: 73, tag: null, img: "🗄️", desc: "Solid oak with rattan panel doors" },
    { id: 10, name: "Statement Pendant Light", category: "Lighting", price: 520, rating: 4.7, reviews: 112, tag: "New", img: "💡", desc: "Hand-blown smoked glass, antique brass" },
    { id: 11, name: "Marble Console Table", category: "Living Room", price: 1850, rating: 4.8, reviews: 39, tag: "Premium", img: "🪑", desc: "Calacatta marble top with brass hairpin legs" },
    { id: 12, name: "Heated Towel Rail", category: "Bathrooms", price: 340, rating: 4.6, reviews: 198, tag: null, img: "🧣", desc: "Stainless ladder rail, polished chrome" },
];

const categories = ["All", "Bathrooms", "Kitchen", "Bedroom", "Living Room", "Lighting"];
const priceRanges = [
    { label: "Under $500", min: 0, max: 500 },
    { label: "$500 - $1,000", min: 500, max: 1000 },
    { label: "$1,000 - $2,000", min: 1000, max: 2000 },
    { label: "Over $2,000", min: 2000, max: Infinity },
];
const sortOptions = ["Featured", "Low Price", "High Price", "Top Rated"];

const C = {
    cream: "#F7F3EE",
    sand: "#E8DDD0",
    warmMid: "#C9B99A",
    terracotta: "#B5633A",
    terracottaLight: "#D4845C",
    dark: "#2C2416",
    mid: "#6B5A45",
    muted: "#9A8572",
    heroStart: "#3D2E1E",
    heroMid: "#5C4230",
    gold: "#7A5A10",
};

const tagStyle = (tag: string | null) => {
    if (tag === "New") return { background: "#005461", color: C.cream };
    if (tag === "Premium") return { background: "#3BC1A8", color: C.cream };
    return { background: C.terracotta, color: C.cream };
};

export default function ShopPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("Featured");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [cart, setCart] = useState<number[]>([]);
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleWishlist = (id: number) => setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
    const addToCart = (id: number) => setCart(p => p.includes(id) ? p : [...p, id]);
    const togglePriceRange = (label: string) => setSelectedPrices(p => p.includes(label) ? p.filter(x => x !== label) : [...p, label]);
    const toggleTag = (tag: string) => setSelectedTags(p => p.includes(tag) ? p.filter(x => x !== tag) : [...p, tag]);

    const filtered = useMemo(() => {
        let list = [...products];
        if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()));
        if (selectedCategory !== "All") list = list.filter(p => p.category === selectedCategory);
        if (selectedPrices.length > 0) {
            list = list.filter(p => selectedPrices.some(label => {
                const range = priceRanges.find(r => r.label === label)!;
                return p.price >= range.min && p.price < range.max;
            }));
        }
        if (selectedTags.length > 0) list = list.filter(p => p.tag && selectedTags.includes(p.tag));
        if (sortBy === "Price: Low to High") list.sort((a, b) => a.price - b.price);
        else if (sortBy === "Price: High to Low") list.sort((a, b) => b.price - a.price);
        else if (sortBy === "Top Rated") list.sort((a, b) => b.rating - a.rating);
        return list;
    }, [search, selectedCategory, selectedPrices, selectedTags, sortBy]);

    const hasFilters = selectedPrices.length > 0 || selectedTags.length > 0 || selectedCategory !== "All" || !!search;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.onscroll = () => {
                setIsScrolled(window.scrollY > 20);
            };
        }
    }, [])

    console.log(isScrolled)

    return (
        <div className="min-h-screen mt-20 bg-white">
            <div className="relative overflow-hidden border-b bg-[var(--teal-dark-light)] rounded-br-4xl rounded-bl-4xl p-2">
                {/* <div className="relative py-6 md:py-14 px-6 text-center">
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-6xl font-extrabold tracking-[10px] md:tracking-[15px] uppercase text-white mb-4">
                            ESL Shop
                        </h1>
                        <div className="flex items-center justify-center gap-4">
                            <p className="font-jost text-md md:text-md tracking-tight md:tracking-tight uppercase text-white/80 italic">
                                Elevated essentials for the modern sanctuary
                            </p>
                        </div>
                    </div>
                </div> */}

                {/* 2. Search & Filter Bar */}
                <div className={`fixed top-20 w-full left-0 right-0 rounded-br-4xl rounded-bl-4xl z-20 px-4 md:px-10 py-4 md:py-6 bg-[var(--teal-dark-light)]`}>

                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">

                        {/* Search Input Group */}
                        <div className="relative flex-1 w-full group lg:ml-[20%]">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-sm transition-transform group-focus-within:scale-110">
                                <Search size={23} className="text-[var(--teal-dark-dark)]" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search — bathtubs, vanities, lighting..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full lg:w-full font-jost text-sm outline-none pl-12 pr-4 py-3.5 transition-all duration-300 bg-white text-[var(--teal-dark-dark)] rounded-lg"
                            />
                        </div>

                        {/* Select & Count Group */}
                        <div className="flex items-center gap-4 w-full md:w-auto lg:mr-10">
                            <div className="relative flex-1 md:flex-none">
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="w-full md:w-56 font-jost text-sm font-semibold tracking-wide uppercase px-5 py-4 outline-none cursor-pointer bg-[var(--teal-dark-dark)] text-white rounded-full"
                                >
                                    {sortOptions.map(o => <option key={o} className="bg-white text-black">{o}</option>)}
                                </select>
                                {/* Custom Arrow for Select */}
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

                {/* Sidebar */}
                <aside className={`hidden h-full lg:block fixed top-[15%] -mt-11 sidebar-transition overflow-hidden flex-shrink-0 bg-[var(--teal-dark-light)]`}
                    style={{
                        width: sidebarOpen ? "268px" : "0px", minWidth: sidebarOpen ? "268px" : "0px",
                        padding: sidebarOpen ? "28px 24px" : "0px"
                    }}>
                    <div style={{ opacity: sidebarOpen ? 1 : 0, transition: "opacity 0.2s" }}>

                        {/* Categories */}
                        <div className="mb-8 mt-12">
                            <SidebarTitle label="Category" />
                            {categories.map(c => (
                                <button key={c} className="font-jost block w-full text-left text-sm px-3 py-2 border-l-2 transition-all duration-200"
                                    style={{
                                        background: selectedCategory === c ? "#005461" : "transparent",
                                        borderLeftColor: selectedCategory === c ? "#fff" : "transparent",
                                        color: selectedCategory === c ? "#fff" : "#ffffff",
                                        fontWeight: selectedCategory === c ? 500 : 400
                                    }}
    
                                    onClick={() => setSelectedCategory(c)}>{c}</button>
                            ))}
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            <div className="font-jost  tracking-tight uppercase mb-4 flex items-center gap-2 text-white text-md">
                                Price Range
                                {selectedPrices.length > 0 && (
                                    <button className="font-jost text-[10px] tracking-tight uppercase underline cursor-pointer text-white"
                                        onClick={() => setSelectedPrices([])}>Clear</button>
                                )}
                            </div>
                            {priceRanges.map(r => (
                                <label key={r.label} className="font-jost flex items-center gap-2.5 py-1.5 text-sm cursor-pointer text-white">
                                    <input type="checkbox" className="w-4 h-4 cursor-pointer flex-shrink-0"
                                        checked={selectedPrices.includes(r.label)} onChange={() => togglePriceRange(r.label)} />
                                    {r.label}
                                </label>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="mb-8">
                            <SidebarTitle label="Tags" />
                            <div className="flex flex-wrap gap-1.5">
                                {["Bestseller", "New", "Premium"].map(t => (
                                    <button key={t} className="font-semibold text-sm tracking-[1px] uppercase px-3 py-1.5 transition-all duration-200 rounded-full"
                                        style={{
                                            border: `2px solid ${selectedTags.includes(t) ? "#005461" : "#005461"}`,
                                            background: selectedTags.includes(t) ? "#fff" : "#fff",
                                            color: selectedTags.includes(t) ? "#000" : "#000"
                                        }}
                                        onClick={() => toggleTag(t)}>{t}</button>
                                ))}
                            </div>
                        </div>

                        {/* Clear All */}
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

                {/* Product Grid */}
                <main className="flex-1 p-7 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-5 lg:ml-[24%]">
                    {filtered.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center mt-[20%] py-24 text-center">
                            <p className="text-2xl font-light tracking-widest text-[var(--teal-dark-dark)]" >No products found</p>
                            <p className="font-jost text-sm mt-2 text-[var(--teal-light)]">Try adjusting your search or filters</p>
                        </div>
                    ) : filtered.map(p => (
                        <div key={p.id} className="card-hover min-w-32 border relative flex flex-col mt-30 lg:mt-20"
                            style={{ background: C.cream, borderColor: C.sand }}>

                            {/* Image */}
                            <div className="relative flex items-center justify-center text-6xl h-[210px] bg-white">
                                <span className="relative z-10">{p.img}</span>
                                {p.tag && (
                                    <span className="font-jost absolute top-3 left-3 text-xs tracking-[2px] uppercase p-2 rounded-md"
                                        style={tagStyle(p.tag)}>{p.tag}</span>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="flex flex-col flex-1 p-5 bg-[var(--teal-dark-dark)]">
                                <p className="font-semibold text-sm tracking-tight uppercase mb-1 text-white">{p.category}</p>
                                <h3 className="text-lg font-medium leading-snug mb-1 text-white">{p.name}</h3>
                                <p className="font-jost text-xs leading-relaxed mb-3 text-white">{p.desc}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xl font-semibold text-white">KES: {p.price.toLocaleString()}</span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-jost text-sm font-semibold text-white">({p.reviews})</span>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-x-2">
                                    <button className="font-jost w-full mt-3 py-3 text-sm tracking-tight camelcase transition-colors duration-200 bg-[var(--teal-light)] tex-[var(--teal-dark-dark)] rounded-md font-semibold"
                                        onClick={() => addToCart(p.id)}>
                                        Buy
                                    </button>
                                    <button className="font-jost w-full mt-3 py-3 text-sm tracking-tight camelcase transition-colors duration-200 bg-[#1FADAD] text-white rounded-md font-semibold"
                                        onClick={() => addToCart(p.id)}>
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
}

function SidebarTitle({ label }: { label: string }) {
    return (
        <div className="font-jost tracking-tight uppercase mb-4 flex items-center gap-2 text-white text-md">
            {label}
        </div>
    );
}