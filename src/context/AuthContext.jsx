import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const BASE_URL = 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
        setLoading(false);
    }, []);

    const login = async (identifier, password) => {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password }),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            return data;
        } else {
            throw new Error(data.message);
        }
    };

    const register = async (name, email, password) => {
        const res = await fetch(`${BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone: email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            // Don't log in yet, wait for OTP
            return data;
        } else {
            throw new Error(data.message);
        }
    };

    const verifyOtp = async (identifier, code) => {
        const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, code }),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            return data;
        } else {
            throw new Error(data.message);
        }
    };

    const forgotPassword = async (identifier) => {
        const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        return data;
    };

    const resetPassword = async (identifier, code, newPassword) => {
        const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, code, newPassword }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, verifyOtp, forgotPassword, resetPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
