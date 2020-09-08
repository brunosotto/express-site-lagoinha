import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { LagoinhaProvider } from 'src/providers/lagoinha.provider';
import { YouTubeProvider } from 'src/providers/youtube.provider';

export class SitemapRouter {

    public router: Router;
    public path: string;
    private proDvGc: LagoinhaProvider;
    private youTube: YouTubeProvider;

    constructor(
        private readonly app: Express,
    ) {
        this.router = Router();
        this.path = '';
        this.proDvGc = this.app.get('lagoinha');
        this.youTube = this.app.get('youTube');
        this.setGet();
    }
    private setGet(): void {
        this.router.get(this.path, (req: Request, res: Response) => {
            const devocionais = this.proDvGc.devocionais;
            const estudogcs = this.proDvGc.estudoGC;
            const lastpublish = this.youTube.lastPublishedAt();
            const lastpublishDev = this.proDvGc.lastPublishedAtDev();
            const lastpublishGc = this.proDvGc.lastPublishedAtGc();
            res.setHeader('content-type', 'text/xml');
            res.render('sitemap', {
                devocionais,
                estudogcs,
                lastpublish,
                lastpublishDev,
                lastpublishGc,
            });
        });
    }
}
