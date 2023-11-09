import express, { Express, Request, Response , Application, NextFunction } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';
import whatsappRoutes from '../routes/wpp'
import customerRoutes from '../routes/customer'

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

    app.use('/api/whatsapp', whatsappRoutes)

    app.use('/api/customer', customerRoutes)

    return app
}

export default createServer;