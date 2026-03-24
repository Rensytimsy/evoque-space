"use client"
import { Products } from "@/lib/datafetch"
import { getProducts } from "@/lib/datafetch"
import { GetStaticProps } from "next"
import { FC } from "react"
import { unstable_cache } from "next/cache"

export const dynamic = "force-static";
export const regenerate = 300;

const cacheAllProducts = unstable_cache(
    async () => {
        const productsdata = await getProducts();
        return productsdata;
    },
    ['products'],
    {
        revalidate: regenerate,
        tags: ['products']
    }
)



const TestPage:FC<{ productsdata : Products }> = async() => {
    const products = await cacheAllProducts();
    if (!products || products.length < 1){
        return <div>No products were found</div>
    }
    return(
        <div className="flex justify-cente align-center h-full">
            <div className="grid grid-cols-6">
                {products.map((p, i) => (
                    <div className="">
                        <div>
                            <img src={p.image} alt="product image" />
                        </div>
                        {p.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TestPage;