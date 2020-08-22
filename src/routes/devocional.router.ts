import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from './../providers/lagoinha.provider';

export class DevocionalRouter {

    public router: Router;
    public path: string;
    private devoProv: LagoinhaProvider;

    constructor(
        private readonly app: Express,
    ) {
        this.router = Router();
        this.path = '/:id/:slug/';
       

        this.devoProv = this.app.get('lagoinha');

        this.setGet();
    }

    private setGet(): void {
        this.router.get(this.path, (req: Request, res: Response) => {
           const devocional = this.devoProv.devocionais[0];
           const baseHref = '../../';
           res.render('devocional-item', {devocional, baseHref});
        });
    }

}
