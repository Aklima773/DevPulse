import express, { type Application, type Request, type Response } from 'express'
import { logger } from './middlewear/logger';

 const app:Application = express();

app.use(logger)
 app.get('/', (req:Request, res:Response)=>{

    res.send('hello')
 })


 export default app;