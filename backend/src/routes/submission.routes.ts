// ════════════════════════════════════════════════════════════════
// Submission Routes
// ════════════════════════════════════════════════════════════════

import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
    createSubmission,
    updateSubmissionResult,
    getUserSubmissions,
    getSubmissionById,
} from '../services/submission.service';
import { getProblemById } from '../services/problem.service';
import { executeCode } from '../services/execution.service';

const router = Router();

// ────────────────────────────────────────────────────────────────
// POST /api/v1/submissions - Submit Code for Problem
// ────────────────────────────────────────────────────────────────
router.post('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const { problem_id, code, language } = req.body;

        // Validate input
        if (!problem_id || !code || !language) {
            res.status(400).json({ error: 'Missing required fields: problem_id, code, language' });
            return;
        }

        // Get problem details
        const problem = await getProblemById(problem_id);
        if (!problem) {
            res.status(404).json({ error: 'Problem not found' });
            return;
        }

        // Create submission
        const submission = await createSubmission({
            user_id: req.user.userId,
            problem_id: parseInt(problem_id),
            code,
            language,
        });

        // Execute code asynchronously
        // In production, this would be queued for processing
        executeCode(code, language, problem.test_cases)
            .then(async (result) => {
                await updateSubmissionResult(submission.id, {
                    status: result.status,
                    execution_time_ms: result.execution_time_ms,
                    memory_used_mb: result.memory_used_mb,
                    error_message: result.error_message,
                    test_results: result.test_results,
                    passed_test_count: result.passed_test_count,
                    total_test_count: result.total_test_count,
                });
            })
            .catch((error) => {
                console.error('Execution error:', error);
                updateSubmissionResult(submission.id, {
                    status: 'system_error',
                    error_message: 'Internal execution error',
                    passed_test_count: 0,
                    total_test_count: problem.test_cases.length,
                });
            });

        res.status(201).json({
            message: 'Submission created. Processing...',
            submission: {
                id: submission.id,
                status: submission.status,
                created_at: submission.created_at,
            },
        });
    } catch (error) {
        console.error('Submit code error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ────────────────────────────────────────────────────────────────
// GET /api/v1/submissions/:id - Get Submission Result
// ────────────────────────────────────────────────────────────────
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const { id } = req.params;
        const submission = await getSubmissionById(parseInt(id));

        if (!submission) {
            res.status(404).json({ error: 'Submission not found' });
            return;
        }

        // Only allow users to see their own submissions
        if (submission.user_id !== req.user.userId) {
            res.status(403).json({ error: 'Access denied' });
            return;
        }

        res.json({ submission });
    } catch (error) {
        console.error('Get submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ────────────────────────────────────────────────────────────────
// GET /api/v1/submissions - Get User's Submissions
// ────────────────────────────────────────────────────────────────
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const { problem_id } = req.query;
        const problemId = problem_id ? parseInt(problem_id as string) : undefined;

        const submissions = await getUserSubmissions(req.user.userId, problemId);

        res.json({
            count: submissions.length,
            submissions,
        });
    } catch (error) {
        console.error('Get submissions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
