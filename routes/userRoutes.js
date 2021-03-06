const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// Route controllers for user

router.use(createUserValid);
router.use(updateUserValid);

// Get all users
router.get('/', (req, res, next) => {
  try {
    const result = UserService.read();
    if (!result) {
      throw new Error('No users');
    }
    res.data = result;
  } catch (error) {
    error.type = 'not_found';
    res.err = error;
  } finally {
    next();
  }
  res.data = {};
  next();
});

// Get user
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  try {
    const result = UserService.search({ id });
    if (!result) {
      throw new Error('User not found');
    }
    res.data = result;
  } catch (error) {
    error.type = 'not_found';
    res.err = error;
  } finally {
    next();
  }
  res.data = {};
  next();
});

// Create user
router.post('/', (req, res, next) => {
  if (req.err) {
    return next();
  }

  const userData = req.body;
  
  try {
    const result = UserService.create(userData);
    if (!result) {
      throw new Error('User already exist');
    }
    res.data = {};
  } catch (error) {
    error.type = 'create';
    res.err = error;
  } finally {
    next();
  }
});

// Update user
router.put('/:id', (req, res, next) => {
  if (req.err) {
    return next();
  }
  
  const { id } = req.params;
  const userData = req.body;

  try {
    const result = UserService.update(id, userData);
    if (!result) {
      throw new Error('User entity to update is not exist');
    }
    res.data = {};
  } catch (error) {
    error.type = 'not_found';
    res.err = error;
  } finally {
    next();
  }
  res.data = {};
  next();
});


// Delete user
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  
  try {
    const result = UserService.delete(id);
    if (!result.length) {
      throw new Error('User entity to delete is not exist');
    }
    res.data = {};
  } catch (error) {
    error.type = 'delete';
    res.err = error;
  } finally {
    next();
  }
});

router.use(responseMiddleware);

module.exports = router;