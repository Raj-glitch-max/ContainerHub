// ════════════════════════════════════════════════════════════════
// Landing/Home Page - No Login Required
// Pure Black & White Minimalist Perfection
// ════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { Code2, Zap, Users, Trophy, ArrowRight, Github, Terminal } from 'lucide-react';

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
                        <Link to="/problems" className="text-sm font-medium hover:opacity-70 transition">
                            Problems
                        </Link>
                        <Link to="/leaderboard" className="text-sm font-medium hover:opacity-70 transition">
                            Leaderboard
                        </Link>
                        <a href="https://github.com/Raj-glitch-max/ContainerHub" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:opacity-70 transition flex items-center space-x-1">
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="scale-in mb-6 inline-block">
                        <div className="glass-card-dark px-4 py-2 rounded-full inline-flex items-center space-x-2">
                            <Zap className="w-4 h-4 animate-pulse" />
                            <span className="text-sm font-medium">Open Beta - No Login Required</span>
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
                        <Link to="/problems" className="btn-black flex items-center space-x-2">
                            <span>Start Solving</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="https://github.com/Raj-glitch-max/ContainerHub" target="_blank" rel="noopener noreferrer" className="btn-white flex items-center space-x-2">
                            <Github className="w-5 h-5" />
                            <span>View on GitHub</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="neu-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Premium Code Editor</h3>
                            <p className="text-gray-600">
                                Monaco-powered editor with syntax highlighting, auto-completion, and multiple language support.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="neu-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Instant Execution</h3>
                            <p className="text-gray-600">
                                Run your code instantly with real-time feedback. See test results in milliseconds.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="neu-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                            <p className="text-gray-600">
                                Monitor your solving streak, acceptance rate, and compete on the leaderboard.
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
                            <div className="text-gray-400">Languages Supported</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">100%</div>
                            <div className="text-gray-400">Open Source</div>
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
                        No sign-up required. Jump straight into solving problems.
                    </p>
                    <Link to="/problems" className="btn-black text-lg px-8 py-4 inline-flex items-center space-x-2">
                        <span>Browse Problems</span>
                        <ArrowRight className="w-6 h-6" />
                    </Link>
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
