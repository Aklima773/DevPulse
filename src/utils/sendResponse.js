export function sendResponse(res, { message, data, error }, status = 200) {
    res.status(status).json({
        success: error ? false : true,
        message: message,
        data: error ? undefined : data,
    });
}
//# sourceMappingURL=sendResponse.js.map