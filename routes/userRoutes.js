const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.use(createUserValid);

// Create new user
router.post('/', (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  } = req.body;

  // Can't create if user exist
  const user = UserService.search({ email });
  if (user) {
    res.err = new Error('User already exist');
    return next();
  }

  res.data = {};
  next();
});

router.use(responseMiddleware);

module.exports = router;