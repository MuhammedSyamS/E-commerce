export default function ProductCard({ product }) {
    return (
        <div className="group relative">
            <div className="aspect-[3/4] overflow-hidden bg-gray-900">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
            </div>
            <div className="mt-6 flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-serif text-white group-hover:text-[#d4af37] transition-colors">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-400">{product.category}</p>
                </div>
                <p className="text-lg font-medium text-[#d4af37]">${product.price.toLocaleString()}</p>
            </div>
        </div>
    );
}
