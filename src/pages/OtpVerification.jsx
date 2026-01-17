import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function OtpVerification() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const { verifyOtp } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const identifier = location.state?.identifier;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp(identifier, code);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] animate-fade-in">
            <div className="card-glass w-full max-w-md text-center">
                <h2 className="text-3xl font-serif text-[#d4af37] mb-4">Verification</h2>
                <p className="text-gray-400 mb-8 text-sm">Enter the code sent to {identifier}</p>

                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="OTP Code"
                        className="w-full bg-transparent border border-white/20 p-3 text-white text-center tracking-[0.5em] text-xl focus:border-[#d4af37] outline-none transition-colors"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button type="submit" className="btn-primary w-full">
                        Verify Account
                    </button>
                </form>
            </div>
        </div>
    );
}
