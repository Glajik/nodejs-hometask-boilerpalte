const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// Login action (get the user if it exist with entered credentials)
router.post('/login', (req, res, next) => {
    try {
        AuthService.login(req.body);
        res.data = {};
    } catch (err) {
        err.type = 'not_found';
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;