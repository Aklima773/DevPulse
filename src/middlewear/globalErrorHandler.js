import config from "../config";
export const globalErrorHandler = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Internal Server Error",
        stack: config.node_env === 'development' && err instanceof Error ? err.stack : undefined
    });
};
//# sourceMappingURL=globalErrorHandler.js.map