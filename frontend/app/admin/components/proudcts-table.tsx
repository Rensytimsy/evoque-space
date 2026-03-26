"use client"

import React, { useState, useRef, useEffect } from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable,
    RowSelectionState,
} from '@tanstack/react-table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    Edit, Trash2, Search, ChevronLeft, ChevronRight,
    ChevronsLeft, ChevronsRight, Package,
    DollarSign, CheckCircle2, ImagePlus, X, AlignLeft, Layers,
    Coins, Loader2, AlertCircle,
} from 'lucide-react'
import axios from "axios"

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = string

const CATEGORIES: Category[] = [
    "Furniture", "kitchen", "Decor", "Lighting", "Bathroom",
    "Home", "Technology", "Floor", "Storage", "Security",
    "Cleaning", "Staircase", "Surveillance"
]

type Product = {
    id: string
    title: string
    price: number
    image: File | null
    description: string
    category: Category
}

async function apiUpdateProduct(product: Product) {
    try{
        const formData = new FormData()
        formData.append('title', product.title)
        formData.append('price', product.price.toString())
        formData.append('description', product.description)
        formData.append('category', product.category)
        if (product.image instanceof File) formData.append('image', product.image)
    
        const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}update-product/${product.id}/change/`, formData, {
            withCredentials: true
        })
        return res.data.data
    }catch(error){
        console.log(error)
    }
    
}

async function apiDeleteProduct(id: string): Promise<void> {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/${id}/remove/`)
    console.log(res.data)
}

async function apiDeleteProducts(ids: string[]): Promise<void> {
    const res = await fetch(`/api/products`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
    })
    if (!res.ok) throw new Error(`Failed to delete products: ${res.statusText}`)
}

// ─── Toast ────────────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error'
type Toast = { id: number; message: string; type: ToastType }

function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 items-end">
            {toasts.map(t => (
                <div
                    key={t.id}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white transition-all
                        ${t.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
                >
                    {t.type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                    <span>{t.message}</span>
                    <button onClick={() => onDismiss(t.id)} className="ml-2 opacity-70 hover:opacity-100">
                        <X size={13} />
                    </button>
                </div>
            ))}
        </div>
    )
}

function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([])
    const counter = useRef(0)

    const push = (message: string, type: ToastType) => {
        const id = ++counter.current
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
    }

    const dismiss = (id: number) => setToasts(prev => prev.filter(t => t.id !== id))

    return { toasts, toast: { success: (m: string) => push(m, 'success'), error: (m: string) => push(m, 'error') }, dismiss }
}

// ─── Indeterminate Checkbox ───────────────────────────────────────────────────

function IndeterminateCheckbox({
    indeterminate,
    ...rest
}: { indeterminate?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (ref.current) ref.current.indeterminate = indeterminate ?? false
    }, [indeterminate])
    return (
        <input
            ref={ref}
            type="checkbox"
            className="w-4 h-4 rounded border-slate-300 cursor-pointer accent-blue-600"
            {...rest}
        />
    )
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, icon, error, children }: {
    label: string
    icon: React.ReactNode
    error?: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-extrabold text-[var(--teal-dark-dark)] mb-4 uppercase tracking-wide">
                {icon}
                {label}
            </label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    )
}

// ─── Image Upload ─────────────────────────────────────────────────────────────

function ImageUpload({ value, onChange, imageData }: {
    value: File | null | string
    onChange: (f: File | null) => void
    imageData: string | File | null | undefined
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        if (!value || !(value instanceof File)) { setPreview(null); return }
        try {
            const url = URL.createObjectURL(value)
            setPreview(url)
            return () => URL.revokeObjectURL(url)
        } catch {
            setPreview(null)
        }
    }, [value])

    const handleFile = (f: File) => {
        if (!f.type.startsWith('image/')) return
        onChange(f)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const f = e.dataTransfer.files[0]
        if (f) handleFile(f)
    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => !preview && inputRef.current?.click()}
            className={`relative rounded-lg border-2 border-dashed transition-colors overflow-hidden
                ${preview ? 'border-slate-200 cursor-default' : 'border-slate-300 hover:border-blue-400 cursor-pointer bg-slate-50 hover:bg-blue-50'}`}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
            />
            {preview ? (
                <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={e => { e.stopPropagation(); inputRef.current?.click() }}
                            className="px-3 py-1.5 rounded-md bg-white text-xs font-medium text-slate-700 shadow hover:bg-gray-100 transition-colors"
                        >
                            Change Image
                        </button>
                    </div>
                </>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    className="relative flex flex-col items-center justify-center gap-2 text-slate-400 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
                >
                    <img
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${imageData}`}
                        alt=""
                        className="object-contain"
                    />
                    <div className="absolute bg-[var(--teal-dark-dark)]/40 p-2">
                        <p className="text-xs text-center px-4">
                            <span className="font-semibold text-white text-md">Click to upload, or drag & drop</span>
                        </p>
                        <p className="text-xs text-white font-bold">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                </div>
            )}
        </div>
    )
}

// ─── Update Drawer ────────────────────────────────────────────────────────────

function UpdateDrawer({ product, onClose, onSuccess, onError }: {
    product: Product | null
    onClose: () => void
    onSuccess: (updated: Product) => void
    onError: (message: string) => void
}) {
    const isOpen = !!product
    const queryClient = useQueryClient()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState<Category>('Other')
    const [image, setImage] = useState<File | null>(null)
    const [errors, setErrors] = useState<Partial<Record<'title' | 'price' | 'description', string>>>({})

    // Sync form when product changes
    useEffect(() => {
        if (product) {
            setTitle(product.title)
            setPrice(product.price.toString())
            setDescription(product.description)
            setCategory(product.category)
            setImage(product.image)
            setErrors({})
        }
    }, [product?.id])

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    const { mutate: saveProduct, isPending: isSaving, isSuccess: isSaved } = useMutation({
        mutationFn: apiUpdateProduct,
        onSuccess: (updated) => {
            queryClient.setQueryData<Product[]>(['products'], prev =>
                prev ? prev.map(p => (p.id === updated.id ? updated : p)) : prev
            )
            onSuccess(updated)
        },
        onError: (err: Error) => {
            onError(err.message || 'Failed to save product.')
        },
    })

    const validate = () => {
        const e: typeof errors = {}
        if (!title.trim()) e.title = 'Title is required.'
        const p = parseFloat(price)
        if (isNaN(p) || p < 0) e.price = 'Enter a valid price.'
        if (!description.trim()) e.description = 'Description is required.'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSave = () => {
        if (!product || !validate()) return
        saveProduct({ ...product, title: title.trim(), price: parseFloat(price), description: description.trim(), category, image })
    }

    const isDirty = product ? (
        title !== product.title ||
        price !== product.price.toString() ||
        description !== product.description ||
        category !== product.category ||
        image !== product.image
    ) : false

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col
                    transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
                    <div>
                        <div className="flex justify-between space-x-30">
                            <h2 className="text-base font-bold text-[var(--teal-dark-dark)]">Edit Product</h2>
                            <h2 className="text-base text-[var(--teal-dark-dark)]">{product?.title.slice(0, 15)}...</h2>
                        </div>
                        {product && <p className="text-xs text-white mt-0.5">ID: {product.id}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md text-white bg-[var(--teal-dark-dark)] hover:bg-[var(--teal-dark-dark)]/70"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Scrollable form body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                    <Field label="Product Image" icon={<ImagePlus size={13} />}>
                        <ImageUpload value={image} onChange={setImage} imageData={product?.image} />
                    </Field>

                    <Field label="Title" icon={<Package size={13} />} error={errors.title}>
                        <input
                            type="text"
                            value={title}
                            onChange={e => { setTitle(e.target.value); setErrors(v => ({ ...v, title: undefined })) }}
                            placeholder="Enter product title…"
                            disabled={isSaving}
                            className={`w-full px-3 py-2.5 text-sm rounded-md border bg-white focus:outline-none focus:ring-2 transition-colors disabled:opacity-60
                                ${errors.title ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-blue-500 focus:border-transparent'}`}
                        />
                    </Field>

                    <Field label="Description" icon={<AlignLeft size={13} />} error={errors.description}>
                        <textarea
                            value={description}
                            onChange={e => { setDescription(e.target.value); setErrors(v => ({ ...v, description: undefined })) }}
                            placeholder="Describe the product…"
                            rows={4}
                            disabled={isSaving}
                            className={`w-full px-3 py-2.5 text-sm rounded-md border bg-white focus:outline-none focus:ring-2 transition-colors resize-none disabled:opacity-60
                                ${errors.description ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-blue-500 focus:border-transparent'}`}
                        />
                    </Field>

                    <Field label="Category" icon={<Layers size={13} />}>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => setCategory(cat)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors disabled:opacity-60
                                        ${category === cat
                                            ? 'bg-[var(--teal-dark-dark)] text-white font-bold'
                                            : 'bg-white text-[var(--teal-dark-dark)] border border-1 border-[var(--teal-dark-dark)] hover:border-[var(--teal-dark-dark)] hover:text-[var(--teal-dark-dark)]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </Field>

                    <Field label="Price (KSh)" icon={<Coins size={13} />} error={errors.price}>
                        <div className="relative space-x-5">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">KSh</span>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={price}
                                onChange={e => { setPrice(e.target.value); setErrors(v => ({ ...v, price: undefined })) }}
                                placeholder="0.00"
                                disabled={isSaving}
                                className={`w-full pl-12 pr-3 py-2.5 text-sm rounded-md border bg-white focus:outline-none focus:ring-2 transition-colors disabled:opacity-60
                                    ${errors.price ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-blue-500 focus:border-transparent'}`}
                            />
                        </div>
                    </Field>
                </div>

                {/* Footer */}
                <div className="shrink-0 flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="px-4 py-2 text-sm rounded-md border border-slate-200 hover:bg-white text-slate-600 transition-colors disabled:opacity-60"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!isDirty || isSaving}
                        className={`flex items-center gap-2 px-5 py-2 text-sm rounded-md font-medium transition-all
                            ${isSaved
                                ? 'bg-green-600 text-white'
                                : isDirty && !isSaving
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        {isSaving
                            ? <><Loader2 size={15} className="animate-spin" /> Saving…</>
                            : isSaved
                                ? <><CheckCircle2 size={15} /> Saved!</>
                                : 'Save Changes'
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

// ─── Delete confirmation dialog ───────────────────────────────────────────────

function DeleteDialog({ count, onConfirm, onCancel, isPending }: {
    count: number
    onConfirm: () => void
    onCancel: () => void
    isPending: boolean
}) {
    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onCancel} />
            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
                <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-full bg-red-50 text-red-600 shrink-0"><AlertCircle size={20} /></div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Delete {count} product{count !== 1 ? 's' : ''}?</h3>
                        <p className="text-sm text-slate-500 mt-1">This action cannot be undone.</p>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        disabled={isPending}
                        className="px-4 py-2 text-sm rounded-md border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-60"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isPending}
                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white font-medium disabled:opacity-60"
                    >
                        {isPending ? <><Loader2 size={14} className="animate-spin" /> Deleting…</> : 'Delete'}
                    </button>
                </div>
            </div>
        </>
    )
}

// ─── Main Table ───────────────────────────────────────────────────────────────

const columnHelper = createColumnHelper<Product>()

export default function ProductTable({ products }: { products: Product[] }) {
    const queryClient = useQueryClient()
    const { toasts, toast, dismiss } = useToast()

    const [data, setData] = useState<Product[]>(products)
    const [globalFilter, setGlobalFilter] = useState('')
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    // Confirm-delete state: null = hidden, 'single' + id, or 'bulk'
    const [deleteTarget, setDeleteTarget] = useState<{ type: 'single'; id: string } | { type: 'bulk'; ids: string[] } | null>(null)

    // Keep local data in sync if parent re-fetches
    useEffect(() => { setData(products) }, [products])

    // ── Single delete mutation ──────────────────────────────────────────────
    const { mutate: deleteOne, isPending: isDeletingOne } = useMutation({
        mutationFn: (id: string) => apiDeleteProduct(id),
        onMutate: async (id) => {
            // Optimistic update
            await queryClient.cancelQueries({ queryKey: ['products'] })
            const snapshot = queryClient.getQueryData<Product[]>(['products'])
            queryClient.setQueryData<Product[]>(['products'], prev => prev?.filter(p => p.id !== id))
            setData(prev => prev.filter(p => p.id !== id))
            return { snapshot }
        },
        onError: (err: Error, _id, ctx) => {
            // Roll back on failure
            if (ctx?.snapshot) {
                queryClient.setQueryData(['products'], ctx.snapshot)
                setData(ctx.snapshot)
            }
            toast.error(err.message || 'Failed to delete product.')
        },
        onSuccess: () => {
            toast.success('Product deleted.')
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onSettled: () => setDeleteTarget(null),
    })

    // ── Bulk delete mutation ────────────────────────────────────────────────
    const { mutate: deleteBulk, isPending: isDeletingBulk } = useMutation({
        mutationFn: (ids: string[]) => apiDeleteProducts(ids),
        onMutate: async (ids) => {
            await queryClient.cancelQueries({ queryKey: ['products'] })
            const snapshot = queryClient.getQueryData<Product[]>(['products'])
            const idSet = new Set(ids)
            queryClient.setQueryData<Product[]>(['products'], prev => prev?.filter(p => !idSet.has(p.id)))
            setData(prev => prev.filter(p => !idSet.has(p.id)))
            setRowSelection({})
            return { snapshot }
        },
        onError: (err: Error, _ids, ctx) => {
            if (ctx?.snapshot) {
                queryClient.setQueryData(['products'], ctx.snapshot)
                setData(ctx.snapshot)
            }
            toast.error(err.message || 'Failed to delete products.')
        },
        onSuccess: (_, ids) => {
            toast.success(`${ids.length} product${ids.length !== 1 ? 's' : ''} deleted.`)
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onSettled: () => setDeleteTarget(null),
    })

    const handleConfirmDelete = () => {
        if (!deleteTarget) return
        if (deleteTarget.type === 'single') deleteOne(deleteTarget.id)
        else deleteBulk(deleteTarget.ids)
    }

    // ── Update handler (called by drawer on success) ────────────────────────
    const handleUpdateSuccess = (updated: Product) => {
        setData(prev => prev.map(p => (p.id === updated.id ? updated : p)))
        toast.success('Product updated successfully.')
    }

    const columns = [
        columnHelper.display({
            id: 'select',
            header: ({ table }) => (
                <IndeterminateCheckbox
                    checked={table.getIsAllPageRowsSelected()}
                    indeterminate={table.getIsSomePageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <IndeterminateCheckbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        }),
        columnHelper.accessor('title', {
            header: 'Product Title',
            cell: info => <span className="font-medium">{info.getValue()}</span>,
        }),
        columnHelper.accessor('category', {
            header: 'Category',
            cell: info => (
                <span className="px-2 py-0.5 rounded-full text-sm font-medium text-[var(--teal-dark-dark)]">
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor('price', {
            header: 'Price',
            cell: info =>
                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES' }).format(info.getValue()),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: props => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setEditingProduct(props.row.original)}
                        className="p-2 hover:bg-[var(--teal-light)] rounded-md text-white bg-[var(--teal-dark-dark)] transition-colors"
                        aria-label="Edit"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => setDeleteTarget({ type: 'single', id: props.row.original.id })}
                        className="p-2 hover:bg-red-100 bg-red-50 rounded-md text-red-600 transition-colors"
                        aria-label="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter, rowSelection },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 15 } },
    })

    const { pageIndex, pageSize } = table.getState().pagination
    const totalRows = table.getFilteredRowModel().rows.length
    const firstRow = pageIndex * pageSize + 1
    const lastRow = Math.min((pageIndex + 1) * pageSize, totalRows)
    const selectedCount = table.getSelectedRowModel().rows.length

    return (
        <>
            <div className="space-y-3">
                <div className="flex items-center justify-around gap-3 flex-wrap">
                    <div className="relative max-w-sm w-3/4">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="search"
                            value={globalFilter}
                            onChange={e => setGlobalFilter(e.target.value)}
                            placeholder="Search products…"
                            className="w-full pl-9 pr-4 py-2 text-md border border-gray-300 rounded-md bg-white focus:border-transparent placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-white text-sm text-[var(--teal-dark-dark)]">
                        <span className="font-medium">{selectedCount} product{selectedCount !== 1 ? 's' : ''} selected</span>
                        {selectedCount > 0 && (
                            <button
                                onClick={() => {
                                    const ids = table.getSelectedRowModel().rows.map(r => r.original.id)
                                    setDeleteTarget({ type: 'bulk', ids })
                                }}
                                className="flex items-center gap-1.5 px-3 py-2 font-bold rounded-md bg-red-600 hover:bg-red-700 text-white text-xs transition-colors"
                            >
                                <Trash2 size={13} /> Delete selected
                            </button>
                        )}
                        {selectedCount > 0 && (
                            <button onClick={() => setRowSelection({})} className="text-xs text-blue-500 hover:text-blue-700 underline">
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex justify-center w-full py-8">
                    <div className="w-full max-w-6xl mx-auto bg-white">
                        <div className="rounded-xl border border-slate-200 overflow-hidden p-2">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-700 uppercase text-xs">
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} className={`px-4 py-3 font-semibold ${header.id === 'select' ? 'w-10' : ''}`}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {table.getRowModel().rows.length > 0 ? (
                                        table.getRowModel().rows.map(row => (
                                            <tr
                                                key={row.id}
                                                className={`transition-colors ${editingProduct?.id === row.original.id
                                                    ? 'bg-blue-50 ring-1 ring-inset ring-blue-200'
                                                    : row.getIsSelected()
                                                        ? 'bg-blue-50 hover:bg-blue-100'
                                                        : 'hover:bg-slate-50'
                                                    }`}
                                            >
                                                {row.getVisibleCells().map(cell => (
                                                    <td key={cell.id} className="px-4 py-3">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400">
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between text-sm text-slate-600 mt-4">
                            <span>
                                {totalRows === 0 ? 'No results' : `${firstRow}–${lastRow} of ${totalRows} product${totalRows !== 1 ? 's' : ''}`}
                            </span>
                            <div className="flex items-center gap-1">
                                <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronsLeft size={16} /></button>
                                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft size={16} /></button>
                                <span className="px-3 py-1 text-xs font-medium">Page {pageIndex + 1} of {table.getPageCount()}</span>
                                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight size={16} /></button>
                                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronsRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide-over drawer */}
            <UpdateDrawer
                product={editingProduct}
                onClose={() => setEditingProduct(null)}
                onSuccess={handleUpdateSuccess}
                onError={toast.error}
            />

            {/* Delete confirmation dialog */}
            {deleteTarget && (
                <DeleteDialog
                    count={deleteTarget.type === 'single' ? 1 : deleteTarget.ids.length}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeleteTarget(null)}
                    isPending={isDeletingOne || isDeletingBulk}
                />
            )}

            {/* Toast notifications */}
            <ToastStack toasts={toasts} onDismiss={dismiss} />
        </>
    )
}