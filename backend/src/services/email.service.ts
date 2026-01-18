// ════════════════════════════════════════════════════════════════
// Email Service - REAL SendGrid Integration
// ════════════════════════════════════════════════════════════════

import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@containerhub.com';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendVerificationEmail(email: string, token: string, username: string): Promise<void> {
    const verificationUrl = `${FRONTEND_URL}/verify-email?token=${token}`;

    const msg = {
        to: email,
        from: FROM_EMAIL,
        subject: 'Verify your ContainerHub account',
        text: `Hi ${username},\n\nPlease verify your email by clicking this link: ${verificationUrl}\n\nIf you didn't create this account, you can ignore this email.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to ContainerHub!</h2>
                <p>Hi ${username},</p>
                <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
                <a href="${verificationUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">
                    Verify Email
                </a>
                <p>Or copy and paste this link into your browser:</p>
                <p style="color: #666; font-size: 14px;">${verificationUrl}</p>
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't create this account, you can safely ignore this email.</p>
            </div>
        `,
    };

    try {
        if (!SENDGRID_API_KEY) {
            console.log('⚠️ SendGrid not configured. Email would be sent to:', email);
            console.log('Verification URL:', verificationUrl);
            return;
        }

        await sgMail.send(msg);
        console.log(`✅ Verification email sent to ${email}`);
    } catch (error: any) {
        console.error('❌ Email send failed:', error.response?.body || error.message);
        throw new Error('Failed to send verification email');
    }
}

export async function sendPasswordResetEmail(email: string, token: string, username: string): Promise<void> {
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;

    const msg = {
        to: email,
        from: FROM_EMAIL,
        subject: 'Reset your ContainerHub password',
        text: `Hi ${username},\n\nClick this link to reset your password: ${resetUrl}\n\nIf you didn't request this, you can ignore this email.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Reset Your Password</h2>
                <p>Hi ${username},</p>
                <p>You requested to reset your password. Click the button below to continue:</p>
                <a href="${resetUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">
                    Reset Password
                </a>
                <p>Or copy and paste this link into your browser:</p>
                <p style="color: #666; font-size: 14px;">${resetUrl}</p>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, you can safely ignore this email.</p>
            </div>
        `,
    };

    try {
        if (!SENDGRID_API_KEY) {
            console.log('⚠️ SendGrid not configured. Email would be sent to:', email);
            console.log('Reset URL:', resetUrl);
            return;
        }

        await sgMail.send(msg);
        console.log(`✅ Password reset email sent to ${email}`);
    } catch (error: any) {
        console.error('❌ Email send failed:', error.response?.body || error.message);
        throw new Error('Failed to send password reset email');
    }
}
