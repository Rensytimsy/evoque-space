"use client"

import React, { createContext, useState, FC, ReactNode } from 'react';

export interface ProductData {
    id?: string | number | null;
    title: string ;
    price: number;
    category: string,
    tag: string | any,
    img: string,
    desc: string
}

interface CartItem extends ProductData {
    quantity: number;
}   

interface CartContextType {
    cart: CartItem[] | null;
    checkout: boolean;
    addToCart: (product: ProductData, quantity?: number) => void;
    removeFromCart: (productId: string | number) => void;
    updateQuantity: (productId: string | number, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemsCount: () => number;
    setCheckout: (status: boolean) => void;
}

const ShoppingCartContext = createContext<CartContextType | null>(null);

const ShoppingCartContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [checkout, setCheckout] = useState<boolean>(false);

    const addToCart = (product: ProductData, quantity: number = 1) => {
        console.log(product.title)
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            
            const newItem: CartItem = {
                ...product,
                quantity: quantity,
                id: product.id || Date.now(),
                title: product.title || '',
                price: product.price || 0
            };
            
            return [...prevCart, newItem];
        });
    };

    const removeFromCart = (productId: string | number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string | number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        setCheckout(false);
    };

    const getCartTotal = (): number => {
        return cart.reduce((total, item) => {
            const itemPrice = typeof item.price === 'string' 
                ? parseFloat(item.price) 
                : item.price || 0;
            return total + (itemPrice * item.quantity);
        }, 0);
    };

    const getCartItemsCount = (): number => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const value: CartContextType = {
        cart,
        checkout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        setCheckout
    };

    // This is correct - ShoppingCartContext is the const from above
    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

// Custom hook for using the cart context
import { useContext } from 'react';

const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    
    if (!context) {
        throw new Error('useShoppingCart must be used within a ShoppingCartContextProvider');
    }
    
    return context;
};

export { ShoppingCartContext, ShoppingCartContextProvider, useShoppingCart };