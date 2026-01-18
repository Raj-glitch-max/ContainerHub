// ════════════════════════════════════════════════════════════════
// Auth Routes - REAL Authentication Endpoints
// ════════════════════════════════════════════════════════════════

import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as authService from '../services/auth.service';

const router = Router();

// Register new user
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('username').trim().isLength({ min: 3, max: 20 }).withMessage('Username must be 3-20 characters'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, username, password } = req.body;
            const result = await authService.register(email, username, password);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Login
router.post(
    '/login',
    [
        body('emailOrUsername').trim().notEmpty().withMessage('Email or username is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { emailOrUsername, password } = req.body;
            const result = await authService.login(emailOrUsername, password);
            res.json(result);
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }
);

// Verify email
router.post('/verify-email', async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: 'Verification token is required' });
        }

        const result = await authService.verifyEmail(token);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Request password reset
router.post(
    '/forgot-password',
    [body('email').isEmail().withMessage('Valid email is required')],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email } = req.body;
            const result = await authService.requestPasswordReset(email);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Reset password
router.post(
    '/reset-password',
    [
        body('token').notEmpty().withMessage('Reset token is required'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { token, password } = req.body;
            const result = await authService.resetPassword(token, password);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
);

export default router;
