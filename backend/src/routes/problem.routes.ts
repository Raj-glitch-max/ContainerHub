// ════════════════════════════════════════════════════════════════
// Problem Routes - COMPLETELY PUBLIC (No Authentication)
// ════════════════════════════════════════════════════════════════

import { Router, Request, Response } from 'express';
import {
    getAllProblems,
    getProblemBySlug,
} from '../services/problem.service';

const router = Router();

// ────────────────────────────────────────────────────────────────
// GET /api/v1/problems - List All Problems
// PUBLIC - NO AUTHENTICATION REQUIRED
// ────────────────────────────────────────────────────────────────
router.get('/', async (req: Request, res: Response) => {
    try {
        const { difficulty, category } = req.query;

        const filters: any = {};
        if (difficulty) filters.difficulty = difficulty;
        if (category) filters.category = category;

        const problems = await getAllProblems(filters);

        res.json({
            count: problems.length,
            problems,
        });
    } catch (error) {
        console.error('Get problems error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ────────────────────────────────────────────────────────────────
// GET /api/v1/problems/:slug - Get Problem Details
// PUBLIC - NO AUTHENTICATION REQUIRED
// ────────────────────────────────────────────────────────────────
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const problem = await getProblemBySlug(slug);

        if (!problem) {
            res.status(404).json({ error: 'Problem not found' });
            return;
        }

        // Don't send solution to user
        const { solution_code, solution_explanation, ...problemData } = problem;

        res.json({ problem: problemData });
    } catch (error) {
        console.error('Get problem error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
