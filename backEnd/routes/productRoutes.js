const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/product');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Product, 'user'), getProducts)
  .post(protect, authorize('admin', 'publisher'), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('admin', 'publisher'), updateProduct)
  .delete(protect, authorize('admin', 'publisher'), deleteProduct);

router.route('/:id/photo').put(protect, authorize('admin', 'publisher'), productPhotoUpload);

module.exports = router;