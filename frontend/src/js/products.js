document.addEventListener('DOMContentLoaded', async function() {
  try {
      const response = await fetch('http://localhost:5000/api/products');
      const products = await response.json();
      
      const container = document.getElementById('productsContainer');
      
      products.forEach(product => {
          container.innerHTML += `
              <div class="col-md-4 mb-4">
                  <div class="card h-100">
                      <img src="https://via.placeholder.com/150" class="card-img-top" alt="${product.name}">
                      <div class="card-body">
                          <h5 class="card-title">${product.name}</h5>
                          <p class="card-text">${product.description || 'لا يوجد وصف'}</p>
                          <p class="text-muted">${product.price} ر.س</p>
                          <a href="product-detail.html?id=${product._id}" class="btn btn-primary">التفاصيل</a>
                          <button class="btn btn-success add-to-cart" data-id="${product._id}">إضافة للسلة</button>
                      </div>
                  </div>
              </div>
          `;
      });

      // إضافة حدث لأزرار إضافة إلى السلة
      document.querySelectorAll('.add-to-cart').forEach(button => {
          button.addEventListener('click', function() {
              const productId = this.getAttribute('data-id');
              addToCart(productId);
          });
      });
  } catch (error) {
      console.error('Error fetching products:', error);
  }
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('تمت إضافة المنتج إلى سلة التسوق');
}