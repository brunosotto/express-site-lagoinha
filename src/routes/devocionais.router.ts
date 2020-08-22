import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from './../providers/lagoinha.provider';

export class DevocionaisRouter {

    public router: Router;
    public path: string;
    private devoProv: LagoinhaProvider;

    constructor(
        private readonly app: Express,
    ) {
        this.router = Router();
        this.path = '';

        this.devoProv = this.app.get('lagoinha');

        this.setGet();
    }

    private setGet(): void {
        this.router.get(this.path, (req: Request, res: Response) => {
           const devos = this.devoProv.devocionais;
           res.render('devocionais', {devos});
        });
    }

}
