// ════════════════════════════════════════════════════════════════
// Auth Service - REAL User Authentication
// ════════════════════════════════════════════════════════════════

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../database/connection';
import { sendVerificationEmail, sendPasswordResetEmail } from './email.service';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '30d';
const SALT_ROUNDS = 10;

interface User {
    id: number;
    email: string;
    username: string;
    password_hash: string;
    email_verified: boolean;
    verification_token?: string;
    created_at: Date;
}

export async function register(email: string, username: string, password: string): Promise<{ user: Partial<User>; message: string }> {
    // Check if user already exists
    const existingUser = await db('users')
        .where({ email })
        .orWhere({ username })
        .first();

    if (existingUser) {
        if (existingUser.email === email) {
            throw new Error('Email already registered');
        }
        if (existingUser.username === username) {
            throw new Error('Username already taken');
        }
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Generate verification token
    const verification_token = crypto.randomBytes(32).toString('hex');
    const verification_expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const [user] = await db('users')
        .insert({
            email,
            username,
            password_hash,
            email_verified: false,
            verification_token,
            verification_expires,
            created_at: new Date(),
        })
        .returning(['id', 'email', 'username', 'email_verified', 'created_at']);

    // Send verification email
    try {
        await sendVerificationEmail(email, verification_token, username);
    } catch (error) {
        console.error('Failed to send verification email:', error);
        // Don't fail registration if email fails
    }

    return {
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            email_verified: user.email_verified,
        },
        message: 'Registration successful! Please check your email to verify your account.',
    };
}

export async function login(emailOrUsername: string, password: string): Promise<{ token: string; user: Partial<User> }> {
    // Find user by email or username
    const user = await db('users')
        .where({ email: emailOrUsername })
        .orWhere({ username: emailOrUsername })
        .first();

    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Check if email is verified
    if (!user.email_verified) {
        throw new Error('Please verify your email before logging in');
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            email_verified: user.email_verified,
        },
    };
}

export async function verifyEmail(token: string): Promise<{ message: string }> {
    const user = await db('users')
        .where({ verification_token: token })
        .where('verification_expires', '>', new Date())
        .first();

    if (!user) {
        throw new Error('Invalid or expired verification token');
    }

    // Mark email as verified
    await db('users')
        .where({ id: user.id })
        .update({
            email_verified: true,
            verification_token: null,
            verification_expires: null,
        });

    return { message: 'Email verified successfully! You can now log in.' };
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
    const user = await db('users').where({ email }).first();

    if (!user) {
        // Don't reveal if email exists
        return { message: 'If an account with that email exists, a password reset link has been sent.' };
    }

    // Generate reset token
    const reset_token = crypto.randomBytes(32).toString('hex');
    const reset_expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db('users')
        .where({ id: user.id })
        .update({
            reset_token,
            reset_expires,
        });

    // Send reset email
    try {
        await sendPasswordResetEmail(email, reset_token, user.username);
    } catch (error) {
        console.error('Failed to send password reset email:', error);
        throw new Error('Failed to send password reset email');
    }

    return { message: 'If an account with that email exists, a password reset link has been sent.' };
}

export async function resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await db('users')
        .where({ reset_token: token })
        .where('reset_expires', '>', new Date())
        .first();

    if (!user) {
        throw new Error('Invalid or expired reset token');
    }

    // Hash new password
    const password_hash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await db('users')
        .where({ id: user.id })
        .update({
            password_hash,
            reset_token: null,
            reset_expires: null,
        });

    return { message: 'Password reset successfully! You can now log in with your new password.' };
}

export function verifyToken(token: string): { userId: number; email: string; username: string } {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string; username: string };
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}
