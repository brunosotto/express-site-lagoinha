import { Express, NextFunction } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from './../providers/lagoinha.provider';
import moment from 'moment';
import { IObjectLagoinha } from '../models/object-lagoinha.model';
import { ImetaTags } from '../models/metatags.model';
import { SiteConf } from 'src/enum/siteconf.enum';

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
        this.router.get(this.path, (req: Request, res: Response, next: NextFunction) => {
            const baseHref = '../../';
            const devo = this.devoProv.devocionais;
            // Converter string para Number.
            const id = parseInt(req.params.id, 10);
            // Filtro para pegar o id vindo no parametro e verificar se e mesmo id obj.
            const devocional = devo.find(d => id === d.id);

            // caso não encontre
            if (!devocional) {
                return next();
            }
            // Pegando as metaTags
            const metaTag = this.getMetaTags(devocional);
            res.render('devocional-item', {
                devocional,
                baseHref,
                moment,
                metaTag,
            });
        });
    }

    private getMetaTags(devo: IObjectLagoinha): ImetaTags {

        return {
            title: `Devocional: ${devo.page.title} - ${SiteConf.TITLE}`,
            description: devo.page.summary,
            img: devo.page.thumbnail,
            url: `${SiteConf.URL}/devocional/${devo.id}/${devo.slug}`,
            site_name: SiteConf.SITE_NAME
        };
    }

}
