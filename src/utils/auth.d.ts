import type { Role } from "../types";
import type { Request, Response, NextFunction } from "express";
export declare const auth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const authorization: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.d.ts.map