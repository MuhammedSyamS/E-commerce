import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Collections</h1>
                    <p className="text-gray-400 max-w-md">Curated pieces for the discerning individual.</p>
                </div>
                <div className="hidden md:block text-gray-500 text-sm">
                    Showing {products.length} Results
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
