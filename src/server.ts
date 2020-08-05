import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import path from 'path';
import { BaseRouter } from './routes/base.router';
import { createServer, Server } from 'http';
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { wLogger } from './shared/logger';
import { Express } from 'express';
import cors from 'cors';
import { YouTubeProvider } from './providers/youtube.provider';

export class AppServer {
    public static readonly PORT: number = 8080;
    public app: Express;
    private server: Server;
    private port: string | number;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.port = Number(process.env.PORT || 3000);

        this.configureApp();
        this.listen();
    }

    private configureApp(): void {
        // CORS
        this.app.use(cors());
        this.app.options('*', cors());

        // Add middleware/settings/routes to express.
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());

        // youtube
        this.app.set('youTube', new YouTubeProvider());

        // api
        const baseRouter = new BaseRouter(this.app);
        this.app.use('/', baseRouter.router);

        // public
        const staticDir = path.join(__dirname, 'public');
        this.app.use(express.static(staticDir));

        // views
        const viewsDir = path.join(__dirname, 'views');
        this.app.set('views', viewsDir);
        this.app.set('view engine', 'ejs');

        // 404
        this.app.get('/*', (req: Request, res: Response) => {
            res.status(NOT_FOUND).sendFile('404.html', { root: viewsDir });
        });

        // error handler
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            const debugMode = req.app.get('env') === 'development';

            // status do erro. Aproveita o status passado se diferente de 200
            res.status(res.statusCode !== OK ? res.statusCode : INTERNAL_SERVER_ERROR);

            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.statusCode = res.statusCode;
            res.locals.error = debugMode ? err : {};

            // render the error page
            res.render(debugMode ? 'errorDebug' : 'error');
        });
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            wLogger.info('Express server started on port: ' + this.port);
        });
    }
}
