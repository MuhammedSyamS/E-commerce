import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            // Navigate to OTP page with identifier (email)
            navigate('/verify-otp', { state: { identifier: email } });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] animate-fade-in">
            <div className="card-glass w-full max-w-md text-center">
                <h2 className="text-3xl font-serif text-#d4af37 mb-8">Join the Maison</h2>
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-#d4af37 outline-none transition-colors"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-#d4af37 outline-none transition-colors"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-#d4af37 outline-none transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn-primary w-full">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
