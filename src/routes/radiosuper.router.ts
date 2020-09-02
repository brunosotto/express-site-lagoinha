import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { ImetaTags } from '../models/metatags.model';

export class RadioSuperRouter {

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
            res.render('radiosuper', {
                baseHref,
                metaTag,
            });
        });
    }

    private getMetaTags(): ImetaTags {
        return {
            title: 'Lagoinha Promissão - Rádio Super',
            description: `Levar a mensagem do amor de Cristo por meio das ondas de rádio.
            Essa é a missão da Rádio Super FM. A emissora faz parte do setor de 
            comunicação da Igreja Batista da Lagoinha e, há um ano, é veiculada online 
            e na frequência 90.1 FM (por enquanto somente em Belo Horizonte – MG).`,
            img: 'https://lagoinhapromissao.com/images/lagoinha-promissao-meta.png',
            url: 'https://lagoinhapromissao.com/radio-super'
        }
    }
}
