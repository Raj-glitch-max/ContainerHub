import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';

import './index.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#000',
                            color: '#fff',
                        },
                    }}
                />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/problems" element={<ProblemsPage />} />
                    <Route path="/problems/:slug" element={<ProblemDetailPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
