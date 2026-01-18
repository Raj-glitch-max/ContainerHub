import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { testConnection } from './database/connection';

// Import routes
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// ════════════════════════════════════════════════════════════════
// Middleware
// ════════════════════════════════════════════════════════════════
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ════════════════════════════════════════════════════════════════
// Health Check Endpoint
// ════════════════════════════════════════════════════════════════
app.get('/health', async (req: Request, res: Response) => {
    const dbConnected = await testConnection();

    res.status(dbConnected ? 200 : 503).json({
        status: dbConnected ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: dbConnected ? 'connected' : 'disconnected'
    });
});

// ════════════════════════════════════════════════════════════════
// API Routes
// ════════════════════════════════════════════════════════════════
app.get('/api/v1', (req: Request, res: Response) => {
    res.json({
        message: 'ContainerHub API v1',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            auth: '/api/v1/auth',
            problems: '/api/v1/problems',
            submissions: '/api/v1/submissions'
        }
    });
});

// Mount routes
app.use('/api/v1/auth', authRoutes);

// ════════════════════════════════════════════════════════════════
// 404 Handler
// ════════════════════════════════════════════════════════════════
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`
    });
});

// ════════════════════════════════════════════════════════════════
// Error Handler
// ════════════════════════════════════════════════════════════════
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ════════════════════════════════════════════════════════════════
// Start Server
// ════════════════════════════════════════════════════════════════
async function startServer() {
    try {
        // Test database connection
        const dbConnected = await testConnection();
        if (!dbConnected) {
            console.warn('⚠️  Server starting without database connection');
        }

        app.listen(PORT, () => {
            console.log('');
            console.log('╔════════════════════════════════════════════════╗');
            console.log('║     🚀 ContainerHub API Server Running        ║');
            console.log('╚════════════════════════════════════════════════╝');
            console.log('');
            console.log(`📍 Environment:  ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 Port:         ${PORT}`);
            console.log(`🏥 Health:       http://localhost:${PORT}/health`);
            console.log(`🔐 Auth API:     http://localhost:${PORT}/api/v1/auth`);
            console.log(`💾 Database:     ${dbConnected ? '✅ Connected' : '❌ Disconnected'}`);
            console.log('');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

export default app;
