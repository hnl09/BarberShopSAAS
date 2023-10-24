import express, { Express, Request, Response , Application, NextFunction } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';

function createServer() {
    const app: Application = express();

    app.use(express.json());

    app.use(cors());

    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} ${req.path} ${req.ip} ${new Date().toLocaleString()}`);
        next();
    });

    // Routes

    app.use('/api/user', userRoutes)

    return app
}

export default createServer;