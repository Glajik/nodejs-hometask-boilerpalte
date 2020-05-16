const getCode = (err) => {
    switch (err.type) {
        case 'validation':
            return 400;
    
        default:
            return 404;
    }
}

// Middleware that returns result of the query
const responseMiddleware = (req, res, next) => {
    if (res.err) {
        const code = getCode(res.err);
        res.status(code).json({
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