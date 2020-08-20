import { Express } from 'express';
import { Router } from 'express';
import { HomeRouter } from './home.router';
import { VideoRouter } from './videos.router';
import { DizimoRouter } from './dizimo.router';
import { DevocionalRouter } from './devocionais.router';
import { EstudoGcRouter } from './estudogc.router';

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

        // Rota Devocional
        const devocionalRoute = new DevocionalRouter(this.app);
        this.router.use('/devocional', devocionalRoute.router);
        // Rota Estudos GC
        const estudoGCRoute = new EstudoGcRouter(this.app);
        this.router.use('/estudos-gc', estudoGCRoute.router);
    }
}
