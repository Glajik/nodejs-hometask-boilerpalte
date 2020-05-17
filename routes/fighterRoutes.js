const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
router.use(createFighterValid);
router.use(updateFighterValid);

// Get all fighters
router.get('/', (req, res, next) => {
  try {
    const result = FighterService.read();
    if (!result.length) {
      throw new Error('No any fighter');
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

// Get fighter
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  try {
    const result = FighterService.search({ id });
    if (!result) {
      throw new Error('Fighter no found');
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

// Create new fighter
router.post('/', (req, res, next) => {
  const fighterData = req.body;
  
  try {
    const result = FighterService.create(fighterData);
    if (!result) {
      throw new Error('Fighter already exist');
    }
    res.data = {};
  } catch (error) {
    error.type = 'create';
    res.err = error;
  } finally {
    next();
  }
});

router.use(responseMiddleware);

module.exports = router;