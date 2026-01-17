import { useState } from 'react';

function App() {
    const [message, setMessage] = useState<string>('');

    const checkBackend = async () => {
        try {
            const response = await fetch('http://localhost:3001/health');
            const data = await response.json();
            setMessage(`✅ Backend is ${data.status}!`);
        } catch (error) {
            setMessage('❌ Backend is not running. Start with: cd backend && npm run dev');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        🚀 ContainerHub
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Collaborative Coding Interview Platform
                    </p>

                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Welcome! 👋</h2>
                        <p className="text-blue-100">
                            Your development environment is ready to go.
                        </p>
                    </div>

                    <button
                        onClick={checkBackend}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mb-4"
                    >
                        Test Backend Connection
                    </button>

                    {message && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                            <p className="font-mono text-sm">{message}</p>
                        </div>
                    )}

                    <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-semibold text-gray-900">Backend</div>
                            <div className="text-gray-600">:3001</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-semibold text-gray-900">Frontend</div>
                            <div className="text-gray-600">:3000</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-semibold text-gray-900">Database</div>
                            <div className="text-gray-600">:5432</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
