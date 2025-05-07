const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const productController = require('../controllers/productController');

// Validation rules for creating a product
const createProductValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('image_url').optional().isURL().withMessage('Image URL must be valid'),
];

// Validation rules for updating a product
const updateProductValidation = [
  body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
  body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('image_url').optional().isURL().withMessage('Image URL must be valid'),
];

// POST /api/products - Create product
router.post('/', createProductValidation, productController.createProduct);

// GET /api/products - Get all products
router.get('/', productController.getAllProducts);

// GET /api/products/search?q=keyword - Search products (must be before /:id route)
router.get('/search', productController.searchProducts);

// GET /api/products/:id - Get single product
router.get('/:id', productController.getProductById);

// PUT /api/products/:id - Update product
router.put('/:id', updateProductValidation, productController.updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;