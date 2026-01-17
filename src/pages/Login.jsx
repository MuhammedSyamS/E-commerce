import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(identifier, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] animate-fade-in">
            <div className="card-glass w-full max-w-md text-center">
                <h2 className="text-3xl font-serif text-[#d4af37] mb-8">Login</h2>
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Email Address"
                        className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-[#d4af37] outline-none transition-colors"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-[#d4af37] outline-none transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-right">
                        <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-[#d4af37]">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
