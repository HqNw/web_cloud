document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
      try {
          const response = await fetch(`http://localhost:5000/api/products/${productId}`);
          const product = await response.json();
          
          document.getElementById('productDetail').innerHTML = `
              <div class="row">
                  <div class="col-md-6">
                      <img src="https://via.placeholder.com/400" class="img-fluid" alt="${product.name}">
                  </div>
                  <div class="col-md-6">
                      <h1>${product.name}</h1>
                      <p class="text-muted">${product.price} ر.س</p>
                      <p>${product.description || 'لا يوجد وصف مفصل'}</p>
                      <button class="btn btn-success btn-lg add-to-cart" data-id="${product._id}">إضافة إلى السلة</button>
                  </div>
              </div>
          `;

          document.querySelector('.add-to-cart').addEventListener('click', function() {
              addToCart(product._id);
          });
      } catch (error) {
          console.error('Error fetching product:', error);
      }
  }
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('تمت إضافة المنتج إلى سلة التسوق');
}
