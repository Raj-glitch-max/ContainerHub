import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <h1 className="text-2xl font-bold text-indigo-600">🚀 ContainerHub</h1>
                            <Link
                                to="/problems"
                                className="text-gray-700 hover:text-indigo-600 font-medium"
                            >
                                Problems
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Hello, {user?.username}!</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Welcome to ContainerHub! 🎉
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                        Your collaborative coding interview platform
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg p-6">
                            <div className="text-4xl font-bold">{user?.total_problems_solved || 0}</div>
                            <div className="text-blue-100 mt-2">Problems Solved</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg p-6">
                            <div className="text-4xl font-bold">{user?.acceptance_rate || 0}%</div>
                            <div className="text-purple-100 mt-2">Acceptance Rate</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-lg p-6">
                            <div className="text-4xl font-bold">{user?.current_streak || 0}</div>
                            <div className="text-green-100 mt-2">Day Streak</div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h3 className="font-semibold text-yellow-800 mb-2">🚧 Under Construction</h3>
                        <p className="text-yellow-700">
                            More features coming soon: Problem listing, code editor, AI reviews, and leaderboards!
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Profile</h3>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <span className="text-gray-600 w-32">Username:</span>
                            <span className="font-semibold">{user?.username}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 w-32">Email:</span>
                            <span className="font-semibold">{user?.email}</span>
                            {!user?.email_verified && (
                                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                    Not Verified
                                </span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 w-32">Full Name:</span>
                            <span className="font-semibold">{user?.full_name || 'Not set'}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 w-32">Skill Level:</span>
                            <span className="font-semibold capitalize">{user?.skill_level}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 w-32">Member Since:</span>
                            <span className="font-semibold">
                                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
