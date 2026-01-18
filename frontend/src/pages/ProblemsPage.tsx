// ════════════════════════════════════════════════════════════════
// Problems Page - Black & White Minimalist Design
// No Authentication Required
// ════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Filter, Search, Code2 } from 'lucide-react';
import axios from 'axios';
import { Skeleton } from '../components/ui/skeleton';

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
    const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
    const [selectedTopic, setSelectedTopic] = useState<string>('All Topics');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                // NO AUTHENTICATION - public API call
                const response = await axios.get(`${API_URL}/api/v1/problems`);
                setProblems(response.data.problems || []);
            } catch (error) {
                console.error('Failed to fetch problems:', error);
                setProblems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    // Filter problems based on difficulty, topic, and search
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
                        <Link to="/problems" className="text-sm font-semibold border-b-2 border-black pb-1">
                            Problems
                        </Link>
                        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black transition">
                            Home
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
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

                {/* Problems List */ }
    {
        loading ? (
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="neu-card p-6 flex items-center justify-between">
                        <div className="space-y-3 w-full">
                            <div className="flex items-center space-x-3">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </div>
                        <Skeleton className="h-6 w-6 rounded-full ml-4" />
                    </div>
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
        )
    }

    {/* Stats */ }
    <div className="mt-12 text-center text-gray-600">
        <p className="text-lg">
            Showing <span className="font-bold text-black">{filteredProblems.length}</span> of <span className="font-bold text-black">{problems.length}</span> problems
        </p>
    </div>
            </div >
        </div >
    );
}
