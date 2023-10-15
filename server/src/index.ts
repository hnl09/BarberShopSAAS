import express, { Express, Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} ${req.ip} ${new Date().toLocaleString()}`);
    next();
});

app.post('/', (req: Request, res: Response) => {
    res.send('Hello World!');
 }
);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
