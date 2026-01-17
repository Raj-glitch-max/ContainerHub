import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

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
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ════════════════════════════════════════════════════════════════
// API Routes (Coming Soon)
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

// ════════════════════════════════════════════════════════════════
// Error Handler
// ════════════════════════════════════════════════════════════════
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ════════════════════════════════════════════════════════════════
// Start Server
// ════════════════════════════════════════════════════════════════
app.listen(PORT, () => {
    console.log(`🚀 ContainerHub API running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;
