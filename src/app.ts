import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { responseError } from './helpers';
import routes from './routes';

const app = express();

const PORT = process.env.PORT || 8000;
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// allow only frontend to connect
app.use(cors({ origin: `http://localhost:${PORT}` }))

// Router
app.use('/', routes);

// Base error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        responseError(res, 500, err.message);
    }
});

export default app;