// ════════════════════════════════════════════════════════════════
// Auth Middleware - JWT Verification
// ════════════════════════════════════════════════════════════════

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';

export interface AuthRequest extends Request {
    userId?: number;
    userEmail?: string;
    username?: string;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        req.username = decoded.username;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}
