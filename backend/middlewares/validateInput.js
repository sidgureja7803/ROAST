const { validationResult, body } = require('express-validator');

// Middleware to validate request
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

// Validation rules for roast requests
const validateRoastRequest = [
  body('text')
    .isString()
    .notEmpty()
    .withMessage('Resume or project text is required'),
  body('roastLevel')
    .isIn(['MILD', 'SPICY', 'EXTRA_BURN'])
    .withMessage('Roast level must be MILD, SPICY, or EXTRA_BURN'),
  validateRequest
];

module.exports = {
  validateRoastRequest
}; 