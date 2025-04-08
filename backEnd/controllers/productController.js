const Product = require('../models/product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const advancedResults = require('../middleware/advancedResults');

// @desc    الحصول على جميع المنتجات
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    الحصول على منتج واحد
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'user',
    select: 'name email'
  });

  if (!product) {
    return next(
      new ErrorResponse(`لم يتم العثور على المنتج بالرقم ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    إنشاء منتج جديد
// @route   POST /api/v1/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  // إضافة المستخدم إلى الجسم
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    تحديث المنتج
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`لم يتم العثور على المنتج بالرقم ${req.params.id}`, 404)
    );
  }

  // التأكد من أن المستخدم هو المالك أو مسؤول
  if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`غير مصرح لك بتحديث هذا المنتج`, 401)
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    حذف المنتج
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`لم يتم العثور على المنتج بالرقم ${req.params.id}`, 404)
    );
  }

  // التأكد من أن المستخدم هو المالك أو مسؤول
  if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`غير مصرح لك بحذف هذا المنتج`, 401)
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});