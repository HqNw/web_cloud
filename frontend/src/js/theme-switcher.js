// تهيئة تبديل الثيمات
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeStyle = document.getElementById('theme-style');
  
  // التحقق من التفضيل المحفوظ
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
  
  // حدث تبديل الثيم
  themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      setTheme(currentTheme);
      localStorage.setItem('theme', currentTheme);
  });
});

function setTheme(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggle.setAttribute('title', 'الوضع الفاتح');
  } else {
      document.body.classList.remove('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      themeToggle.setAttribute('title', 'الوضع المظلم');
  }
}