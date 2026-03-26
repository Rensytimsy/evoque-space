import UnifiedAdminPage from "../../components/servicespage";
import axios from "axios"
import { unstable_cache } from 'next/cache';


const all_services = unstable_cache(
    async() => {
        return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}services/`)
    },
    ["allservices"],
    {
        tags: ["allservices"],
        revalidate: 300
    }
)

const all_categories = unstable_cache(
    async() => {
        return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}categories/`)
    },
    ["allcategories"],
    {
        tags: ["allcategories"],
        revalidate: 300
    }
)


export default async function ServicePage(){
    const services = await all_services();
    const category = await all_categories();
    return <UnifiedAdminPage services={services.data.data} categories={category.data.data}/>
}