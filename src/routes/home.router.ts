import { Request, Response, Router } from 'express';

export const HomeRouter = Router();

const path = '';

HomeRouter.get(path, async (req: Request, res: Response) => {
    res.render('home');
});
