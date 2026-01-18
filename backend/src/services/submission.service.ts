// ════════════════════════════════════════════════════════════════
// Submission Service
// ════════════════════════════════════════════════════════════════

import db from '../database/connection';
import { updateProblemStats } from './problem.service';

export interface Submission {
    id: number;
    user_id: number;
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
    user_id: number;
    problem_id: number;
    code: string;
    language: string;
}) {
    const [submission] = await db('submissions')
        .insert({
            user_id: data.user_id,
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
) {
    await db('submissions')
        .where({ id: submissionId })
        .update(result);

    // Get submission to update problem stats
    const submission = await db('submissions')
        .where({ id: submissionId })
        .first();

    if (submission) {
        await updateProblemStats(
            submission.problem_id,
            result.status === 'accepted'
        );

        // Update user stats if accepted
        if (result.status === 'accepted') {
            await updateUserStats(submission.user_id, submission.problem_id);
        }
    }

    return submission;
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
