const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.use(createUserValid);

// Create new user
router.post('/', (req, res, next) => {
  console.log('POST')
  res.status(201).json({ message: 'User created' });
});

router.use(responseMiddleware);

module.exports = router;