import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from './../providers/lagoinha.provider';
import moment from 'moment';
import { ImetaTags } from '../models/metatags.model';
import { SiteConf } from 'src/enum/siteconf.enum';

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
            const baseHref = '../';

            // Peganto as metas Tags
            const metaTag = this.getMetaTags();
            res.render('devocionais', {
                devos,
                moment,
                baseHref,
                metaTag,
            });
        });
    }

    private getMetaTags(): ImetaTags {
        return {
            title: `${SiteConf.TITLE} - Devocionais`,
            description: `Devocional é um pequeno tempo que investimos em nossas
             vidas para buscarmos a presença de Deus, sentirmos sua essência
             manifesta, ouvirmos e falarmos com nosso Pai, devocional é buscarmos
             aquilo que é prioridade e primordial para nossa existencia; e aqui
             nós tentamos te ajudar com pequenas palavras que possa te inspirar todos os dias.`,
            img: SiteConf.IMG,
            url: `${SiteConf.URL}/devocionais`,
            site_name: SiteConf.SITE_NAME
        };
    }

}
