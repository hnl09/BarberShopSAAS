import express, { Express, Request, Response , Application } from 'express';
import cors from 'cors';

function createServer() {
    const app: Application = express();

    app.use(express.json());

    app.use(cors());
    
    return app
}

export default createServer;