// ════════════════════════════════════════════════════════════════
// Submission Service - Support Anonymous Submissions
// ════════════════════════════════════════════════════════════════

import db from '../database/connection';
import { updateProblemStats } from './problem.service';

export interface Submission {
    id: number;
    user_id: number | null; // Nullable for anonymous submissions
    problem_id: number;
    code: string;
    language: string;
    status: string;
    execution_time_ms?: number;
    memory_used_mb?: number;
    error_message?: string;
    test_results?: any;
    passed_test_count: number;
    total_test_count: number;
    created_at: Date;
}

export async function createSubmission(data: {
    user_id: number | null; // Allow null for anonymous submissions
    problem_id: number;
    code: string;
    language: string;
}) {
    const [submission] = await db('submissions')
        .insert({
            user_id: data.user_id, // Can be null
            problem_id: data.problem_id,
            code: data.code,
            language: data.language,
            status: 'pending',
        })
        .returning('*');

    return submission;
}

export async function updateSubmissionResult(
    submissionId: number,
    result: {
        status: string;
        execution_time_ms?: number;
        memory_used_mb?: number;
        error_message?: string;
        test_results?: any;
        passed_test_count: number;
        total_test_count: number;
    }
): Promise<void> {
    const submission = await db('submissions').where({ id: submissionId }).first();

    await db('submissions').where({ id: submissionId }).update({
        status: result.status,
        execution_time_ms: result.execution_time_ms,
        memory_used_mb: result.memory_used_mb,
        error_message: result.error_message,
        test_results: result.test_results ? JSON.stringify(result.test_results) : null,
        passed_test_count: result.passed_test_count,
        total_test_count: result.total_test_count,
        updated_at: new Date(),
    });

    // Update problem stats
    if (submission) {
        await updateProblemStats(submission.problem_id, result.status === 'accepted');

        // Update user stats if authenticated
        if (submission.user_id) {
            const { updateUserStats } = await import('./user-stats.service');
            await updateUserStats(submission.user_id, submission.problem_id, result.status === 'accepted');
        }
    }

}

async function updateUserStats(userId: number, problemId: number) {
    // Check if this is first accepted submission for this problem
    const previousAccepted = await db('submissions')
        .where({
            user_id: userId,
            problem_id: problemId,
            status: 'accepted',
        })
        .count('* as count')
        .first();

    if (previousAccepted && parseInt(previousAccepted.count as string) === 1) {
        // First time solving this problem
        await db('users')
            .where({ id: userId })
            .increment('total_problems_solved', 1);
    }
}

export async function getUserSubmissions(userId: number, problemId?: number) {
    let query = db('submissions')
        .where({ user_id: userId })
        .orderBy('created_at', 'desc')
        .limit(50);

    if (problemId) {
        query = query.where({ problem_id: problemId });
    }

    return query;
}

export async function getSubmissionById(id: number) {
    return db('submissions').where({ id }).first();
}
