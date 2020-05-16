// Middleware that returns result of the query
const responseMiddleware = (err, req, res, next) => {
    switch (err.message) {
        case 'USER_NOT_FOUND':
            res.status(404).json({
                error: true,
                message: 'User not found',
            });
            break;
            
        case 'USER_CREATE_ERROR':
            res.status(400).json({
                error: true,
                message: 'User entity to create isn\'t valid',
            });
            break;

        default:
            res.status(500).json({
                error: true,
                message: err.message,
            });
    }
    next();
}

exports.responseMiddleware = responseMiddleware;