// ════════════════════════════════════════════════════════════════
// Authentication Service
// ════════════════════════════════════════════════════════════════

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../database/connection';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_change_in_production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10');

export interface User {
    id: number;
    email: string;
    username: string;
    password_hash: string;
    full_name?: string;
    bio?: string;
    profile_picture_url?: string;
    skill_level: 'beginner' | 'intermediate' | 'advanced';
    email_verified: boolean;
    is_active: boolean;
    role: 'user' | 'admin';
    created_at: Date;
}

export interface RegisterData {
    email: string;
    username: string;
    password: string;
    full_name?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface TokenPayload {
    userId: number;
    email: string;
    username: string;
    role: string;
}

// ────────────────────────────────────────────────────────────────
// Helper Functions
// ────────────────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

export function generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
}

// ────────────────────────────────────────────────────────────────
// User Operations
// ────────────────────────────────────────────────────────────────

export async function findUserByEmail(email: string): Promise<User | null> {
    const user = await db('users')
        .where({ email, deleted_at: null })
        .first();
    return user || null;
}

export async function findUserByUsername(username: string): Promise<User | null> {
    const user = await db('users')
        .where({ username, deleted_at: null })
        .first();
    return user || null;
}

export async function findUserById(id: number): Promise<User | null> {
    const user = await db('users')
        .where({ id, deleted_at: null })
        .first();
    return user || null;
}

export async function createUser(data: RegisterData): Promise<User> {
    const passwordHash = await hashPassword(data.password);
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const [user] = await db('users')
        .insert({
            email: data.email,
            username: data.username,
            password_hash: passwordHash,
            full_name: data.full_name,
            verification_token: verificationToken,
            verification_token_expires: verificationExpires,
            skill_level: 'beginner',
            role: 'user',
        })
        .returning('*');

    return user;
}

export async function verifyUserEmail(token: string): Promise<boolean> {
    const user = await db('users')
        .where({ verification_token: token })
        .where('verification_token_expires', '>', new Date())
        .first();

    if (!user) {
        return false;
    }

    await db('users')
        .where({ id: user.id })
        .update({
            email_verified: true,
            verification_token: null,
            verification_token_expires: null,
        });

    return true;
}

export async function authenticateUser(data: LoginData): Promise<User | null> {
    const user = await findUserByEmail(data.email);

    if (!user) {
        return null;
    }

    const isValid = await comparePassword(data.password, user.password_hash);

    if (!isValid) {
        return null;
    }

    if (!user.is_active) {
        throw new Error('User account is deactivated');
    }

    return user;
}

export function getUserPayload(user: User): TokenPayload {
    return {
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
    };
}
