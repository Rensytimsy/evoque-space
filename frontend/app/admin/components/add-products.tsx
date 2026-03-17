"use client"

import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios"
import Link from "next/link"


const CATEGORIES = [
  "furniture",
  "kitchen",
  "Decor",
  "lighting",
  "bathroom",
  "home",
  "technology",
  "floor",
  "storage",
  "security",
  "cleaning",
  "staircase"
];

interface ProductForm {
  title: string;
  description: string;
  category: string;
  price: string;
  image: File | null;
  imagePreview: string | null;
}

export default function AddProductPage() {
  const [form, setForm] = useState<ProductForm>({
    title: "",
    description: "",
    category: "",
    price: "",
    image: null,
    imagePreview: null,
  });
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductForm, string>>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getProducts = async() => {
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}products`);
        console.log(response);
      }catch(error){
        console.log(error)
      }
    }

    getProducts();
  }, [])

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageFile(file);
  }, []);

  const validate = () => {
    const newErrors: Partial<Record<keyof ProductForm, string>> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.category) newErrors.category = "Please select a category";
    if (!form.price) newErrors.price = "Price is required";
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price";
    if (!form.image) newErrors.image = "Product image is required";
    return newErrors;
  };

  const handleSubmit = async() => {
    try{
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const {title, category, description, price, image}:ProductForm = form;
      const formData = new FormData();
      formData.append("title", title)
      formData.append("price", price),
      formData.append("description", description),
      formData.append("image", image),
      formData.append("category", category)


      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}upload/`, formData, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      })
      setErrors({});
      setSubmitted(true);
    }catch(error){
      console.log(error)
    }
  };

  const handleReset = () => {
    setForm({ title: "", description: "", category: "", price: "", image: null, imagePreview: null });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--teal-light)] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          {form.imagePreview && (
            <img src={form.imagePreview} alt="Product" className="w-32 h-32 object-contain rounded-sm mx-auto mb-6 shadow-sm" />
          )}
          <h2 className="text-3xl font-bold text-white mb-2">Product Added!</h2>
          <p className="text-black text-lg mb-1 font-sans font-bold text-white">{form.title}</p>
          <p className="text-2xl font-bold text-white mb-6">${Number(form.price).toFixed(2)}</p>
          <div className="space-x-4">
            <Link href={{ pathname: "/admin/dashboard/products"}}>
              <button
                onClick={handleReset}
                className="bg-[var(--teal-dark-dark)] text-white px-8 py-3 rounded-md text-sm font-sans font-medium tracking-widest uppercase hover:bg-stone-700 transition-colors"
              >
                View Products
              </button>
            </Link>
            <button
              onClick={handleReset}
              className="bg-stone-800 text-white px-8 py-3 rounded-md text-sm font-sans font-medium tracking-widest uppercase hover:bg-stone-700 transition-colors"
            >
              Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="font-semibold text-stone-800 tracking-tight">Catalogue</span>
        </div>
        <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">New Listing</span>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10 bg-white">
        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-stone-800 mb-2">
            Add Product
          </h1>
          <p className="text-stone-400 text-sm">Fill in the details below to list a new product.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <label className="text-xs font-semibold tracking-widest uppercase text-black mb-10">
              Product Image
            </label>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden
                ${dragOver ? "border-stone-600 bg-stone-100" : "border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50"}
                ${errors.image ? "border-red-300" : ""}
              `}
              style={{ minHeight: "320px" }}
            >
              {form.imagePreview ? (
                <>
                  <img src={form.imagePreview} alt="Preview" className="w-full h-full object-contain" style={{ minHeight: "320px" }} />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                    <span className="text-white text-sm font-medium bg-black bg-opacity-60 px-4 py-2 rounded-full">
                      Change Image
                    </span>
                  </div> */}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                  <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-stone-600 text-sm font-medium">Drop image here</p>
                    <p className="text-stone-400 text-xs mt-1">or click to browse</p>
                  </div>
                  <p className="text-stone-300 text-xs">PNG, JPG, WEBP up to 10MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
              />
            </div>
            {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}

            {form.imagePreview && (
              <button
                onClick={(e) => { e.stopPropagation(); setForm(prev => ({ ...prev, image: null, imagePreview: null })); }}
                className="text-sm bg-gray-200 p-2 rounded-sm text-red-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Remove image
              </button>
            )}
          </div>

          {/* RIGHT — Form Fields */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-black mb-2">
                Product Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Wireless Noise-Cancelling Headphones"
                className={`w-full bg-white border rounded-xl px-4 py-3 text-stone-800 placeholder-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition
                  ${errors.title ? "border-red-300" : "border-stone-200"}`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-black mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your product — features, materials, dimensions..."
                className={`w-full bg-white border border-[var(--teal-dark-dark)] rounded-xl px-4 py-3 text-stone-800 placeholder-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition resize-none
                  ${errors.description ? "border-red-300" : "border-stone-200"}`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description
                  ? <p className="text-red-500 text-xs">{errors.description}</p>
                  : <span />
                }
                <span className="text-stone-300 text-xs">{form.description.length} chars</span>
              </div>
            </div>

            {/* Category + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-black mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className={`w-full appearance-none bg-white rounded-xl px-4 py-3 text-md  pr-10
                      ${form.category ? "text-black" : "text-black"}
                      ${errors.category ? "border-red-300" : "border-stone-200"}`}
                  >
                    <option value="" disabled>Select one…</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-black mb-2">
                  Price (KES)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium"></span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    className={`w-full bg-white border rounded-xl pl-8 pr-4 py-3 text-stone-800 placeholder-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition
                      ${errors.price ? "border-red-300" : "border-stone-200"}`}
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
            </div>

            {(form.title || form.category || form.price) && (
              <div className="rounded-2xl border border-stone-100 bg-[var(--teal-dark-light)] p-4 flex gap-4 items-center">
                {form.imagePreview
                  ? <img src={form.imagePreview} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  : <div className="w-14 h-14 rounded-xl bg-stone-100 flex-shrink-0" />
                }
                <div className="min-w-0 flex-1">
                  <p className="text-white font-semibold text-lg truncate">{form.title || "Product name"}</p>
                  <p className="text-white text-sm mt-0.5">{form.category || "No category"}</p>
                </div>
                <p className="text-white font-bold text-md flex-shrink-0">
                  {form.price ? `KES: ${Number(form.price).toFixed(2)}` : "—"}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 border border-stone-200 text-stone-500 py-3 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="flex-[2] bg-[var(--teal-dark-dark)] text-white py-3 rounded-xl text-sm font-semibold hover:bg-stone-700 active:scale-95 transition-all flex items-center justify-center gap-2 tracking-wide"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}