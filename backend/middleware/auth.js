const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');
const asyncHandler = require('../utils/asyncHandler');

// حماية المسارات بواسطة JWT
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // التأكد من وجود التوكن
  if (!token) {
    return next(new ErrorResponse('غير مصرح بالدخول إلى هذا المسار', 401));
  }

  try {
    // التحقق من التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse('غير مصرح بالدخول إلى هذا المسار', 401));
  }
});

// صلاحيات الأدوار (مثال: admin)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `المستخدم ذو الدور ${req.user.role} غير مصرح له بالوصول`,
          403
        )
      );
    }
    next();
  };
};