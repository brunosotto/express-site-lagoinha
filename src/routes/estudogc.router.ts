import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from './../providers/lagoinha.provider';

export class EstudoGcRouter {

    public router: Router;
    public path: string;
    private estgcProv: LagoinhaProvider;

    constructor(
        private readonly app: Express,
    ) {
        this.router = Router();
        this.path = '';

        this.estgcProv = this.app.get('lagoinha');

        this.setGet();
    }

    private setGet(): void {
        this.router.get(this.path, (req: Request, res: Response) => {
           const estudosgc = this.estgcProv.estudoGC;
           res.render('estudogc', { estudosgc });
        });
    }

}
