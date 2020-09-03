import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { ImetaTags } from '../models/metatags.model';
import { SiteConf } from './../enum/siteconf.enum';

export class RedeSuperRouter {

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
            // Pegando as metaTags
            const metaTag = this.getMetaTags();

            res.render('redesuper', {
                baseHref,
                metaTag,
            });
        });
    }

    private getMetaTags(): ImetaTags {

        return {
            title: `${SiteConf.TITLE} - TV Online - Rede Super`,
            description: 'Assista agora mesmo a Rede Super de Televisão',
            img: SiteConf.IMG,
            url: `${SiteConf.URL}/rede-super`,
            site_name: SiteConf.SITE_NAME
        };
    }

}
