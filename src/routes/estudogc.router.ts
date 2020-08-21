import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from '../providers/lagoinha.provider';
import moment from 'moment';
export class EstudoGcRouter {

    public router: Router;
    public path: string;
    private estgcProv: LagoinhaProvider;

    constructor(
        private readonly app: Express,
    ) {
        this.router = Router();
        this.path = '/:id/:slug/';

        this.estgcProv = this.app.get('lagoinha');

        this.setGet();
    }

    private setGet(): void {
        this.router.get(this.path, (req: Request, res: Response) => {
           const gc = this.estgcProv.estudoGC;
           const estudogc = gc.filter(estudo => req.params.id == estudo.id);
           const baseHref = '../../';
           res.render('estudogc-item', { estudogc , baseHref, moment});
        });
    }

}
