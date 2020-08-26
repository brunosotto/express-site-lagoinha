import { Express } from 'express';
import { Request, Response, Router } from 'express';
import { YouTubeProvider } from 'src/providers/youtube.provider';

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
            res.render('home', { channels, channelKeys });
        });
    }

}
