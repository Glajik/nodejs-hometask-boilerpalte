const getCode = (err) => {
    switch (err.type) {
        case 'validation':
        case 'create':
        case 'delete':
        case 'update':
            return 400;
    
        case 'not_found':
            return 404;
            
        default:
            return 500;
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
    next();
}

exports.responseMiddleware = responseMiddleware;