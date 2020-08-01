import { Router } from 'express';
import { HomeRouter } from './home.router';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/', HomeRouter);

// Export the base-router
export default router;
