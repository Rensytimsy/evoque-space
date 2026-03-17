"use client"

import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Edit, Trash2, MoreHorizontal } from 'lucide-react'

// 1. Define your Product shape
type Product = {
  id: string
  title: string
  price: number
}

const columnHelper = createColumnHelper<Product>()

// 2. Define your columns
const columns = [
  columnHelper.accessor('title', {
    header: 'Product Title',
    cell: info => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: info => {
      const amount = parseFloat(info.getValue().toString())
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: props => (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => console.log('Edit', props.row.original.id)}
          className="p-2 hover:bg-slate-100 rounded-md text-blue-600"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => console.log('Delete', props.row.original.id)}
          className="p-2 hover:bg-slate-100 rounded-md text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  }),
]

export default function ProductTable({ data }: { data: Product[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border border-slate-200 overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-700 uppercase text-xs">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-3 font-semibold">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-slate-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-slate-50 transition-colors">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}