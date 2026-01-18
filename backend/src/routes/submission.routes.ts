// ════════════════════════════════════════════════════════════════
// Submission Routes - COMPLETELY PUBLIC (No Authentication)
// ════════════════════════════════════════════════════════════════

import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import {
    createSubmission,
    updateSubmissionResult,
    getSubmissionById,
    getUserSubmissions,
} from '../services/submission.service';
import { executeCode } from '../services/execution.service';

const router = Router();

// ────────────────────────────────────────────────────────────────
// POST /api/v1/submissions - Submit Code Solution
// PUBLIC - NO AUTHENTICATION REQUIRED
// ────────────────────────────────────────────────────────────────
router.post(
    '/',
    [
        body('problem_id').isInt().withMessage('Problem ID is required'),
        body('code').notEmpty().withMessage('Code is required'),
        body('language').isString().trim().notEmpty().withMessage('Language is required'),
    ],
    async (req: Request, res: Response) => {
        language,
            user_id: null, // Anonymous submission
            });

res.status(201).json({
    message: 'Submission created. Processing...',
    submission: {
        id: submission.id,
        status: submission.status,
        created_at: submission.created_at,
    },
});

// Execute code asynchronously
executeCode(submission.id, problem_id, code, language)
    .then(async (result) => {
        await updateSubmissionResult(submission.id, result);
    })
    .catch((error) => {
        console.error('Execution error:', error);
    });

        } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
    }
);

// ────────────────────────────────────────────────────────────────
// GET /api/v1/submissions/:id - Get Submission Result
// PUBLIC - NO AUTHENTICATION REQUIRED
// ────────────────────────────────────────────────────────────────
router.get(
    '/:id',
    [param('id').isInt().withMessage('Invalid submission ID')],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const submissionId = parseInt(req.params.id);
            const submission = await getSubmissionById(submissionId);

            if (!submission) {
                res.status(404).json({ error: 'Submission not found' });
                return;
            }

            res.json({ submission });
        } catch (error) {
            console.error('Get submission error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

export default router;
