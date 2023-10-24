import express, { Express, Request, Response , Application, NextFunction } from 'express';
import cors from 'cors';

function createServer() {
    const app: Application = express();

    app.use(express.json());

    app.use(cors());

    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} ${req.path} ${req.ip} ${new Date().toLocaleString()}`);
        next();
    });

    return app
}

export default createServer;