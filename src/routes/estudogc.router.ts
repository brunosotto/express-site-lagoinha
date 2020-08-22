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
           const baseHref = '../../';
           const gc = this.estgcProv.estudoGC;
           // Converter string para Number.
           const idparams = parseInt(req.params.id, 10);
           // Filtro para pegar o id vindo no parametro e verificar se e mesmo id obj.
           const estudogc = gc.filter(estudo => idparams === estudo.id);
           res.render('estudogc-item', { estudogc , baseHref, moment});
        });
    }

}
