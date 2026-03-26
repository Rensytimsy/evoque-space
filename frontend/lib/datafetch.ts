import axios from "axios"

export type Products = {
    id: number, 
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number,
    }
}

export const getProducts = async():Promise<Products[]> => {
    const response = await axios.get("https://fakestoreapi.com/products")
    const data = response.data;
    return data
}