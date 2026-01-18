import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware';
import { getUserStats, getLeaderboard } from '../services/user-stats.service';

const router = Router();

// Get current user stats
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const stats = await getUserStats(req.userId!);
        res.json({ stats });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 100;
        const leaderboard = await getLeaderboard(limit);
        res.json({ leaderboard });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
