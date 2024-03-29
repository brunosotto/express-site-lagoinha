import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { YouTubeProvider } from 'src/providers/youtube.provider';
import { ImetaTags } from '../models/metatags.model';
import { SiteConf } from 'src/enum/siteconf.enum';

export class VideoRouter {

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
            const baseHref = '../';
            const channels = this.youTube.channels;
            const channelKeys = this.youTube.channelKeys;
            // Pegando as metaTags
            const metaTag = this.getMetaTags();
            res.render('videos', {
                channels,
                channelKeys,
                baseHref,
                metaTag,
            });
        });
    }

    private getMetaTags(): ImetaTags {
        return {
            title: `${SiteConf.TITLE} - Videos`,
            description: `Veja abaixo os nossos vídeos dos canais do YouTube
            Lagoinha Promissão e Pastor Nilson Vargens. Aqui você encontra nossas
            playlists separadas por cultos e temas com os vídeos recentes de cada uma delas.`,
            img: SiteConf.IMG,
            url: `${SiteConf.URL}/videos`,
            site_name: SiteConf.SITE_NAME
        };
    }

}
