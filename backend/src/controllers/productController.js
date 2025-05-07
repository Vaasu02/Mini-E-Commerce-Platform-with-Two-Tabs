const { validationResult } = require('express-validator');
const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, price, description, image_url } = req.body;
    const product = await Product.create({ name, price, description, image_url });
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const updatedProduct = await Product.update(req.params.id, req.body);
    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    await Product.delete(req.params.id);
    res.json({ success: true, data: null, message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const { q, type = 'simple' } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ success: false, error: 'Search query is required' });
    }

    let products;
    if (type === 'contextual') {
      products = await Product.contextualSearch(q);
    } else {
      products = await Product.simpleSearch(q);
    }

    res.json({ 
      success: true, 
      data: products,
      searchType: type,
      query: q
    });
  } catch (err) {
    next(err);
  }
}; 