// ════════════════════════════════════════════════════════════════
// Landing/Home Page - Complete with User Guide
// Pure Black & White Minimalist Perfection
// ════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { Code2, Zap, Trophy, ArrowRight, Github, Terminal, BookOpen, Play, CheckCircle } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-card fade-in">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Terminal className="w-8 h-8" />
                        <span className="text-2xl font-bold text-gradient">ContainerHub</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/problems" className="btn-black">
                            Start Solving
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="scale-in mb-6 inline-block">
                        <div className="glass-card-dark px-4 py-2 rounded-full inline-flex items-center space-x-2">
                            <Zap className="w-4 h-4 animate-pulse" />
                            <span className="text-sm font-medium">100% Free - No Login Required</span>
                        </div>
                    </div>
                    <h1 className="mb-6 fade-in">
                        Master Coding
                        <br />
                        <span className="text-gradient">In Pure Minimalism</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto fade-in">
                        A minimal, distraction-free platform for practicing coding problems.
                        <br />
                        Pure black & white. No noise. Just code.
                    </p>
                    <div className="flex items-center justify-center space-x-4 slide-in">
                        <Link to="/problems" className="btn-black flex items-center space-x-2 text-lg px-8 py-4">
                            <Play className="w-5 h-5" />
                            <span>Start Now</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="https://github.com/Raj-glitch-max/ContainerHub" target="_blank" rel="noopener noreferrer" className="btn-white flex items-center space-x-2 text-lg px-8 py-4">
                            <Github className="w-5 h-5" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* How It Works - Step by Step Guide */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <BookOpen className="w-12 h-12 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold mb-4 text-gradient">How to Use</h2>
                        <p className="text-xl text-gray-600">Get started in 3 simple steps. No account needed.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                1
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Browse Problems</h3>
                            <p className="text-gray-600 mb-4">
                                Click "Start Solving" to see all coding challenges. Filter by difficulty (Easy, Medium, Hard) or search for specific topics.
                            </p>
                            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                                <p className="text-sm text-gray-500 mb-2">Example:</p>
                                <p className="font-mono text-sm">"Two Sum" - Easy</p>
                                <p className="font-mono text-sm">"Valid Parentheses" - Easy</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                2
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Write Your Code</h3>
                            <p className="text-gray-600 mb-4">
                                Select a problem and start coding immediately. Use our Monaco editor with syntax highlighting for Python, JavaScript, or Java.
                            </p>
                            <div className="bg-black p-4 rounded-lg text-white font-mono text-sm text-left">
                                <div className="text-green-400"># Python example</div>
                                <div>def twoSum(nums, target):</div>
                                <div className="pl-4">return [0, 1]</div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                3
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Get Instant Results</h3>
                            <p className="text-gray-600 mb-4">
                                Click "Submit" and see your results instantly. View which test cases passed, execution time, and memory usage.
                            </p>
                            <div className="bg-white p-4 rounded-lg border-2 border-green-500">
                                <div className="flex items-center space-x-2 text-green-600 mb-2">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-bold">Accepted</span>
                                </div>
                                <p className="text-sm text-gray-600">Runtime: 45ms</p>
                                <p className="text-sm text-gray-600">Memory: 14.2MB</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/problems" className="btn-black inline-flex items-center space-x-2">
                            <span>Try It Now</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gradient">Why ContainerHub?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="neu-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Professional Code Editor</h3>
                            <p className="text-gray-600">
                                Monaco-powered editor (same as VS Code) with syntax highlighting, auto-completion, and IntelliSense.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="neu-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Instant Execution</h3>
                            <p className="text-gray-600">
                                Run your code instantly with real-time feedback. See test results in milliseconds with detailed error messages.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="neu-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
                            <p className="text-gray-600">
                                Monitor your solving streak, acceptance rate, and see detailed statistics for every submission.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2">150+</div>
                            <div className="text-gray-400">Coding Problems</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">10K+</div>
                            <div className="text-gray-400">Solutions Submitted</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">3</div>
                            <div className="text-gray-400">Languages (Python, JS, Java)</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">100%</div>
                            <div className="text-gray-400">Free & Open Source</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-6 text-gradient">
                        Ready to Code?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        No sign-up. No distractions. Just pure coding practice.
                    </p>
                    <Link to="/problems" className="btn-black text-lg px-8 py-4 inline-flex items-center space-x-2">
                        <Play className="w-6 h-6" />
                        <span>Start Solving Now</span>
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                    <p className="mt-6 text-sm text-gray-500">
                        <strong>Completely free.</strong> No credit card. No email. No bullshit.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-12 px-6">
                <div className="max-w-7xl mx-auto text-center text-gray-600">
                    <div className="flex items-center justify-center space-x-6 mb-4">
                        <a href="https://github.com/Raj-glitch-max/ContainerHub" target="_blank" rel="noopener noreferrer" className="hover:text-black transition flex items-center space-x-2">
                            <Github className="w-5 h-5" />
                            <span>GitHub</span>
                        </a>
                        <span>•</span>
                        <Link to="/problems" className="hover:text-black transition">
                            Problems
                        </Link>
                        <span>•</span>
                        <span className="font-mono text-sm">Made with ♥ by Raj</span>
                    </div>
                    <p className="text-sm">© 2026 ContainerHub. Pure. Minimal. Powerful.</p>
                </div>
            </footer>
        </div>
    );
}
