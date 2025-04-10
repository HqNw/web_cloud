document.addEventListener('DOMContentLoaded', function() {
  // Load cart items
  loadCartItems();
  
  // Handle update cart button
  const updateCartBtn = document.getElementById('update-cart-btn');
  if (updateCartBtn) {
      updateCartBtn.addEventListener('click', function() {
          updateCart();
      });
  }
  
  // Handle apply coupon button
  const applyCouponBtn = document.getElementById('apply-coupon-btn');
  if (applyCouponBtn) {
      applyCouponBtn.addEventListener('click', function() {
          applyCoupon();
      });
  }
  
  // Handle checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
          // Redirect to checkout page (to be implemented)
          alert('Proceeding to checkout...');
          // window.location.href = 'checkout.html';
      });
  }
  
  // Load related products
  loadRelatedProducts();
});

// Function to load cart items
function loadCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmptyContainer = document.getElementById('cart-empty');
  const cartItemsSection = document.getElementById('cart-items-container');
  const cartSummary = document.querySelector('.cart-summary');
  
  if (!cartItemsContainer || !cartEmptyContainer || !cartItemsSection || !cartSummary) return;
  
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update cart count in header
  updateCartCount();
  
  // If cart is empty, show empty cart message
  if (cart.length === 0) {
      cartEmptyContainer.style.display = 'block';
      cartItemsSection.style.display = 'none';
      cartSummary.style.display = 'none';
      return;
  }
  
  // Cart has items, show cart items
  cartEmptyContainer.style.display = 'none';
  cartItemsSection.style.display = 'block';
  cartSummary.style.display = 'block';
  
  // Clear cart items container
  cartItemsContainer.innerHTML = '';
  
  // Add each cart item
  cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      
      cartItemsContainer.innerHTML += `
          <div class="cart-item" data-id="${item.id}">
              <div class="cart-item-product product-col">
                  <img src="${item.image}" alt="${item.name}">
                  <div class="product-info">
                      <h3>${item.name}</h3>
                      <p>${item.variant || ''}</p>
                  </div>
              </div>
              <div class="cart-item-price price-col">$${item.price.toFixed(2)}</div>
              <div class="cart-item-quantity quantity-col">
                  <div class="quantity-selector">
                      <button class="quantity-btn minus-btn">-</button>
                      <input type="number" value="${item.quantity}" min="1" max="10" class="quantity-input">
                      <button class="quantity-btn plus-btn">+</button>
                  </div>
              </div>
              <div class="cart-item-total total-col">$${itemTotal.toFixed(2)}</div>
              <div class="cart-item-action action-col">
                  <button class="remove-item-btn"><i class="fas fa-trash"></i></button>
              </div>
          </div>
      `;
  });
  
  // Add event listeners to quantity buttons and remove buttons
  addCartItemEventListeners();
  
  // Update cart summary
  updateCartSummary();
}

// Function to add event listeners to cart items
function addCartItemEventListeners() {
  // Quantity minus buttons
  const minusButtons = document.querySelectorAll('.cart-item .minus-btn');
  minusButtons.forEach(button => {
      button.addEventListener('click', function() {
          const input = this.nextElementSibling;
          let quantity = parseInt(input.value);
          if (quantity > 1) {
              input.value = quantity - 1;
              updateItemTotal(this);
          }
      });
  });
  
  // Quantity plus buttons
  const plusButtons = document.querySelectorAll('.cart-item .plus-btn');
  plusButtons.forEach(button => {
      button.addEventListener('click', function() {
          const input = this.previousElementSibling;
          let quantity = parseInt(input.value);
          if (quantity < 10) {
              input.value = quantity + 1;
              updateItemTotal(this);
          }
      });
  });
  
  // Quantity inputs
  const quantityInputs = document.querySelectorAll('.cart-item .quantity-input');
  quantityInputs.forEach(input => {
      input.addEventListener('change', function() {
          let quantity = parseInt(this.value);
          if (isNaN(quantity) || quantity < 1) {
              this.value = 1;
          } else if (quantity > 10) {
              this.value = 10;
          }
          updateItemTotal(this);
      });
  });
  
  // Remove buttons
  const removeButtons = document.querySelectorAll('.cart-item .remove-item-btn');
  removeButtons.forEach(button => {
      button.addEventListener('click', function() {
          const cartItem = this.closest('.cart-item');
          const productId = cartItem.dataset.id;
          removeFromCart(productId);
      });
  });
}

// Function to update item total when quantity changes
function updateItemTotal(element) {
  const cartItem = element.closest('.cart-item');
  const priceElement = cartItem.querySelector('.cart-item-price');
  const quantityInput = cartItem.querySelector('.quantity-input');
  const totalElement = cartItem.querySelector('.cart-item-total');
  
  const price = parseFloat(priceElement.textContent.replace('$', ''));
  const quantity = parseInt(quantityInput.value);
  const total = price * quantity;
  
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Function to update the entire cart
function updateCart() {
  const cartItems = document.querySelectorAll('.cart-item');
  let cart = [];
  
  cartItems.forEach(item => {
      const productId = item.dataset.id;
      const quantity = parseInt(item.querySelector('.quantity-input').value);
      const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
      const name = item.querySelector('.product-info h3').textContent;
      const image = item.querySelector('img').src;
      
      cart.push({
          id: productId,
          name: name,
          price: price,
          image: image,
          quantity: quantity
      });
  });
  
  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart summary
  updateCartSummary();
  
  // Update cart count in header
  updateCartCount();
  
  // Show success message
  alert('Cart updated successfully!');
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  // Get the current cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Remove the item from the cart
  cart = cart.filter(item => item.id != productId);
  
  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Reload cart items
  loadCartItems();
}

// Function to apply a coupon
function applyCoupon() {
  const couponInput = document.getElementById('coupon-input');
  const discountRow = document.getElementById('discount-row');
  const cartDiscount = document.getElementById('cart-discount');
  
  if (!couponInput || !discountRow || !cartDiscount) return;
  
  const couponCode = couponInput.value.trim().toUpperCase();
  
  // Check if coupon is valid (in a real app, this would check against a database)
  if (couponCode === 'WELCOME20') {
      // Get subtotal
      const subtotal = parseFloat(document.getElementById('cart-subtotal').textContent.replace('$', ''));
      
      // Calculate discount (20% off)
      const discount = subtotal * 0.2;
      
      // Show discount row
      discountRow.style.display = 'flex';
      cartDiscount.textContent = `-$${discount.toFixed(2)}`;
      
      // Update total
      updateCartTotal();
      
      // Show success message
      alert('Coupon applied successfully!');
  } else {
      // Invalid coupon
      alert('Invalid coupon code');
      
      // Hide discount row
      discountRow.style.display = 'none';
      
      // Update total
      updateCartTotal();
  }
}

// Function to update cart summary
function updateCartSummary() {
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartShipping = document.getElementById('cart-shipping');
  
  if (!cartSubtotal || !cartShipping) return;
  
  // Calculate subtotal
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Set shipping cost (in a real app, this might vary based on location, weight, etc.)
  const shipping = subtotal > 0 ? 5.99 : 0;
  
  // Update subtotal and shipping
  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartShipping.textContent = `$${shipping.toFixed(2)}`;
  
  // Update total
  updateCartTotal();
}

// Function to update cart total
function updateCartTotal() {
  const cartTotal = document.getElementById('cart-total');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartShipping = document.getElementById('cart-shipping');
  const cartDiscount = document.getElementById('cart-discount');
  const discountRow = document.getElementById('discount-row');
  
  if (!cartTotal || !cartSubtotal || !cartShipping) return;
  
  // Get values
  const subtotal = parseFloat(cartSubtotal.textContent.replace('$', ''));
  const shipping = parseFloat(cartShipping.textContent.replace('$', ''));
  
  // Check if discount is applied
  let discount = 0;
  if (discountRow && discountRow.style.display !== 'none' && cartDiscount) {
      discount = parseFloat(cartDiscount.textContent.replace('-$', ''));
  }
  
  // Calculate total
  const total = subtotal + shipping - discount;
  
  // Update total
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Dummy functions to avoid errors.  In a real application, these would be implemented.
function loadRelatedProducts() {
// Implementation for loading related products
console.log('loadRelatedProducts function called');
}

function updateCartCount() {
// Implementation for updating cart count
console.log('updateCartCount function called');
}