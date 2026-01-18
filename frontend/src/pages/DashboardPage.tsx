// ════════════════════════════════════════════════════════════════
// Dashboard Page - User Stats & Progress
// ════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Target, Flame, TrendingUp, Terminal, LogOut } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface UserStats {
    total_problems_solved: number;
    acceptance_rate: number;
    current_streak: number;
    longest_streak: number;
}

export default function DashboardPage() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/stats/me`);
                setStats(response.data.stats);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your stats...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <nav className="border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <Terminal className="w-8 h-8" />
                        <span className="text-2xl font-bold">ContainerHub</span>
                    </Link>
                    <div className="flex items-center space-x-6">
                        <Link to="/problems" className="text-gray-600 hover:text-black">Problems</Link>
                        <Link to="/leaderboard" className="text-gray-600 hover:text-black">Leaderboard</Link>
                        <button onClick={handleLogout} className="btn-white flex items-center space-x-2">
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Welcome */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black mb-2">Welcome back, {user?.username}! 👋</h1>
                    <p className="text-xl text-gray-600">Here's your coding journey</p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    {/* Problems Solved */}
                    <div className="neu-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Trophy className="w-8 h-8 text-yellow-500" />
                            <span className="text-3xl font-black">{stats?.total_problems_solved || 0}</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Problems Solved</p>
                    </div>

                    {/* Current Streak */}
                    <div className="neu-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Flame className="w-8 h-8 text-orange-500" />
                            <span className="text-3xl font-black">{stats?.current_streak || 0}</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Day Streak 🔥</p>
                    </div>

                    {/* Best Streak */}
                    <div className="neu-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Target className="w-8 h-8 text-blue-500" />
                            <span className="text-3xl font-black">{stats?.longest_streak || 0}</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Best Streak</p>
                    </div>

                    {/* Acceptance Rate */}
                    <div className="neu-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <TrendingUp className="w-8 h-8 text-green-500" />
                            <span className="text-3xl font-black">{stats?.acceptance_rate?.toFixed(0) || 0}%</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Acceptance Rate</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Link to="/problems" className="neu-card p-8 hover-lift group">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient">Continue Solving</h3>
                        <p className="text-gray-600">Browse all coding problems and keep your streak alive</p>
                    </Link>

                    <Link to="/leaderboard" className="neu-card p-8 hover-lift group">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient">View Leaderboard</h3>
                        <p className="text-gray-600">See how you rank against other coders</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
