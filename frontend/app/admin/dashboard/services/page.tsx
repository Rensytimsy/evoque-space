'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender, 
  createColumnHelper 
} from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Link from 'next/link'
import {useServices, useCategories} from "@/hooks/datafetch"
// --- Types ---
type Service = {
  id?: string
  title: string
  subtitle: string
  description: string
  price: number
  info: string
  category: string
}

type Category = {
    id?: string,
    title: string
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
const columnHelper = createColumnHelper<Service>()

export default function UnifiedAdminPage() {
  const queryClient = useQueryClient();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{id: string, title: string}[]>([]);
  const [editCategory, setEditCategory] = useState<Category | null>(null)
  const [formSelected, setFormSelected] = useState<string>("")

  // --- 1. Data Fetching ---
  const {data, isLoading, error} = useServices()
//   const {dataCategory, isLoading, error} = useServices()
  useEffect(() => {
    const get_services = async() => {
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}categories/`)
            setSelectedCategory(response.data.data)
        }catch(error){
            console.log(error)
        }
    }
    get_services()
  }, [])


  // --- 2. Form Logic ---
  const { register, handleSubmit, reset, setValue } = useForm<Service>()

  const openForm = (service?: Service) => {
    if (service) {
      setEditingService(service)
      reset(service)
    } else {
      setEditingService(null)
      reset({ title: '', subtitle: '', description: '', price: 0, info: '', category: '' })
    }
    setIsPanelOpen(true)
  }

  const updateCategoryForm = (category?: Category) => {
    if(category){
        setEditCategory(category)
        reset(category)
    } else {
        setEditCategory(null)
        reset({id: "", title: ""})
    }
  }

  // --- 3. Mutations (Create, Update, Delete) ---
  const saveMutation = useMutation({
    mutationFn: (data: Service) => {
      return editingService 
        ? axios.put(`${API_URL}update-service/`, data)
        : axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}new-service/`, data, {
            withCredentials: true
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      setIsPanelOpen(false)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`${API_URL}${id}/`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] })
  })

  // --- 4. Table Columns ---
  const columns = useMemo(() => [
    columnHelper.accessor('title', {
      header: 'Service',
      cell: info => <div className="font-semibold text-gray-800">{info.getValue()}</div>
    }),
    columnHelper.accessor('subtitle', {
      header: 'Subtitle',
      cell: info => <div className="font-normal text-gray-800">{info.getValue()}</div>
    }),
    columnHelper.accessor('price', {
      header: 'Price (KES)',
      cell: info => <span className="text-gray-600 font-bold">{info.getValue()?.toLocaleString()}</span>
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-4">
          <button onClick={() => openForm(row.original)} className="text-teal-600 hover:text-teal-800 font-medium text-sm">Edit</button>
          <button 
            onClick={() => confirm('Are you sure?') && deleteMutation.mutate(row.original.id!)} 
            className="text-red-500 hover:text-red-700 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      )
    })
  ], [deleteMutation])

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="min-h-screen bg-white p-8 relative overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Services Dashboard</h1>
          <p className="text-gray-500">Manage your services and categories</p>
        </div>
        <div className='space-x-2'>
            <button 
            onClick={() => openForm()}
            className="bg-[var(--teal-dark-light)] text-white px-6 py-2.5 rounded-md font-semibold hover:bg-[var(--teal-dark-dark)]"
            >
            Add Service
            </button>
            <button 
            onClick={() => updateCategoryForm()}
            className="bg-[var(--teal-dark-dark)] text-white px-6 py-2.5 rounded-md font-semibold hover:bg-[var(--teal-dark-light)]"
            >
            Add Category
            </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[var(--teal-dark-light)] border-b border-gray-200">
            {table.getHeaderGroups().map(group => (
              <tr key={group.id}>
                {group.headers.map(header => (
                  <th key={header.id} className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr><td colSpan={3} className="p-12 text-center text-gray-400">Loading records...</td></tr>
            ) : table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slide-over Form Panel */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingService ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setIsPanelOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))} className="p-6 flex-1 overflow-y-auto space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Service Title</label>
                <input {...register('title')} className="w-full mt-1 p-3 bg-gray-50 border rounded-md  outline-none" placeholder="Solar Panel Package" required />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Subtitle</label>
                <input {...register('subtitle')} className="w-full mt-1 p-3 bg-gray-50 border rounded-md" placeholder="Quick catchphrase" />
              </div>

              <div className='space-x-4'>
                <label className="text-sm font-bold text-gray-500 uppercase">Category</label>
                <select 
                {...register('category')}
                className='p-2'
                required
                >
                    <option value="" className='bg-gray-200'>Select Category</option>
                    {selectedCategory.map((c, i) => (
                        <option value={c.id} key={i}>{c.title}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Price (KES)</label>
                <input {...register('price')} type="number" className="w-full mt-1 p-3 bg-gray-50 border rounded-md" placeholder="0.00" required />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                <textarea {...register('description')} className="w-full mt-1 p-3 bg-gray-50 border rounded-md h-34" placeholder="Briefly describe the service..." />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Technical Info (Newline separated)</label>
                <textarea {...register('info')} className="w-full mt-1 p-3 bg-gray-50 border rounded-md h-32 text-sm" placeholder="Feature 1&#10;Feature 2" />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button 
                  disabled={saveMutation.isPending}
                  className="w-full py-3 bg-[var(--teal-dark-dark)] text-white font-bold rounded-md hover:bg-[var(--teal-dark-light)] disabled:opacity-80"
                >
                  {saveMutation.isPending ? 'uploading...' : 'Add Service'}
                </button>
                <button type="button" onClick={() => setIsPanelOpen(false)} className="w-full py-3 text-gray-500 font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}