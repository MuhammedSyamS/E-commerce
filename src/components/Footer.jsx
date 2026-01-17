export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white py-20 border-t border-white/10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                    <h3 className="text-2xl font-serif text-[#d4af37] mb-6">LUXE</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Defining the standard of modern luxury since 2024.
                    </p>
                </div>
                <div>
                    <h4 className="uppercase tracking-widest text-xs mb-6 text-gray-500">Shop</h4>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-[#d4af37] transition-colors">Watches</a></li>
                        <li><a href="#" className="hover:text-[#d4af37] transition-colors">Jewelry</a></li>
                        <li><a href="#" className="hover:text-[#d4af37] transition-colors">Leather Goods</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="uppercase tracking-widest text-xs mb-6 text-gray-500">Service</h4>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-[#d4af37] transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-[#d4af37] transition-colors">Shipping</a></li>
                        <li><a href="#" className="hover:text-[#d4af37] transition-colors">Returns</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="uppercase tracking-widest text-xs mb-6 text-gray-500">Newsletter</h4>
                    <div className="flex border-b border-white/20 pb-2">
                        <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none text-sm" />
                        <button className="text-xs uppercase hover:text-[#d4af37] transition-colors">Subscribe</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
