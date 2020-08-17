import { Express } from 'express';
import { Request, Response, Router } from 'express';

export class DizimoRouter {

    public router: Router;
    public path: string;

    constructor(
        private readonly app: Express,
    ) {
        this.router = Router();
        this.path = '';

        this.setGet();
    }

    private setGet(): void {
        this.router.get(this.path, async (req: Request, res: Response) => {
            res.render('dizimo');
        });
    }

}