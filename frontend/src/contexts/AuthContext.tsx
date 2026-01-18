// ════════════════════════════════════════════════════════════════
// Auth Context - REAL JWT Authentication
// ════════════════════════════════════════════════════════════════

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface User {
    id: number;
    email: string;
    username: string;
    email_verified: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (emailOrUsername: string, password: string) => Promise<void>;
    register: (email: string, username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load token from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        }
        setLoading(false);
    }, []);

    const login = async (emailOrUsername: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
                emailOrUsername,
                password,
            });

            const { token: newToken, user: newUser } = response.data;

            // Save to state and localStorage
            setToken(newToken);
            setUser(newUser);
            localStorage.setItem('auth_token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));

            // Set default Authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            toast.success(`Welcome back, ${newUser.username}!`);
        } catch (error: any) {
            const message = error.response?.data?.error || 'Login failed';
            toast.error(message);
            throw error;
        }
    };

    const register = async (email: string, username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/api/v1/auth/register`, {
                email,
                username,
                password,
            });

            toast.success(response.data.message || 'Registration successful! Check your email to verify your account.');
        } catch (error: any) {
            const message = error.response?.data?.error || 'Registration failed';
            toast.error(message);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
