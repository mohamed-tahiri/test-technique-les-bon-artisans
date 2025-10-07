const Joi = require('joi');

// Validation du produit
const productSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    'string.base': 'Le nom du produit doit être une chaîne de caractères.',
    'string.empty': 'Le nom du produit est requis.',
    'any.required': 'Le nom du produit est requis.'
  }),
  type: Joi.string().min(1).required().messages({
    'string.base': 'Le type du produit doit être une chaîne de caractères.',
    'string.empty': 'Le type du produit est requis.',
    'any.required': 'Le type du produit est requis.'
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Le prix doit être un nombre.',
    'number.min': 'Le prix doit être positif.',
    'any.required': 'Le prix est requis.'
  }),
  rating: Joi.number().min(0).max(5).required().messages({
    'number.base': 'La note doit être un nombre.',
    'number.min': 'La note doit être au moins 0.',
    'number.max': 'La note doit être au maximum 5.',
    'any.required': 'La note est requise.'
  }),
  warranty_years: Joi.number().min(0).required().messages({
    'number.base': 'La garantie doit être un nombre.',
    'number.min': 'La garantie doit être positive.',
    'any.required': 'La garantie est requise.'
  }),
  available: Joi.boolean().required().messages({
    'boolean.base': 'Le champ "available" doit être true ou false.',
    'any.required': 'Le champ "available" est requis.'
  })
});

// Middleware de validation
const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = validateProduct;
