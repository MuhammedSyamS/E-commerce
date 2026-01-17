import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ForgotPassword() {
    const [identifier, setIdentifier] = useState('');
    const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify & Reset
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { forgotPassword, resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(identifier);
            setStep(2);
            setMessage('OTP sent to your email/phone.');
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(identifier, code, newPassword);
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] animate-fade-in">
            <div className="card-glass w-full max-w-md text-center">
                <h2 className="text-3xl font-serif text-[#d4af37] mb-8">Account Recovery</h2>
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                {message && <p className="text-green-500 mb-4 text-sm">{message}</p>}

                {step === 1 ? (
                    <form onSubmit={handleRequestOtp} className="space-y-6">
                        <p className="text-gray-400 text-xs">Enter your registered email or phone number to receive an OTP.</p>
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-[#d4af37] outline-none transition-colors"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                        <button type="submit" className="btn-primary w-full">
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <input
                            type="text"
                            placeholder="Enter OTP Code"
                            className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-[#d4af37] outline-none transition-colors"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-[#d4af37] outline-none transition-colors"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button type="submit" className="btn-primary w-full">
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
