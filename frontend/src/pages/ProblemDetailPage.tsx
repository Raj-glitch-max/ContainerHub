import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Editor from '@monaco-editor/react';
import api from '../services/api';

interface Problem {
    id: number;
    title: string;
    slug: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    constraints: string[];
    examples: Array<{ input: string; output: string; explanation?: string }>;
    starter_code: { [key: string]: string };
    category: string;
    tags: string[];
    acceptance_rate: number;
    time_limit_ms: number;
    memory_limit_mb: number;
}

export default function ProblemDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [submitting, setSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<any>(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchProblem();
        }
    }, [slug]);

    useEffect(() => {
        if (problem?.starter_code) {
            setCode(problem.starter_code[language] || '');
        }
    }, [problem, language]);

    const fetchProblem = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/problems/${slug}`);
            setProblem(response.data.problem);
        } catch (error) {
            console.error('Failed to fetch problem:', error);
            navigate('/problems');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!problem) return;

        setSubmitting(true);
        setShowResults(false);

        try {
            // Submit code
            const response = await api.post('/submissions', {
                problem_id: problem.id,
                code,
                language,
            });

            const submissionId = response.data.submission.id;

            // Poll for results
            let attempts = 0;
            const maxAttempts = 20; // 20 seconds max
            const pollInterval = setInterval(async () => {
                attempts++;

                try {
                    const resultResponse = await api.get(`/submissions/${submissionId}`);
                    const submission = resultResponse.data.submission;

                    if (submission.status !== 'pending' && submission.status !== 'running') {
                        clearInterval(pollInterval);
                        setSubmissionResult(submission);
                        setShowResults(true);
                        setSubmitting(false);
                    }

                    if (attempts >= maxAttempts) {
                        clearInterval(pollInterval);
                        setSubmitting(false);
                        alert('Submission is taking longer than expected. Please check your submissions later.');
                    }
                } catch (error) {
                    console.error('Error fetching submission result:', error);
                    clearInterval(pollInterval);
                    setSubmitting(false);
                }
            }, 1000);
        } catch (error: any) {
            console.error('Submission error:', error);
            alert(error.response?.data?.error || 'Failed to submit code');
            setSubmitting(false);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'text-green-600 bg-green-50';
            case 'medium':
                return 'text-yellow-600 bg-yellow-50';
            case 'hard':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading problem...</p>
                </div>
            </div>
        );
    }

    if (!problem) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link to="/" className="text-2xl font-bold text-indigo-600">
                                🚀 ContainerHub
                            </Link>
                            <Link to="/problems" className="text-gray-700 hover:text-indigo-600 font-medium">
                                ← Back to Problems
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Hello, {user?.username}!</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content - Split View */}
            <div className="flex h-[calc(100vh-4rem)]">
                {/* Left Panel - Problem Description */}
                <div className="w-1/2 overflow-y-auto bg-white border-r">
                    <div className="p-6">
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                                    {problem.difficulty}
                                </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>Category: {problem.category}</span>
                                <span>•</span>
                                <span>Acceptance: {problem.acceptance_rate.toFixed(1)}%</span>
                            </div>
                        </div>

                        <div className="prose max-w-none">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-700 whitespace-pre-line mb-6">{problem.description}</p>

                            {problem.examples && problem.examples.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3">Examples</h3>
                                    {problem.examples.map((example, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-lg p-4 mb-3">
                                            <div className="mb-2">
                                                <strong>Input:</strong> <code className="text-sm bg-gray-200 px-2 py-1 rounded">{example.input}</code>
                                            </div>
                                            <div className="mb-2">
                                                <strong>Output:</strong> <code className="text-sm bg-gray-200 px-2 py-1 rounded">{example.output}</code>
                                            </div>
                                            {example.explanation && (
                                                <div className="text-sm text-gray-600">
                                                    <strong>Explanation:</strong> {example.explanation}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {problem.constraints && problem.constraints.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Constraints</h3>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {problem.constraints.map((constraint, idx) => (
                                            <li key={idx} className="mb-1">{constraint}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2 text-sm text-blue-800">
                                    <span>⏱️ Time limit: {problem.time_limit_ms}ms</span>
                                    <span>•</span>
                                    <span>💾 Memory limit: {problem.memory_limit_mb}MB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="w-1/2 flex flex-col bg-gray-900">
                    {/* Editor Header */}
                    <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="python">Python</option>
                            <option value="javascript">JavaScript</option>
                            <option value="java">Java</option>
                        </select>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Submitting...' : 'Submit Code'}
                        </button>
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            language={language}
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                rulers: [80],
                                wordWrap: 'on',
                                automaticLayout: true,
                            }}
                        />
                    </div>

                    {/* Results Panel */}
                    {showResults && submissionResult && (
                        <div className="bg-gray-800 border-t border-gray-700 p-4 overflow-y-auto max-h-64">
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-white font-semibold text-lg">Submission Result</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${submissionResult.status === 'accepted' ? 'bg-green-500 text-white' :
                                            submissionResult.status === 'wrong_answer' ? 'bg-red-500 text-white' :
                                                submissionResult.status === 'runtime_error' ? 'bg-orange-500 text-white' :
                                                    'bg-gray-500 text-white'
                                        }`}>
                                        {submissionResult.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                    <span>Tests: {submissionResult.passed_test_count}/{submissionResult.total_test_count}</span>
                                    <span>•</span>
                                    <span>Time: {submissionResult.execution_time_ms}ms</span>
                                    <span>•</span>
                                    <span>Memory: {submissionResult.memory_used_mb}MB</span>
                                </div>
                            </div>

                            {submissionResult.error_message && (
                                <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded p-3 mb-3">
                                    <p className="text-red-300 text-sm font-mono">{submissionResult.error_message}</p>
                                </div>
                            )}

                            {submissionResult.test_results && submissionResult.test_results.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-gray-300 font-medium text-sm mb-2">Test Cases:</h4>
                                    {submissionResult.test_results.slice(0, 5).map((test: any, idx: number) => (
                                        <div key={idx} className={`p-2 rounded text-sm ${test.passed ? 'bg-green-900 bg-opacity-30 border border-green-500' : 'bg-red-900 bg-opacity-30 border border-red-500'
                                            }`}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={test.passed ? 'text-green-300' : 'text-red-300'}>
                                                    Test Case {idx + 1}: {test.passed ? '✓ Passed' : '✗ Failed'}
                                                </span>
                                            </div>
                                            <div className="text-gray-400 text-xs font-mono">
                                                <div>Input: {JSON.stringify(test.input)}</div>
                                                {!test.passed && (
                                                    <>
                                                        <div>Output: {JSON.stringify(test.output)}</div>
                                                        <div>Expected: {JSON.stringify(test.expected)}</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
