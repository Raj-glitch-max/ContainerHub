// ════════════════════════════════════════════════════════════════
// API Client for Backend Communication
// ════════════════════════════════════════════════════════════════

import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: `${API_URL}/api/v1`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Token expired, try to refresh
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const response = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
                        refreshToken,
                    });

                    const { accessToken } = response.data;
                    localStorage.setItem('accessToken', accessToken);

                    // Retry original request
                    if (error.config) {
                        error.config.headers.Authorization = `Bearer ${accessToken}`;
                        return axios.request(error.config);
                    }
                } catch (refreshError) {
                    // Refresh failed, logout user
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;

// ────────────────────────────────────────────────────────────────
// Auth API
// ────────────────────────────────────────────────────────────────

export interface RegisterData {
    email: string;
    username: string;
    password: string;
    full_name?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    full_name?: string;
    bio?: string;
    profile_picture_url?: string;
    skill_level: string;
    total_problems_solved: number;
    acceptance_rate: number;
    current_streak: number;
    email_verified: boolean;
    role: string;
    created_at: string;
}

export const authAPI = {
    register: async (data: RegisterData) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    login: async (data: LoginData) => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    getCurrentUser: async (): Promise<{ user: User }> => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    refreshToken: async (refreshToken: string) => {
        const response = await api.post('/auth/refresh', { refreshToken });
        return response.data;
    },
};
