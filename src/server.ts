import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes/base.router';
import createError from 'http-errors';
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';

// Init express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/', BaseRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(NOT_FOUND);
    next(createError(NOT_FOUND));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const debugMode = req.app.get('env') === 'development';

    // status do erro. Aprovita o status passado se diferente de 200
    res.status(res.statusCode !== OK ? res.statusCode : INTERNAL_SERVER_ERROR);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.statusCode = res.statusCode;
    res.locals.error = debugMode ? err : {};

    // render the error page
    res.render(debugMode ? 'errorDebug' : 'error');
});

// Export express instance
export default app;
