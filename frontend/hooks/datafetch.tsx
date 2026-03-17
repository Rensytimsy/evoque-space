import {useQuery} from "@tanstack/react-query"
import axios from "axios"

export const useServices = () => {
    return useQuery({
    queryKey: ["services"],
    queryFn: async() => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}services`)
        return res.data.data
    }
})}