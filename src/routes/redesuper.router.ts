import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { ImetaTags } from '../models/metatags.model';

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
            title: 'Lagoinha Promissão - TV Online - Rede Super',
            description: 'Assista agora mesmo a Rede Super de Televisão',
            img: 'https://lagoinhapromissao.com/images/lagoinha-promissao-meta.png',
        }
    }

}
