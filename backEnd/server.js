require('dotenv').config(); // تحميل متغيرات البيئة من ملف .env
const app = require('./app');
const connectDB = require('./config/db');

// الاتصال بقاعدة البيانات
connectDB();

// تعريف PORT من البيئة أو استخدام 5000 افتراضيًا
const PORT = process.env.PORT || 5000;

// بدء الخادم
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// معالجة الأخطاء غير الملتقطة
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});