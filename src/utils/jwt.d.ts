import { type JwtPayload } from "jsonwebtoken";
import type { RUser } from "../types";
export declare const verifyToken: (token: string, type: "access" | "refresh") => JwtPayload;
export declare const signToken: (payload: RUser & {
    id: number;
    name: string;
    role: string;
}) => {
    refreshToken: string;
    accessToken: string;
};
//# sourceMappingURL=jwt.d.ts.map