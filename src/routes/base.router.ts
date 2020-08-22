import { Express } from 'express';
import { Router } from 'express';
import { HomeRouter } from './home.router';
import { VideoRouter } from './videos.router';
import { DizimoRouter } from './dizimo.router';
import { DevocionaisRouter } from './devocionais.router';
import { DevocionalRouter } from './devocional.router';
import { EstudosGcRouter } from './estudosgc.router';
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

        // Rota Devocionais Lista
        const devocionaisRoute = new DevocionaisRouter(this.app);
        this.router.use('/devocionais', devocionaisRoute.router);

        // Rota Devocional Detalhes
        const devocionalRoute = new DevocionalRouter(this.app);
        this.router.use('/devocional', devocionalRoute.router);

        // Rota Estudos Lista GC
        const estudosGCRoute = new EstudosGcRouter(this.app);
        this.router.use('/estudos-gc', estudosGCRoute.router);

        // Rota Estudo GC Detalhes
        const estudoGCRoute = new EstudoGcRouter(this.app);
        this.router.use('/estudo-gc', estudoGCRoute.router);
    }
}
