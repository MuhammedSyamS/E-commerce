import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f5] font-sans selection:bg-[#d4af37] selection:text-[#1a1a1a] flex flex-col">
            <Header />
            <main className="flex-grow pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}
