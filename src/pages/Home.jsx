import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-[128px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-[96px]"></div>
            </div>

            <div className={`container mx-auto px-6 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <h2 className="text-sm md:text-base text-[#d4af37] uppercase tracking-[0.4em] mb-4">Est. 2024</h2>
                <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight text-white">
                    Redefining <br />
                    <span className="italic text-[#d4af37]">Excellence</span>
                </h1>
                <p className="max-w-md mx-auto text-gray-400 mb-12 leading-relaxed font-light">
                    Crafting the extraordinary for the exceptional. Experience the pinnacle of modern luxury and timeless design.
                </p>
                <Link to="/shop" className="btn-primary inline-block">
                    Explore Collection
                </Link>
            </div>
        </div>
    );
}
