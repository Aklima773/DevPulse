export const logger = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}], ${req.method}, ${req.url}`);
    next();
};
//# sourceMappingURL=logger.js.map