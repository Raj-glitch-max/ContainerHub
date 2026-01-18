import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes - NO LOGIN REQUIRED */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/problems" element={<ProblemsPage />} />
                    <Route path="/problems/:slug" element={<ProblemDetailPage />} />

                    {/* Auth Routes (Optional - Hidden for now) */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />

                    {/* Leaderboard (Coming Soon) */}
                    <Route path="/leaderboard" element={
                        <div className="min-h-screen flex items-center justify-center">
                            <h1 className="text-4xl font-bold text-gradient">Coming Soon</h1>
                        </div>
                    } />

                    {/* Catch all - redirect to landing */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
