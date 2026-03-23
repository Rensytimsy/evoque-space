import { getProducts } from "@/hooks/datafetch"
import { Product } from "@/hooks/datafetch"
import { unstable_cache } from "next/cache"
import { useShoppingCart } from "@/hooks/use-context"

export const dynamic = "force-static"
export const regenerate = 300

const getCachedProducts = unstable_cache(
  async() => {
    return await getProducts();
  },
  ['products'],
  {
    tags: ['products'],
    revalidate: regenerate
  }

)

const TestPage = async() => {
  
  // const {addToCart} = useShoppingCart();  
  const data = getCachedProducts();

  return(
    <div className="min-h-[100vh]">
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 space-y-4 space-x-4 mt-20 mb-30">
        {(await data).map((p, i) => (
          <div key={i} className="border relative h-[350px] p-2">
            <div className="flex justify-center align-center w-full">
              <img src={p.image} alt="product image" className="max-w-[100px] lg:max-w-[150px] lg:max-h-[150px] max-h-[100px] md:max-w-[120px] md:mx-h-[120px]"/>
            </div>
            <div className="p-2 absolute bg-[var(--teal-dark-dark)] bottom-0 left-0 right-0 w-full min-h-[100px]">
              <div className="flex  justify-between">
                <p className="text-white">Rating: {p.rating.rate}</p>
                <p className="text-white">Stock: {p.rating.count}</p>
              </div>
              <p className="text-white text-lg">{p.title.slice(0, 15)}....</p>
              <p className="text-white">{p.price}</p>
              <div className="flex flex-col space-y-3">
                <button className="bg-[var(--teal-dark-light)] w-full rounded-md">Buy</button>
                <button className="bg-[var(--teal-dark-light)] w-full rounded-md">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestPage;