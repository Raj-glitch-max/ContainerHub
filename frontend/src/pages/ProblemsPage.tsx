// ════════════════════════════════════════════════════════════════
// Problems Page - Black & White Minimalist Design
// No Authentication Required
// ════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Code2, Filter, Search, ArrowRight, Terminal } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Problem {
    id: number;
    title: string;
    slug: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    acceptance_rate: string;
    tags: string[];
}

export default function ProblemsPage() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            // NO AUTHENTICATION - public API call
            const response = await axios.get(`${API_URL}/api/v1/problems`);
            setProblems(response.data.problems || []);
        } catch (error) {
            console.error('Error fetching problems:', error);
            setProblems([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredProblems = problems.filter(problem => {
        const matchesFilter = filter === 'all' || problem.difficulty === filter;
        const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problem.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-gray-100 text-gray-900';
            case 'medium': return 'bg-gray-800 text-white';
            case 'hard': return 'bg-black text-white';
            default: return 'bg-gray-200 text-gray-900';
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 glass-card border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 hover:opacity-70 transition">
                        <Terminal className="w-8 h-8" />
                        <span className="text-2xl font-bold text-gradient">ContainerHub</span>
                    </Link>
                    <div className="flex items-center space-x-6">
                        <Link to="/problems" className="text-sm font-semibold border-b-2 border-black pb-1">
                            Problems
                        </Link>
                        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black transition">
                            Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12 fade-in">
                    <h1 className="text-5xl font-black mb-4 text-gradient">Coding Problems</h1>
                    <p className="text-xl text-gray-600">Practice and master your coding skills. No login required.</p>
                </div>

                {/* Filters & Search */}
                <div className="mb-8 neu-card p-6 slide-in">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search problems..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition"
                            />
                        </div>

                        {/* Difficulty Filters */}
                        <div className="flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-gray-600" />
                            {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
                                <button
                                    key={diff}
                                    onClick={() => setFilter(diff)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${filter === diff
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Problems List */}
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="skeleton h-24 w-full"></div>
                        ))}
                    </div>
                ) : filteredProblems.length === 0 ? (
                    <div className="text-center py-20">
                        <Code2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No problems found</h3>
                        <p className="text-gray-600">Try adjusting your filters or search term</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredProblems.map((problem, index) => (
                            <Link
                                key={problem.id}
                                to={`/problems/${problem.slug}`}
                                className="block neu-card p-6 hover-lift group"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-xl font-bold group-hover:text-gradient transition">
                                                {problem.title}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                                                {problem.difficulty.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span className="font-medium">{problem.category}</span>
                                            <span>•</span>
                                            <span>Acceptance: {problem.acceptance_rate}%</span>
                                            {problem.tags && problem.tags.length > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <div className="flex items-center space-x-2">
                                                        {problem.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-black group-hover:translate-x-2 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Stats */}
                <div className="mt-12 text-center text-gray-600">
                    <p className="text-lg">
                        Showing <span className="font-bold text-black">{filteredProblems.length}</span> of <span className="font-bold text-black">{problems.length}</span> problems
                    </p>
                </div>
            </div>
        </div>
    );
}
