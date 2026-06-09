import type { RUser } from "../../types";
declare class AuthService {
    createUser(user: RUser & {
        password: string;
    }): Promise<Record<string, any> | undefined>;
    validateUser(email: string, password: string): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("../../types").Role;
        created_at: Date;
        updated_at: Date;
    } | null>;
    getUserById(id: string): Promise<RUser & {
        id: number;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map