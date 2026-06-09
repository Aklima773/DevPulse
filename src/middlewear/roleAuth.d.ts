import type { NextFunction, Response } from "express";
export declare const authorizeRole: (...allowedRoles: string[]) => (req: any, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=roleAuth.d.ts.map