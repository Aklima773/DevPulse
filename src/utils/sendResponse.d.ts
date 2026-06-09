import type { Response } from "express";
export declare function sendResponse<T>(res: Response, { message, data, error }: {
    message: unknown;
    data?: T;
    error?: boolean;
}, status?: number): void;
//# sourceMappingURL=sendResponse.d.ts.map