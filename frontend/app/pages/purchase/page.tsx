"use client"
import { Product } from "@/hooks/datafetch";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useShoppingCart } from "@/hooks/use-context";
import { ProductData } from "@/hooks/use-context";

const PurchasePage = () => {
    const [product, setProduct] = useState<ProductData>();
    const {addToCart, cart} = useShoppingCart();
    console.log(cart);
    useEffect(() => {
        const getSingleProduct = async() => {
            try{
                const response = await axios.get("https://fakestoreapi.com/products/1");
                setProduct(response.data);
            }catch(error){
                console.log(error);
            }
        }
        getSingleProduct()
    }, [])
    return(
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow bg-[var(--teal-dark-dark)] rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row p-6 gap-8">
            <div className="w-full md:w-1/3 flex justify-center items-start">
                <img 
                src={product?.image} 
                alt={product?.title} 
                className="w-full h-auto max-w-[150px] object-contain rounded-lg" 
                />
            </div>
            
            <div className="w-full md:w-2/3 mt-10">
                <h1 className="text-2xl font-bold text-white mb-4">
                {product?.title}
                </h1>
                <p className="text-white leading-relaxed mb-6">
                {product?.description}
                </p>
                <div className="text-2xl font-bold text-white">
                ${product?.price}
                </div>
            </div>
            </div>
        </div>

        <div className="w-full lg:w-80 h-fit bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4">
            Cart Summary
            </h2>
            <div className="flex justify-between mb-2 text-black">
            <span>Subtotal</span>
            <span className="font-medium">${product?.price}</span>
            </div>
            <div className="border-t border-gray-100 my-4 pt-4">
            <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-black">${product?.price}</span>
            </div>
            <button 
            onClick={() => product && addToCart({
                id:product.id, 
                title: product.title, 
                price: product.price, 
                image: product.image,
                description: product.description,
                category: product.category,
                tag: product.tag,
            })}
            className="w-full bg-[var(--teal-dark-light)] hover:bg-[var(--teal-light)] text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform active:scale-95">
                Checkout
            </button>
            </div>
        </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">
            Related Products
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Placeholder for related items */}
            <div className="h-40 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center text-gray-400">
            Related Item
            </div>
        </div>
        </div>
    </div>
    </div>
    )
}


export default PurchasePage;
