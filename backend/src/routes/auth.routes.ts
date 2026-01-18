// ════════════════════════════════════════════════════════════════
// Authentication Routes
// ════════════════════════════════════════════════════════════════

import { Router, Request, Response } from 'express';
import {
    createUser,
    authenticateUser,
    findUserByEmail,
    findUserByUsername,
    getUserPayload,
    generateToken,
    generateRefreshToken,
    verifyToken,
    verifyUserEmail,
} from '../services/auth.service';
import {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
} from '../middleware/validation.schemas';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// ────────────────────────────────────────────────────────────────
// POST /api/v1/auth/register - User Registration
// ────────────────────────────────────────────────────────────────
router.post('/register', async (req: Request, res: Response) => {
    try {
        // Validate input
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                error: 'Validation failed',
                details: error.details.map(d => d.message),
            });
            return;
        }

        // Check if user already exists
        const existingEmail = await findUserByEmail(value.email);
        if (existingEmail) {
            res.status(409).json({ error: 'Email already registered' });
            return;
        }

        const existingUsername = await findUserByUsername(value.username);
        if (existingUsername) {
            res.status(409).json({ error: 'Username already taken' });
            return;
        }

        // Create user
        const user = await createUser(value);

        // TODO: Send verification email (mock mode for now)
        if (process.env.SENDGRID_MOCK_MODE === 'true') {
            console.log(`📧 [MOCK] Verification email sent to ${user.email}`);
            console.log(`📧 [MOCK] Verification link: http://localhost:3001/api/v1/auth/verify-email?token=${user.verification_token}`);
        }

        // Generate tokens
        const payload = getUserPayload(user);
        const accessToken = generateToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.status(201).json({
            message: 'User registered successfully. Please check your email for verification.',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                full_name: user.full_name,
                email_verified: user.email_verified,
            },
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
        });
    }
});

// ────────────────────────────────────────────────────────────────
// POST /api/v1/auth/login - User Login
// ────────────────────────────────────────────────────────────────
router.post('/login', async (req: Request, res: Response) => {
    try {
        // Validate input
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                error: 'Validation failed',
                details: error.details.map(d => d.message),
            });
            return;
        }

        // Authenticate user
        const user = await authenticateUser(value);
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        // Generate tokens
        const payload = getUserPayload(user);
        const accessToken = generateToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                full_name: user.full_name,
                email_verified: user.email_verified,
                role: user.role,
            },
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error('Login error:', error);

        if ((error as Error).message === 'User account is deactivated') {
            res.status(403).json({ error: 'Account deactivated. Please contact support.' });
            return;
        }

        res.status(500).json({
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
        });
    }
});

// ────────────────────────────────────────────────────────────────
// POST /api/v1/auth/refresh - Refresh Access Token
// ────────────────────────────────────────────────────────────────
router.post('/refresh', async (req: Request, res: Response) => {
    try {
        // Validate input
        const { error, value } = refreshTokenSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                error: 'Validation failed',
                details: error.details.map(d => d.message),
            });
            return;
        }

        // Verify refresh token
        const payload = verifyToken(value.refreshToken);

        // Generate new access token
        const accessToken = generateToken(payload);

        res.json({
            message: 'Token refreshed successfully',
            accessToken,
        });
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired refresh token' });
    }
});

// ────────────────────────────────────────────────────────────────
// GET /api/v1/auth/me - Get Current User
// ────────────────────────────────────────────────────────────────
router.get('/me', authenticateToken, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const { findUserById } = await import('../services/auth.service');
        const user = await findUserById(req.user.userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                full_name: user.full_name,
                bio: user.bio,
                profile_picture_url: user.profile_picture_url,
                skill_level: user.skill_level,
                total_problems_solved: user.total_problems_solved,
                acceptance_rate: user.acceptance_rate,
                current_streak: user.current_streak,
                email_verified: user.email_verified,
                role: user.role,
                created_at: user.created_at,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ────────────────────────────────────────────────────────────────
// GET /api/v1/auth/verify-email - Verify Email Address
// ────────────────────────────────────────────────────────────────
router.get('/verify-email', async (req: Request, res: Response) => {
    try {
        const { token } = req.query;

        if (!token || typeof token !== 'string') {
            res.status(400).json({ error: 'Verification token is required' });
            return;
        }

        const verified = await verifyUserEmail(token);

        if (!verified) {
            res.status(400).json({ error: 'Invalid or expired verification token' });
            return;
        }

        res.json({
            message: 'Email verified successfully! You can now access all features.',
        });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
