import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from './../providers/lagoinha.provider';
import moment from 'moment';
export class DevocionalRouter {

    public router: Router;
    public path: string;
    private devoProv: LagoinhaProvider;
    private id: any;
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
           const devo = this.devoProv.devocionais;
           const devocional = devo.filter(dev => req.params.id == dev.id);
           const baseHref = '../../';
           res.render('devocional-item', {devocional, baseHref, moment});
        });
    }

}
