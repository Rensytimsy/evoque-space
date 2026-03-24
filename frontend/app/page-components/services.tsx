import { unstable_cache } from "next/cache";
import axios from "axios";
import  TopServices  from "./top-services";

export const dynamic = "force-static"

const getTopServices = unstable_cache(
    async() => {
        return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}services/`)
    },
    ['topservices'],
    {
        tags: ['topservices'],
        revalidate: 300
    }
)

export default async function TopRequestedServices(){
    const response = await getTopServices();
    console.log("services data", response.data.data)
    return <TopServices servicesdata={response.data.data}/>
}

