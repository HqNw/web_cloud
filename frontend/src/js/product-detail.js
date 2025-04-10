document.addEventListener('DOMContentLoaded', function() {
  // Mock allProducts array (replace with actual data source)
  const allProducts = [
      {
          id: 1,
          name: 'Product 1',
          category: 'Category A',
          price: 20.00,
          description: 'Description for Product 1',
          image: 'path/to/product1.jpg'
      },
      {
          id: 2,
          name: 'Product 2',
          category: 'Category B',
          price: 30.00,
          description: 'Description for Product 2',
          image: 'path/to/product2.jpg'
      }
  ];

  // Mock addToCart function (replace with actual implementation)
  function addToCart(productId, quantity) {
      console.log(`Added product ${productId} to cart with quantity ${quantity}`);
      alert(`Added product ${productId} to cart with quantity ${quantity}`);
  }
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  // If no product ID is provided, redirect to products page
  if (!productId) {
      window.location.href = 'products.html';
      return;
  }
  
  // Find the product in the allProducts array
  const product = allProducts.find(p => p.id == productId);
  
  // If product not found, redirect to products page
  if (!product) {
      window.location.href = 'products.html';
      return;
  }
  
  // Update breadcrumb
  const productCategoryElement = document.getElementById('product-category');
  const productNameElement = document.getElementById('product-name');
  
  if (productCategoryElement) {
      productCategoryElement.innerHTML = `<a href="products.html?category=${product.category}">${product.category}</a>`;
  }
  
  if (productNameElement) {
      productNameElement.textContent = product.name;
  }
  
  // Update product details
  const productNameTitle = document.getElementById('detail-product-name');
  const productPrice = document.getElementById('product-price');
  const productDescription = document.getElementById('product-description');
  const mainProductImage = document.getElementById('main-product-image');
  
  if (productNameTitle) {
      productNameTitle.textContent = product.name;
  }
  
  if (productPrice) {
      productPrice.textContent = `$${product.price.toFixed(2)}`;
  }
  
  if (productDescription) {
      productDescription.textContent = product.description;
  }
  
  if (mainProductImage) {
      mainProductImage.src = product.image;
      mainProductImage.alt = product.name;
  }
  
  // Handle thumbnail images
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumbnail, index) => {
      // Set the first thumbnail to the product image
      if (index === 0) {
          thumbnail.src = product.image;
      }
      
      // Add click event to thumbnails
      thumbnail.addEventListener('click', function() {
          // Remove active class from all thumbnails
          thumbnails.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked thumbnail
          this.classList.add('active');
          
          // Update main image
          mainProductImage.src = this.src;
      });
  });
  
  // Handle quantity selector
  const minusBtn = document.querySelector('.minus-btn');
  const plusBtn = document.querySelector('.plus-btn');
  const quantityInput = document.getElementById('quantity-input');
  
  if (minusBtn && plusBtn && quantityInput) {
      minusBtn.addEventListener('click', function() {
          let quantity = parseInt(quantityInput.value);
          if (quantity > 1) {
              quantityInput.value = quantity - 1;
          }
      });
      
      plusBtn.addEventListener('click', function() {
          let quantity = parseInt(quantityInput.value);
          if (quantity < 10) {
              quantityInput.value = quantity + 1;
          }
      });
      
      quantityInput.addEventListener('change', function() {
          let quantity = parseInt(this.value);
          if (isNaN(quantity) || quantity < 1) {
              this.value = 1;
          } else if (quantity > 10) {
              this.value = 10;
          }
      });
  }
  
  // Handle color options
  const colorOptions = document.querySelectorAll('.color-option');
  
  if (colorOptions.length > 0) {
      colorOptions.forEach(option => {
          option.addEventListener('click', function() {
              // Remove active class from all color options
              colorOptions.forEach(o => o.classList.remove('active'));
              
              // Add active class to clicked option
              this.classList.add('active');
              
              // Update selected color text (if needed)
              const selectedColor = this.getAttribute('data-color');
              console.log(`Selected color: ${selectedColor}`);
          });
      });
  }
  
  // Handle size options
  const sizeOptions = document.querySelectorAll('.size-option');
  
  if (sizeOptions.length > 0) {
      sizeOptions.forEach(option => {
          option.addEventListener('click', function() {
              // Remove active class from all size options
              sizeOptions.forEach(o => o.classList.remove('active'));
              
              // Add active class to clicked option
              this.classList.add('active');
              
              // Update selected size text (if needed)
              const selectedSize = this.textContent;
              console.log(`Selected size: ${selectedSize}`);
          });
      });
  }
  
  // Handle add to cart button
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  
  if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function() {
          const quantity = parseInt(quantityInput.value) || 1;
          addToCart(productId, quantity);
      });
  }
  
  // Handle tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length > 0 && tabPanes.length > 0) {
      tabButtons.forEach(button => {
          button.addEventListener('click', function() {
              // Get the tab id
              const tabId = this.getAttribute('data-tab');
              
              // Remove active class from all buttons and panes
              tabButtons.forEach(btn => btn.classList.remove('active'));
              tabPanes.forEach(pane => pane.classList.remove('active'));
              
              // Add active class to current button and pane
              this.classList.add('active');
              document.getElementById(tabId).classList.add('active');
          });
      });
  }
  
  // Handle review form
  const reviewForm = document.getElementById('review-form');
  const ratingStars = document.querySelectorAll('.rating-select i');
  
  if (reviewForm && ratingStars.length > 0) {
      // Handle star rating selection
      ratingStars.forEach(star => {
          star.addEventListener('click', function() {
              const rating = parseInt(this.getAttribute('data-rating'));
              
              // Update star appearance
              ratingStars.forEach((s, index) => {
                  if (index < rating) {
                      s.className = 'fas fa-star active';
                  } else {
                      s.className = 'far fa-star';
                  }
              });
          });
          
          // Handle hover effect
          star.addEventListener('mouseover', function() {
              const rating = parseInt(this.getAttribute('data-rating'));
              
              ratingStars.forEach((s, index) => {
                  if (index < rating) {
                      s.className = 'fas fa-star';
                  } else {
                      s.className = 'far fa-star';
                  }
              });
          });
      });
      
      // Handle form submission
      reviewForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const reviewTitle = document.getElementById('review-title').value;
          const reviewContent = document.getElementById('review-content').value;
          const activeStars = document.querySelectorAll('.rating-select i.active').length;
          
          if (activeStars === 0) {
              alert('Please select a rating');
              return;
          }
          
          if (!reviewTitle || !reviewContent) {
              alert('Please fill in all fields');
              return;
          }
          
          // Submit the review (in a real app, this would send data to a server)
          alert('Thank you for your review!');
          
          // Reset the form
          this.reset();
          ratingStars.forEach(s => s.className = 'far fa-star');
      });
  }
});