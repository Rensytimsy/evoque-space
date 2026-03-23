// Delete or rename: pages/shop.tsx
// Create: app/shop/page.tsx

import { unstable_cache } from "next/cache";
import axios from "axios";
import ShopPage from "../page-components/shopPage";

const getAllProducts = unstable_cache(
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/`);
    return response.data?.data || [];
  },
  ['products'],
  {
    tags: ["products"],
    revalidate: 300
  }
);

export default async function ShopClient() {
  const initialProducts = await getAllProducts();
  return <ShopPage productdata={initialProducts}/>
}