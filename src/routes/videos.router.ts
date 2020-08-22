import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { YouTubeProvider } from 'src/providers/youtube.provider';

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
            res.render('videos', { channels, baseHref });
        });
    }

}
