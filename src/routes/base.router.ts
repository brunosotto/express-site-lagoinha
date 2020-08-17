import { DizimoRouter } from './dizimo.router';
import { Express } from 'express';
import { Router } from 'express';
import { HomeRouter } from './home.router';
import { VideoRouter } from './videos.router';

export class BaseRouter {
    public router: Router;

    constructor(
        private readonly app: Express,
    ) {
        this.router = Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        // home
        const homeRoute = new HomeRouter(this.app);
        this.router.use('/', homeRoute.router);

        // Rota Videos (Lista)
        const videoRoute = new VideoRouter(this.app);
        this.router.use('/videos', videoRoute.router);

        // Rota Dizimo
        const dizimoRoute = new DizimoRouter(this.app);
        this.router.use('/dizimo', dizimoRoute.router);
    }
}
