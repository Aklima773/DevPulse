import jwt, {} from "jsonwebtoken";
import config from "../config";
export const verifyToken = (token, type) => {
    const secret = type === "access" ? config.jwt_secret : config.refresh_secret;
    const decode = jwt.verify(token, secret);
    return decode;
};
export const signToken = (payload) => {
    //accessToken =>data access
    const accessToken = jwt.sign(payload, config.jwt_secret, {
        expiresIn: "1d"
    });
    //refreshToken => accessToken abr generate korbe
    const refreshToken = jwt.sign(payload, config.refresh_secret, {
        expiresIn: "7d"
    });
    return { refreshToken, accessToken };
};
//# sourceMappingURL=jwt.js.map