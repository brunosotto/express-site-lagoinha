import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { ImetaTags } from '../models/metatags.model';
import { SiteConf } from './../enum/siteconf.enum';

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
            const baseHref = '../';
            //  Pegando meta Tags
            const metaTag = this.getMetaTags();
            res.render('dizimo', {
                baseHref,
                metaTag,
            });
        });
    }

    private getMetaTags(): ImetaTags {

        return {
            title: `${SiteConf.TITLE} - Dizimo`,
            description: `Honra ao Senhor com os teus bens e com as primícias de
            toda a tua renda e se encherão fartamente os teus celeiros,
             e transbordarão de vinho os teus lagares`,
            img: SiteConf.IMG,
            url: `${SiteConf.URL}/dizimo`,
            site_name: SiteConf.SITE_NAME
        };
    }

}
