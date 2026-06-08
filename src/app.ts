import express, { type Application, type Request, type Response } from 'express'
import { logger } from './middlewear/logger';
import { globalErrorHandler } from './middlewear/globalErrorHandler';
import AuthRouter from './api/routes/auth.route';
import cookieParser from 'cookie-parser';
import IssueRouter from './api/routes/issue.route';

 const app:Application = express();

app.use(logger)
app.use(cookieParser())
app.use(express.json())
app.get('/', (req:Request, res:Response)=>{
  //  throw Error ("Server is dying")

    res.send('hello')
 })


app.use("/api/auth", AuthRouter)
app.use("/api", IssueRouter)
 app.use(globalErrorHandler)
 export default app;