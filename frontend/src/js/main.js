// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
  // تحميل المنتجات المميزة
  loadFeaturedProducts();
  
  // تهيئة مؤتمر العروض
  startOfferTimer();
  
  // تهيئة متتبع التمرير
  initScrollEffects();
  
  // تهيئة تأثيرات الصور
  initImageHoverEffects();
});

// تحميل المنتجات المميزة
async function loadFeaturedProducts() {
  try {
      // عرض هيكل التحميل
      document.getElementById('featuredProducts').innerHTML = `
          <div class="product-card skeleton" style="height: 400px;"></div>
          <div class="product-card skeleton" style="height: 400px;"></div>
          <div class="product-card skeleton" style="height: 400px;"></div>
      `;
      
      // جلب البيانات من الخلفية
      const response = await fetch('http://localhost:5000/api/products');
      const products = await response.json();
      
      // عرض المنتجات
      let productsHTML = '';
      products.slice(0, 6).forEach(product => {
          productsHTML += `
              <div class="product-card card-3d">
                  <div class="product-badge">جديد</div>
                  <div class="product-image">
                      <img src="https://via.placeholder.com/300" alt="${product.name}" loading="lazy">
                      <div class="quick-view">معاينة سريعة</div>
                  </div>
                  <div class="product-info">
                      <h3 class="product-title">${product.name}</h3>
                      <div class="product-rating">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star-half-alt"></i>
                          <span>(24)</span>
                      </div>
                      <div class="product-price">
                          <span class="current-price">${product.price} ر.س</span>
                          <span class="old-price">${product.price * 1.2} ر.س</span>
                      </div>
                      <div class="product-actions">
                          <button class="add-to-wishlist"><i class="far fa-heart"></i></button>
                          <button class="add-to-cart" data-id="${product._id}">أضف للسلة</button>
                      </div>
                  </div>
              </div>
          `;
      });
      
      document.getElementById('featuredProducts').innerHTML = productsHTML;
      
      // إضافة أحداث لأزرار السلة
      document.querySelectorAll('.add-to-cart').forEach(button => {
          button.addEventListener('click', function() {
              const productId = this.getAttribute('data-id');
              addToCart(productId);
          });
      });
      
  } catch (error) {
      console.error('Error loading products:', error);
      showNotification('حدث خطأ أثناء تحميل المنتجات', 'error');
  }
}

// إدارة سلة التسوق
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification('تمت إضافة المنتج إلى السلة بنجاح', 'success');
  animateCartButton();
}

// تحديث عدد العناصر في السلة
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('.cart-count, .cart-badge').forEach(el => {
      el.textContent = cart.length;
  });
}

// عرض إشعارات
function showNotification(message, type) {
  const notificationBox = document.querySelector('.notification-box');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
  `;
  notificationBox.appendChild(notification);
  
  setTimeout(() => {
      notification.remove();
  }, 3000);
}

// تأثيرات الحركة للسلة
function animateCartButton() {
  const cartBtn = document.querySelector('.floating-cart-btn');
  cartBtn.classList.add('shake');
  setTimeout(() => {
      cartBtn.classList.remove('shake');
  }, 500);
}

// مؤقت العروض الخاصة
function startOfferTimer() {
  let hours = 24;
  let minutes = 59;
  let seconds = 59;
  
  const timer = setInterval(() => {
      seconds--;
      if (seconds < 0) {
          seconds = 59;
          minutes--;
      }
      if (minutes < 0) {
          minutes = 59;
          hours--;
      }
      if (hours < 0) {
          clearInterval(timer);
          return;
      }
      
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }, 1000);
}

// تأثيرات التمرير
function initScrollEffects() {
  window.addEventListener('scroll', function() {
      const nav = document.querySelector('.smart-nav');
      if (window.scrollY > 100) {
          nav.classList.add('scrolled');
      } else {
          nav.classList.remove('scrolled');
      }
      
      // تأثيرات ظهور العناصر
      document.querySelectorAll('.fade-in-section').forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop < window.innerHeight - 100) {
              section.classList.add('fade-in');
          }
      });
  });
}

// تأثيرات الصور
function initImageHoverEffects() {
  document.querySelectorAll('.product-image').forEach(image => {
      image.addEventListener('mousemove', function(e) {
          const x = e.layerX;
          const y = e.layerY;
          const centerX = this.offsetWidth / 2;
          const centerY = this.offsetHeight / 2;
          
          const angleX = (y - centerY) / 10;
          const angleY = (centerX - x) / 10;
          
          this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      });
      
      image.addEventListener('mouseleave', function() {
          this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
  });
}