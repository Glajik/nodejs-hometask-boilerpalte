// Middleware that returns result of the query
const responseMiddleware = (req, res, next) => {
    if (res.err) {
        res.status(404).json({
            error: true,
            message: res.err.message,
        });
        return next();
    }
    if (res.data) {
        res.status(200).json(res.data);
        return next();
    }
}

exports.responseMiddleware = responseMiddleware;