import authService from "../services/auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken, verifyToken } from "../../utils/jwt";
export const signup = async (req, res) => {
    const user = await authService.createUser(req.body);
    if (!user) {
        sendResponse(res, { message: "Failed to Create User" }, 400);
        return;
    }
    sendResponse(res, { message: "User Created Successfully!", data: user }, 201);
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.validateUser(email, password);
    if (!user) {
        sendResponse(res, { message: "Invalid Email and Password" }, 401);
        return;
    }
    const { accessToken, refreshToken } = signToken(user);
    res.cookie("refreshToken", refreshToken, {
        sameSite: 'lax',
        httpOnly: true,
        secure: false
    });
    const result = {
        user: user,
        accessToken,
        refreshToken
    };
    return sendResponse(res, { message: "Login successful!", data: result }, 200);
};
export const refresh = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return sendResponse(res, { message: "refresh token not found" }, 401);
    }
    const payload = verifyToken(refreshToken, 'refresh');
    if (!payload) {
        return sendResponse(res, { message: "invalid refresh toekn" }, 401);
    }
    // console.log(payload)
    const user = await authService.getUserById(payload.id);
    if (!user) {
        return sendResponse(res, { message: "User not found" }, 401);
    }
    // console.log(user)
    const { accessToken, refreshToken: newRefreshToken } = signToken(user);
    res.cookie("refreshToken", newRefreshToken, {
        secure: false,
        sameSite: 'lax',
        httpOnly: true
    });
    sendResponse(res, {
        message: "Token refreshed", data: {
            accessToken,
            newRefreshToken
        }
    });
};
//# sourceMappingURL=auth.controller.js.map