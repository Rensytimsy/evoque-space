"use client"

import {useEffect, useState} from "react"
import AddProductPage from "../../components/add-products"
import ProductTable from "../../components/proudcts-table"
import axios from "axios"

const test_data = [
  {
    "title": "TestProductOne",
    "price": 5,
    "id": "0"
  },
  {
    "title": "TestProductOne",
    "price": 20,
    "id": "1"
  },
  {
    "title": "TestProductOne",
    "price": 10,
    "id": "2"
  },
]

export const ProductsPage = () => {
  const [selected, setSelected] = useState(false);
  const [products, setProducts] = useState([])
  useEffect(() => {
    const get_products = async() => {
        try{
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/`);
          setProducts(response.data.data)
          console.log(response.data.data)
        }catch(error){
          console.log(error)
        }
    }

    get_products()
  }, [])

  return(
    <div className="">
      <div className="absolute right-10 top-5 mt-15 mb-15 space-x-20">
        <button onClick={() => setSelected(false)} className="border p-2 ml-4 bg-[var(--teal-dark-dark)] rounded-md text-white cursor-pointer hover:bg-[var(--teal-dark-light)]">Products</button>
        <button onClick={() => setSelected(true)} className="border p-2 ml-4 bg-[var(--teal-dark-dark)] rounded-md text-white cursor-pointer hover:bg-[var(--teal-dark-light)]">Add Products</button>
      </div>
      <div className="mt-35">
        {
          selected ? <AddProductPage /> : <ProductTable data={products}/>
        }
      </div>
    </div>
  )
}

export default ProductsPage;