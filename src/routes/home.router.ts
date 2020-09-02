import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { YouTubeProvider } from 'src/providers/youtube.provider';
import { ImetaTags } from '../models/metatags.model';

export class HomeRouter {

    public router: Router;
    public path: string;
    private youTube: YouTubeProvider;

    constructor(
        private readonly app: Express,
    ) {
        this.router = Router();
        this.path = '';

        this.youTube = this.app.get('youTube');

        this.setGet();
    }

    private setGet(): void {
        this.router.get(this.path, (req: Request, res: Response) => {
            const channelKeys = this.youTube.channelKeys;
            const channels = this.youTube.channels;
            // Pegando as metaTags
            const metaTag = this.getMetaTags();
            res.render('home', {
                channels,
                channelKeys,
                metaTag,
            });
        });
    }

    private getMetaTags(): ImetaTags {
        return {
            title: 'Lagoinha Promissão',
            description: `Igreja Bastista Lagoinha Promissão - 
            A Igreja Batista da Lagoinha nasceu em Belo Horizonte e há 60 anos 
            atua de forma relevante na expansão do evangelho.`,
            img: 'https://lagoinhapromissao.com/images/lagoinha-promissao-meta.png',
            url: 'https://lagoinhapromissao.com/'
        }
    }

}
