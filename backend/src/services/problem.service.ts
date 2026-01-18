// ════════════════════════════════════════════════════════════════
// Problem Service
// ════════════════════════════════════════════════════════════════

import db from '../database/connection';

export interface Problem {
    id: number;
    title: string;
    slug: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    constraints: any[];
    examples: any[];
    test_cases: any[];
    starter_code: { [key: string]: string };
    solution_code?: string;
    solution_explanation?: string;
    tags: string[];
    companies: string[];
    category: string;
    attempt_count: number;
    submit_count: number;
    accepted_count: number;
    acceptance_rate: number;
    time_limit_ms: number;
    memory_limit_mb: number;
    is_premium: boolean;
    is_active: boolean;
    created_at: Date;
}

export async function getAllProblems(filters?: {
    difficulty?: string;
    category?: string;
    tags?: string[];
}) {
    let query = db('problems')
        .where({ is_active: true })
        .select(
            'id',
            'title',
            'slug',
            'difficulty',
            'category',
            'tags',
            'companies',
            'acceptance_rate',
            'is_premium'
        )
        .orderBy('id', 'asc');

    if (filters?.difficulty) {
        query = query.where({ difficulty: filters.difficulty });
    }

    if (filters?.category) {
        query = query.where({ category: filters.category });
    }

    return query;
}

export async function getProblemBySlug(slug: string): Promise<Problem | null> {
    const problem = await db('problems')
        .where({ slug, is_active: true })
        .first();

    if (!problem) {
        return null;
    }

    // Increment attempt count
    await db('problems')
        .where({ id: problem.id })
        .increment('attempt_count', 1);

    return problem;
}

export async function getProblemById(id: number): Promise<Problem | null> {
    return db('problems')
        .where({ id, is_active: true })
        .first();
}

export async function updateProblemStats(problemId: number, accepted: boolean) {
    await db('problems')
        .where({ id: problemId })
        .increment('submit_count', 1);

    if (accepted) {
        await db('problems')
            .where({ id: problemId })
            .increment('accepted_count', 1);
    }

    // Recalculate acceptance rate
    const problem = await db('problems').where({ id: problemId }).first();
    if (problem && problem.submit_count > 0) {
        const rate = (problem.accepted_count / problem.submit_count) * 100;
        await db('problems')
            .where({ id: problemId })
            .update({ acceptance_rate: rate.toFixed(2) });
    }
}
