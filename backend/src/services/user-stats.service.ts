// ════════════════════════════════════════════════════════════════
// User Stats Service - Track User Progress & Streaks
// ════════════════════════════════════════════════════════════════

import db from '../database/connection';

export async function updateUserStats(userId: number, problemId: number, accepted: boolean): Promise<void> {
    const trx = await db.transaction();

    try {
        const user = await trx('users').where({ id: userId }).first();
        if (!user) {
            await trx.rollback();
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const lastDate = user.last_submission_date
            ? new Date(user.last_submission_date).toISOString().split('T')[0]
            : null;

        // Calculate streak
        let streak = user.current_streak || 0;
        if (!lastDate) {
            streak = 1;
        } else if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            streak = lastDate === yesterday.toISOString().split('T')[0] ? streak + 1 : 1;
        }

        const bestStreak = Math.max(streak, user.longest_streak || 0);

        // Count stats
        const acceptedCount = await trx('submissions')
            .where({ user_id: userId, status: 'accepted' })
            .count('* as count').first();

        const solvedCount = await trx('submissions')
            .where({ user_id: userId, status: 'accepted' })
            .distinct('problem_id').count('* as count').first();

        const totalCount = await trx('submissions')
            .where({ user_id: userId }).count('* as count').first();

        const totalAccepted = parseInt(acceptedCount?.count as string) || 0;
        const totalSolved = parseInt(solvedCount?.count as string) || 0;
        const totalSubs = parseInt(totalCount?.count as string) || 0;
        const rate = totalSubs > 0 ? (totalAccepted / totalSubs) * 100 : 0;

        await trx('users').where({ id: userId }).update({
            total_problems_solved: totalSolved,
            acceptance_rate: rate.toFixed(2),
            current_streak: streak,
            longest_streak: bestStreak,
            last_submission_date: new Date(),
        });

        await trx.commit();
        console.log(`✅ Stats updated: user ${userId}, ${totalSolved} solved, ${streak} streak`);
    } catch (error) {
        await trx.rollback();
        throw error;
    }
}

export async function getUserStats(userId: number) {
    return await db('users')
        .where({ id: userId })
        .select('id', 'username', 'total_problems_solved', 'acceptance_rate',
            'current_streak', 'longest_streak', 'last_submission_date')
        .first();
}

export async function getLeaderboard(limit: number = 100) {
    const users = await db('users')
        .select('id', 'username', 'total_problems_solved', 'acceptance_rate',
            'current_streak', 'longest_streak')
        .where('email_verified', true)
        .orderBy('total_problems_solved', 'desc')
        .orderBy('acceptance_rate', 'desc')
        .limit(limit);

    return users.map((u, i) => ({ rank: i + 1, ...u }));
}
