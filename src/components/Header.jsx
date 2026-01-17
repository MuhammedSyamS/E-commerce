import { Link } from 'react-router-dom';
import { FaShoppingBag, FaSearch, FaUser } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

export default function Header() {
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();
    return (
        <nav className="fixed w-full p-6 z-50 mix-blend-difference flex justify-between items-center animate-fade-in text-white">
            <Link to="/" className="text-2xl font-serif tracking-widest text-[#d4af37]">LUXE</Link>
            <div className="space-x-8 text-sm tracking-widest uppercase hidden md:block">
                <Link to="/shop" className="hover:text-[#d4af37] transition-colors duration-300">Collections</Link>
                <Link to="/atelier" className="hover:text-[#d4af37] transition-colors duration-300">Atelier</Link>
                <Link to="/maison" className="hover:text-[#d4af37] transition-colors duration-300">Maison</Link>
            </div>
            <div className="flex items-center space-x-6">
                <button className="hover:text-[#d4af37] transition-colors"><FaSearch /></button>
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-xs uppercase tracking-widest">{user.name}</span>
                        <button onClick={logout} className="text-xs hover:text-[#d4af37] uppercase tracking-widest">Logout</button>
                        {user.isAdmin && <Link to="/admin" className="text-xs hover:text-[#d4af37] uppercase tracking-widest">Admin</Link>}
                    </div>
                ) : (
                    <div className="flex items-center gap-4 text-xs uppercase tracking-widest">
                        <Link to="/login" className="hover:text-[#d4af37] transition-colors">Login</Link>
                        <span className="text-white/20">|</span>
                        <Link to="/register" className="hover:text-[#d4af37] transition-colors">Sign Up</Link>
                    </div>
                )}
                <Link to="/cart" className="border border-[#d4af37] px-6 py-2 uppercase text-xs tracking-[0.2em] hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300 flex items-center gap-2">
                    Cart ({getCartCount()}) <FaShoppingBag />
                </Link>
            </div>
        </nav>
    );
}
