import express, {} from 'express';
import { logger } from './middlewear/logger';
import { globalErrorHandler } from './middlewear/globalErrorHandler';
import AuthRouter from './api/routes/auth.route';
import cookieParser from 'cookie-parser';
import IssueRouter from './api/routes/issue.route';
const app = express();
app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
    throw Error("Server is dying");
    res.send('Welcome to DevPulse');
});
app.use("/api/auth", AuthRouter);
app.use("/api", IssueRouter);
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map