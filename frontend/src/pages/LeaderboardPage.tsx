// ════════════════════════════════════════════════════════════════
// Leaderboard Page - Top Users Ranking
// ════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Award, Terminal, Crown } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface LeaderboardEntry {
    rank: number;
    id: number;
    username: string;
    total_problems_solved: number;
    acceptance_rate: number;
    current_streak: number;
    longest_streak: number;
}

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/stats/leaderboard`);
                setLeaderboard(response.data.leaderboard);
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
        if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
        if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />;
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    };

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
                        <Link to="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h1 className="text-5xl font-black mb-2">Leaderboard</h1>
                    <p className="text-xl text-gray-600">Top coders by problems solved</p>
                </div>

                {/* Leaderboard Table */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading leaderboard...</p>
                    </div>
                ) : leaderboard.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600">No users on the leaderboard yet</p>
                        <p className="text-gray-500 mt-2">Be the first to solve problems!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {leaderboard.map((entry) => (
                            <div
                                key={entry.id}
                                className={`neu-card p-6 flex items-center justify-between hover-lift ${entry.rank <= 3 ? 'border-2 border-yellow-400' : ''
                                    }`}
                            >
                                <div className="flex items-center space-x-6">
                                    {/* Rank */}
                                    <div className="w-12 flex justify-center">
                                        {getRankIcon(entry.rank)}
                                    </div>

                                    {/* Username */}
                                    <div>
                                        <h3 className="text-xl font-bold">{entry.username}</h3>
                                        <p className="text-sm text-gray-500">
                                            {entry.current_streak > 0 && (
                                                <span>🔥 {entry.current_streak} day streak</span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center space-x-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-gradient">
                                            {entry.total_problems_solved}
                                        </div>
                                        <div className="text-xs text-gray-500">Solved</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black">
                                            {entry.acceptance_rate.toFixed(0)}%
                                        </div>
                                        <div className="text-xs text-gray-500">Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-orange-500">
                                            {entry.longest_streak}
                                        </div>
                                        <div className="text-xs text-gray-500">Best Streak</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link to="/problems" className="btn-black inline-flex items-center space-x-2">
                        <span>Start Solving to Rank Up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
