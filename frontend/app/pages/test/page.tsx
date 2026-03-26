import { getProducts } from "@/hooks/datafetch"
import { Product } from "@/hooks/datafetch"
import { unstable_cache } from "next/cache"
import { useShoppingCart } from "@/hooks/use-context"

export const dynamic = "force-static"
export const regenerate = 300


const TestPage = () => {
  

  return(
    <div className="min-h-[100vh]">
      test page.
    </div>
  )
}

export default TestPage;