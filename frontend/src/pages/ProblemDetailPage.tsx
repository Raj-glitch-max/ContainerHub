// ════════════════════════════════════════════════════════════════
// Problem Detail Page - Complete Redesign
// Black & White Minimalist with Monaco Editor
// NO AUTHENTICATION REQUIRED
// ════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { Terminal, Play, CheckCircle, XCircle, Clock, Database, ArrowLeft, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Problem {
    id: number;
    title: string;
    slug: string;
    difficulty: string;
    category: string;
    description: string;
    examples: any[];
    constraints: string[];
    test_cases: any[];
}

interface SubmissionResult {
    id: number;
    status: string;
    execution_time?: number;
    memory_used?: number;
    test_results?: any[];
    error_message?: string;
}

const STARTER_CODE = {
    python: `def solution(nums, target):
    # Write your code here
    pass`,
    javascript: `function solution(nums, target) {
    // Write your code here
}`,
    java: `class Solution {
    public int[] solution(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`
};

export default function ProblemDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState<'python' | 'javascript' | 'java'>('python');
    const [code, setCode] = useState(STARTER_CODE.python);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<SubmissionResult | null>(null);

    useEffect(() => {
        fetchProblem();
    }, [slug]);

    useEffect(() => {
        // Update code when language changes
        setCode(STARTER_CODE[language]);
        setResult(null); // Clear previous results
    }, [language]);

    const fetchProblem = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/v1/problems/${slug}`);
            setProblem(response.data.problem);
        } catch (error) {
            console.error('Error fetching problem:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!problem) return;

        try {
            setSubmitting(true);
            setResult(null);

            // Submit code WITHOUT authentication
            const response = await axios.post(`${API_URL}/api/v1/submissions`, {
                problem_id: problem.id,
                code: code,
                language: language,
            });

            const submissionId = response.data.submission.id;

            // Poll for results
            pollForResult(submissionId);
        } catch (error: any) {
            console.error('Submission error:', error);
            setSubmitting(false);
            setResult({
                id: 0,
                status: 'error',
                error_message: error.response?.data?.error || 'Submission failed. Please try again.',
            });
        }
    };

    const pollForResult = async (submissionId: number) => {
        const maxAttempts = 20;
        let attempts = 0;

        const poll = setInterval(async () => {
            try {
                attempts++;
                const response = await axios.get(`${API_URL}/api/v1/submissions/${submissionId}`);
                const submission = response.data.submission;

                if (submission.status !== 'pending' && submission.status !== 'processing') {
                    clearInterval(poll);
                    setResult(submission);
                    setSubmitting(false);
                }

                if (attempts >= maxAttempts) {
                    clearInterval(poll);
                    setSubmitting(false);
                    setResult({
                        id: submissionId,
                        status: 'error',
                        error_message: 'Submission timeout. Please try again.',
                    });
                }
            } catch (error) {
                clearInterval(poll);
                setSubmitting(false);
            }
        }, 500);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return 'bg-gray-100 text-gray-900';
            case 'medium': return 'bg-gray-800 text-white';
            case 'hard': return 'bg-black text-white';
            default: return 'bg-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'accepted': return 'text-green-600';
            case 'wrong_answer': return 'text-red-600';
            case 'runtime_error': return 'text-orange-600';
            case 'time_limit_exceeded': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-600">Loading problem...</p>
                </div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Problem not found</h2>
                    <Link to="/problems" className="btn-black inline-block">
                        Back to Problems
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link to="/problems" className="text-gray-600 hover:text-black transition">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <div className="flex items-center space-x-3">
                                <h1 className="text-2xl font-bold">{problem.title}</h1>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                                    {problem.difficulty.toUpperCase()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">{problem.category}</p>
                        </div>
                    </div>

                    <Link to="/" className="flex items-center space-x-2 hover:opacity-70 transition">
                        <Terminal className="w-6 h-6" />
                        <span className="font-bold text-gradient">ContainerHub</span>
                    </Link>
                </div>
            </header>

            {/* Main Content - Split Pane */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Problem Description */}
                <div className="w-1/2 border-r border-gray-200 overflow-y-auto p-8">
                    <div className="max-w-3xl">
                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">Problem</h2>
                            <div className="prose prose-gray">
                                <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
                            </div>
                        </div>

                        {/* Examples */}
                        {problem.examples && problem.examples.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Examples</h2>
                                {problem.examples.map((example: any, index: number) => (
                                    <div key={index} className="mb-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                                        <div className="mb-2">
                                            <span className="font-semibold">Input:</span>
                                            <pre className="mt-1 text-gray-800">{JSON.stringify(example.input, null, 2)}</pre>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Output:</span>
                                            <pre className="mt-1 text-gray-800">{JSON.stringify(example.output, null, 2)}</pre>
                                        </div>
                                        {example.explanation && (
                                            <div className="mt-2 text-gray-600">
                                                <span className="font-semibold">Explanation:</span> {example.explanation}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Constraints */}
                        {problem.constraints && problem.constraints.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Constraints</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    {problem.constraints.map((constraint: string, index: number) => (
                                        <li key={index}>{constraint}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="w-1/2 flex flex-col">
                    {/* Language Selector */}
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {(['python', 'javascript', 'java'] as const).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${language === lang
                                            ? 'bg-black text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className={`btn-black flex items-center space-x-2 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    <span>Running...</span>
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                    <span>Submit Code</span>
                                </>
                            )}
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
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                            }}
                        />
                    </div>

                    {/* Results Panel */}
                    {result && (
                        <div className="border-t border-gray-200 bg-gray-50 p-6 max-h-64 overflow-y-auto">
                            <div className="flex items-center space-x-3 mb-4">
                                {result.status === 'accepted' ? (
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-600" />
                                )}
                                <h3 className={`text-xl font-bold ${getStatusColor(result.status)}`}>
                                    {result.status.replace('_', ' ').toUpperCase()}
                                </h3>
                            </div>

                            {result.error_message && (
                                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-red-800 font-mono text-sm">{result.error_message}</p>
                                </div>
                            )}

                            {result.execution_time !== undefined && (
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">Runtime</span>
                                        </div>
                                        <p className="text-2xl font-bold">{result.execution_time}ms</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                                            <Database className="w-4 h-4" />
                                            <span className="text-sm">Memory</span>
                                        </div>
                                        <p className="text-2xl font-bold">{result.memory_used}MB</p>
                                    </div>
                                </div>
                            )}

                            {result.test_results && result.test_results.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2">Test Cases</h4>
                                    <div className="space-y-2">
                                        {result.test_results.map((test: any, index: number) => (
                                            <div key={index} className="flex items-center space-x-2 text-sm">
                                                {test.passed ? (
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-red-600" />
                                                )}
                                                <span className={test.passed ? 'text-green-700' : 'text-red-700'}>
                                                    Test Case {index + 1}: {test.passed ? 'Passed' : 'Failed'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
