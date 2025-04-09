const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload
} = require('../controllers/productController');

const Product = require('../models/product');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(Product, 'reviews'), getProducts)
  .post(protect, authorize('publisher', 'admin'), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('publisher', 'admin'), updateProduct)
  .delete(protect, authorize('publisher', 'admin'), deleteProduct);

router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), productPhotoUpload);

module.exports = router;