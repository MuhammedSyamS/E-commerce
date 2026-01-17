import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in text-white">
            <h1 className="text-3xl font-serif text-[#d4af37] mb-8">Admin Dashboard</h1>

            <div className="mb-12">
                <h2 className="text-xl mb-4 font-light">Product Management</h2>
                <div className="overflow-x-auto bg-white/5 rounded-lg border border-white/10">
                    <table className="w-full text-left">
                        <thead className="bg-white/10 text-[#d4af37] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-sm">
                            {products.map(product => (
                                <tr key={product._id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4">${product.price}</td>
                                    <td className="p-4">{product.category}</td>
                                    <td className="p-4">{product.stock}</td>
                                    <td className="p-4">
                                        <button className="text-[#d4af37] hover:underline mr-4">Edit</button>
                                        <button className="text-red-400 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
