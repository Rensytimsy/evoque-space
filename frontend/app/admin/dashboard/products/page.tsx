import axios from "axios"
import { unstable_cache } from "next/cache"
import ProductTable from "../../components/proudcts-table"
import ProductsAdminPage from "../../components/productpage"

const all_products = unstable_cache(
    async () => {
        return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/`);
    },
    ["adminproducts"],
    {
        tags: ["adminproducts"],
        revalidate: 300
    }
)


export default async function ProudctsPage() {
    const res = await all_products()
    return <ProductsAdminPage product={res.data.data} />
}