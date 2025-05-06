'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type CartItem = {
	id: number
	name: string
	price: number
	img: string
	quantity: number
}

type CartContextType = {
	items: CartItem[]
	addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
	updateQty: (id: number, qty: number) => void
	clear: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([])

	function addItem(item: Omit<CartItem, 'quantity'>, qty = 1) {
		setItems((curr) => {
			const existing = curr.find((i) => i.id === item.id)
			if (existing) {
				return curr.map((i) =>
					i.id === item.id
						? { ...i, quantity: i.quantity + qty }
						: i
				)
			}
			return [...curr, { ...item, quantity: qty }]
		})
	}

	function updateQty(id: number, qty: number) {
		setItems((curr) =>
			curr
				.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
				.filter((i) => i.quantity > 0)
		)
	}

	function clear() {
		setItems([])
	}

	return (
		<CartContext.Provider value={{ items, addItem, updateQty, clear }}>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const ctx = useContext(CartContext)
	if (!ctx) throw new Error('useCart must be inside CartProvider')
	return ctx
}
