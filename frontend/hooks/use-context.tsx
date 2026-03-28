"use client"

import React, { createContext, useState, FC, ReactNode, useContext } from 'react';

// Base product data that comes from your shop/API
export type ProductData = {
    id: string | number;
    title: string;
    price: number | string;
    image: string;
    category?: string;      
    tag?: string;         
    description?: string;   
}


interface CartItem extends ProductData {
    quantity: number;
    price: number; 
}

interface CartContextType {
    cart: CartItem[];
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

export const ShoppingCartContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [checkout, setCheckout] = useState<boolean>(false);

    // Helper to ensure price is a number
    const normalizePrice = (price: number | string): number => {
        return typeof price === 'string' ? parseFloat(price) : price;
    };

    const addToCart = (product: ProductData, quantity: number = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            
            if (existingItem) {
                // Update existing item
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            
            // Create new cart item with normalized price
            const newItem: CartItem = {
                id: product.id,
                title: product.title,
                price: normalizePrice(product.price), // Ensure price is number
                image: product.image,
                quantity: quantity,
                // Include optional fields if they exist
                ...(product.category && { category: product.category }),
                ...(product.tag && { tag: product.tag }),
                ...(product.description && { description: product.description })
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
            const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price as any);
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

    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

// Custom hook for using the cart context
export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    
    if (!context) {
        throw new Error('useShoppingCart must be used within a ShoppingCartContextProvider');
    }
    
    return context;
};


interface UserData {
    username: string,
    isAdmin: boolean,
    email: string,
    avatar: string
}

interface UserDataContext extends UserData {
    isLoggedIn: boolean,
}


const UserContext = createContext<UserDataContext | null>(null)

const initial_state:UserDataContext = {
    username: "",
    isAdmin: false,
    email: "",
    avatar: "",
    isLoggedIn: false
}
