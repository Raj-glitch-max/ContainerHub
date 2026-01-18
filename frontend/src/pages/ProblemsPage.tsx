// ════════════════════════════════════════════════════════════════
// Problems Page - LeetCode-Style with Topic Filtering
// ════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Filter, Search, Code2, Target } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Problem {
    id: number;
    title: string;
    slug: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    acceptance_rate: string;
}

const TOPICS = [
    'All Topics',
    'Arrays',
    'Strings',
    'Linked Lists',
    'Trees',
    'Graphs',
    'Dynamic Programming',
    'Stack',
    'Queue',
    'Hash Table',
    'Binary Search',
    'Sorting',
    'Math',
    'Bit Manipulation',
];

export default function ProblemsPage() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedTopic, setSelectedTopic] = useState('All Topics');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/problems`);
            setProblems(response.data.problems || []);
        } catch (error) {
            console.error('Failed to fetch problems:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter problems
    const filteredProblems = problems.filter(problem => {
        const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
        const matchesTopic = selectedTopic === 'All Topics' || problem.category === selectedTopic;
        const matchesSearch = searchQuery === '' ||
            problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDifficulty && matchesTopic && matchesSearch;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'text-green-600 bg-green-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'hard': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <Terminal className="w-8 h-8" />
                        <span className="text-2xl font-bold">ContainerHub</span>
                    </Link>
                    <div className="flex items-center space-x-6">
                        <Link to="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
                        <Link to="/leaderboard" className="text-gray-600 hover:text-black">Leaderboard</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-5xl font-black mb-2">Problems</h1>
                    <p className="text-xl text-gray-600">
                        {filteredProblems.length} problems • Practice makes perfect
                    </p>
                </div>

                {/* Filters */}
                <div className="space-y-6 mb-8">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search problems by name or topic..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        />
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <Filter className="w-5 h-5" />
                            <span className="font-medium">Difficulty</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['all', 'easy', 'medium', 'hard'].map(diff => (
                                <button
                                    key={diff}
                                    onClick={() => setSelectedDifficulty(diff)}
                                    className={`px-4 py-2 rounded-lg font-medium capitalize ${selectedDifficulty === diff
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                >
                                    {diff}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Topic Filter */}
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <Code2 className="w-5 h-5" />
                            <span className="font-medium">Topic</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {TOPICS.map(topic => (
                                <button
                                    key={topic}
                                    onClick={() => setSelectedTopic(topic)}
                                    className={`px-4 py-2 rounded-lg font-medium ${selectedTopic === topic
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Problems List */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading problems...</p>
                    </div>
                ) : filteredProblems.length === 0 ? (
                    <div className="text-center py-20">
                        <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-xl font-bold mb-2">No problems found</p>
                        <p className="text-gray-600">Try adjusting your filters</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredProblems.map((problem) => (
                            <Link
                                key={problem.id}
                                to={`/problems/${problem.slug}`}
                                className="block neu-card p-6 hover-lift"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                                        <div className="flex items-center space-x-3 text-sm">
                                            <span className={`px-3 py-1 rounded-full font-medium capitalize ${getDifficultyColor(problem.difficulty)}`}>
                                                {problem.difficulty}
                                            </span>
                                            <span className="text-gray-600">{problem.category}</span>
                                            {problem.acceptance_rate && (
                                                <span className="text-gray-500">
                                                    {Number(problem.acceptance_rate).toFixed(0)}% acceptance
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
