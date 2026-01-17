import { Link } from 'react-router-dom';
import { FaTrash, FaArrowRight } from 'react-icons/fa';
import useCart from '../hooks/useCart';

export default function Cart() {
    const { cart, removeFromCart, getCartTotal, clearCart } = useCart();

    // Defensive check: if cart is undefined or not an array
    if (!cart || !Array.isArray(cart)) {
        return (
            <div className="container mx-auto px-6 py-24 text-center animate-fade-in pt-32">
                <h1 className="text-4xl font-serif text-white mb-6">Loading Cart...</h1>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-6 py-24 text-center animate-fade-in pt-32">
                <h1 className="text-4xl font-serif text-white mb-6">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8">Looks like you haven't added any pieces to your collection yet.</p>
                <Link
                    to="/shop"
                    className="inline-block border border-[#d4af37] px-8 py-3 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300 uppercase tracking-widest text-sm"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    // Helper to calculate item total safely
    const getItemTotal = (item) => {
        const price = parseFloat(item.price) || 0;
        const qty = parseInt(item.quantity) || 1;
        return (price * qty).toFixed(2);
    };

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in pt-32">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-12 border-b border-white/10 pb-8">Your Collection</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-8">
                    {cart.map((item) => {
                        // Safe image access
                        const imageSrc = item.images && item.images.length > 0 ? item.images[0] : (item.image || 'https://via.placeholder.com/150');

                        return (
                            <div key={item._id || Math.random()} className="flex gap-6 p-6 border border-white/5 bg-white/5 backdrop-blur-sm rounded-sm hover:border-[#d4af37]/30 transition-colors">
                                <div className="w-24 h-32 flex-shrink-0 bg-gray-800 overflow-hidden">
                                    <img
                                        src={imageSrc}
                                        alt={item.name || 'Product'}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-serif text-white">{item.name || 'Unnamed Product'}</h3>
                                            <button
                                                onClick={() => item._id && removeFromCart(item._id)}
                                                className="text-gray-500 hover:text-red-400 transition-colors"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4">{item.category}</p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="text-gray-400 text-sm">
                                            Quantity: <span className="text-white ml-2">{item.quantity}</span>
                                        </div>
                                        <div className="text-[#d4af37] text-lg font-serif">
                                            ${getItemTotal(item)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <button
                        onClick={clearCart}
                        className="text-sm text-gray-500 hover:text-white transition-colors underline decoration-gray-700 underline-offset-4 hover:decoration-white"
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm sticky top-24">
                        <h2 className="text-2xl font-serif text-white mb-8">Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-lg text-white">Total</span>
                                <span className="text-2xl font-serif text-[#d4af37]">${getCartTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#d4af37] text-[#1a1a1a] py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2">
                            Proceed to Checkout <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
