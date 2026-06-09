import authService from "../api/services/auth.service";
import { verifyToken } from "./jwt";
import { sendResponse } from "./sendResponse";
export const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return sendResponse(res, { message: "token not found" }, 401);
    }
    const payload = verifyToken(token, 'access');
    if (!payload) {
        return sendResponse(res, { message: "invalid refresh toekn" }, 401);
    }
    const user = await authService.getUserById(payload.id);
    if (!user) {
        return sendResponse(res, { message: "User not found" }, 401);
    }
    req.user = user;
    next();
};
export const authorization = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.send("unauthorized");
        }
        if (!roles.includes(req.user.role)) {
            return res.send("you dont have permission");
        }
        return next();
    };
};
//# sourceMappingURL=auth.js.map