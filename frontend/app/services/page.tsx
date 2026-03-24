import { unstable_cache } from "next/cache";
import axios from "axios"
import ServicePageData from "../page-components/servicePage";

const getAllServicesData = unstable_cache(
    async() => {
        return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}services/`)
    },
    ['topservices'],
    {
        tags: ['topservices'],
        revalidate: 300
    }
)

export default async function ServicePage(){
    const all_services = await getAllServicesData();
    return <ServicePageData  servicesdata={all_services.data.data}/>
}