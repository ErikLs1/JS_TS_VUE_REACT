"use client";
// CHAT GENERATED
// TODO : CHANGE
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode
} from 'react';

export interface CartItem {
	productId: string;
	name: string;
	price: number;
	quantity: number;
	img?: string;
}

interface CartContextType {
	items: CartItem[];
	addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
	updateQty: (productId: string, qty: number) => void;
	clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within CartProvider');
	return ctx;
};

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);

	// hydrate from localStorage
	useEffect(() => {
		const saved = localStorage.getItem('cart');
		if (saved) setItems(JSON.parse(saved));
	}, []);

	// persist
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(items));
	}, [items]);

	const addItem = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
		setItems(curr => {
			const idx = curr.findIndex(i => i.productId === item.productId);
			if (idx > -1) {
				const copy = [...curr];
				copy[idx].quantity += qty;
				return copy;
			}
			return [...curr, { ...item, quantity: qty }];
		});
	};

	const updateQty = (productId: string, qty: number) => {
		setItems(curr =>
			curr
				.map(i => i.productId === productId ? { ...i, quantity: qty } : i)
				.filter(i => i.quantity > 0)
		);
	};

	const clear = () => setItems([]);

	return (
		<CartContext.Provider value={{ items, addItem, updateQty, clear }}>
			{children}
		</CartContext.Provider>
	);
}
