import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Ensure it's an array and filter out nulls/non-objects immediately
                const safeCart = Array.isArray(parsedCart) ? parsedCart.filter(item => item && typeof item === 'object') : [];
                setCart(safeCart);
            } catch (error) {
                console.error("Failed to parse cart from local storage", error);
                setCart([]);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        if (!product || !product._id) return;
        setCart((prevCart) => {
            const safeCart = Array.isArray(prevCart) ? prevCart : [];
            const existingItem = safeCart.find((item) => item._id === product._id);
            if (existingItem) {
                return safeCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            return [...safeCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const safeCart = Array.isArray(prevCart) ? prevCart : [];
            return safeCart.filter((item) => item._id !== productId);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        if (!Array.isArray(cart)) return 0;
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.quantity) || 1;
            return total + price * qty;
        }, 0);
    };

    const getCartCount = () => {
        if (!Array.isArray(cart)) return 0;
        return cart.reduce((count, item) => count + (parseInt(item.quantity) || 0), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
