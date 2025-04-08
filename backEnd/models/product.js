const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'الرجاء إدخال اسم المنتج'],
      trim: true,
      maxlength: [100, 'لا يمكن أن يتجاوز اسم المنتج 100 حرف']
    },
    price: {
      type: Number,
      required: [true, 'الرجاء إدخال سعر المنتج'],
      max: [999999, 'السعر لا يمكن أن يتجاوز 999,999'],
      set: v => Math.round(v * 100) / 100 // تقريب إلى منزلتين عشريتين
    },
    description: {
      type: String,
      required: [true, 'الرجاء إدخال وصف المنتج']
    },
    images: [
      {
        public_id: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    category: {
      type: String,
      required: [true, 'الرجاء تحديد الفئة'],
      enum: {
        values: ['إلكترونيات', 'ملابس', 'أثاث', 'كتب', 'أخرى'],
        message: 'الرجاء تحديد فئة صالحة'
      }
    },
    stock: {
      type: Number,
      required: [true, 'الرجاء إدخال الكمية المتاحة'],
      max: [9999, 'الكمية لا يمكن أن تتجاوز 9999'],
      default: 0
    },
    ratings: {
      type: Number,
      default: 0
    },
    numOfReviews: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true
        },
        name: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        }
      }
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// فهرسة للحصول على نتائج بحث أسرع
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);