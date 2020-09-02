import { Express, NextFunction } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from '../providers/lagoinha.provider';
import moment from 'moment';
import { IObjectLagoinha } from '../models/object-lagoinha.model';
import { ImetaTags } from '../models/metatags.model';

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
        this.router.get(this.path, (req: Request, res: Response, next: NextFunction) => {
            const baseHref = '../../';
            const gc = this.estgcProv.estudoGC;
            // Converter string para Number.
            const id = parseInt(req.params.id, 10);
            // Filtro para pegar o id vindo no parametro e verificar se e mesmo id obj.
            const estudogc = gc.find(e => id === e.id);

            // caso não encontre
            if (!estudogc) {
                return next();
            }
            // Pegando as metaTags
            const metaTag = this.getMetaTags(estudogc);
            res.render('estudogc-item', {
                estudogc,
                baseHref,
                moment,
                metaTag,
            });
        });
    }

    private getMetaTags(gc: IObjectLagoinha): ImetaTags {
        return {
            title: `Estudo GC: ${gc.page.title} - Lagoinha Promissão`,
            description: gc.page.summary,
            img: gc.page.thumbnail,
            url: `https://lagoinhapromissao.com/estudos-gc/${gc.id}/${gc.slug}`,
        };
    }

}
