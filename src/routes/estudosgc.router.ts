import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from '../providers/lagoinha.provider';
import moment from 'moment';
import { ImetaTags } from '../models/metatags.model';
import { SiteConf } from 'src/enum/siteconf.enum';

export class EstudosGcRouter {

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
            const baseHref = '../';

            //  Pegando meta Tags
            const metaTag = this.getMetaTags();
            res.render('estudosgc', {
                estudosgc,
                moment,
                baseHref,
                metaTag,
            });
        });
    }
    private getMetaTags(): ImetaTags {

        return {
            title: `${SiteConf.TITLE} - Estudos GC`,
            description: `Os GCs são o coração da igreja,
            em que cada um tem a oportunidade de conhecer pessoas,
            criar vínculos, servir, ter comunhão e se edificar.
            São muitos os benefícios que um GC pode proporcionar
            à vida de uma pessoa e à igreja. GCs são pequenos grupos de Crescimentos,
            aonde nós nos reunimos para estudar e meditar em comunhão a palavra de Deus.`,
            img: SiteConf.IMG,
            url: `${SiteConf.URL}/estudos-gc`,
            site_name: SiteConf.SITE_NAME
        };
    }

}
