// Sample product data
const allProducts = [
  {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://via.placeholder.com/300x300",
      rating: 4.5,
      reviewCount: 128,
      badge: "Sale",
      description: "High-quality wireless headphones with noise cancellation technology. Experience crystal clear sound and deep bass with 30 hours of battery life.",
      isNew: false,
      isFeatured: true
  },
  {
      id: 2,
      name: "Slim Fit T-Shirt",
      category: "Clothing",
      price: 24.99,
      originalPrice: 29.99,
      image: "https://via.placeholder.com/300x300",
      rating: 4.2,
      reviewCount: 95,
      badge: null,
      description: "Comfortable slim fit t-shirt made from 100% organic cotton. Perfect for everyday wear.",
      isNew: true,
      isFeatured: true
  },
  {
      id: 3,
      name: "Leather Weekender Bag",
      category: "Accessories",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://via.placeholder.com/300x300",
      rating: 4.8,
      reviewCount: 64,
      badge: "Sale",
      description: "Premium leather weekender bag with ample space for all your travel essentials. Durable and stylish.",
      isNew: false,
      isFeatured: true
  },
  {
      id: 4,
      name: "Smart Watch",
      category: "Electronics",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://via.placeholder.com/300x300",
      rating: 4.3,
      reviewCount: 112,
      badge: "Sale",
      description: "Feature-packed smart watch with heart rate monitor, GPS, and 7-day battery life. Stay connected and track your fitness goals.",
      isNew: false,
      isFeatured: true
  },
  {
      id: 5,
      name: "Wireless Earbuds",
      category: "Electronics",
      price: 89.99,
      originalPrice: 99.99,
      image: "https://via.placeholder.com/300x300",
      rating: 4.1,
      reviewCount: 78,
      badge: null,
      description: "Compact wireless earbuds with excellent sound quality and comfortable fit. Includes charging case for extended battery life.",
      isNew: true,
      isFeatured: false
  },
  {
      id: 6,
      name: "Denim Jacket",
      category: "Clothing",
      price: 79.99,
      originalPrice: null,
      image: "https://via.placeholder.com/300x300",
      rating: 4.4,
      reviewCount: 56,
      badge: null,
      description: "Classic denim jacket with a modern fit. Versatile and durable for everyday wear.",
      isNew: false,
      isFeatured: false
  },
  {
      id: 7,
      name: "Stainless Steel Water Bottle",
      category: "Home & Living",
      price: 29.99,
      originalPrice: null,
      image: "https://via.placeholder.com/300x300",
      rating: 4.7,
      reviewCount: 143,
      badge: "Best Seller",
      description: "Double-walled stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly and durable.",
      isNew: false,
      isFeatured: false
  },
  {
      id: 8,
      name: "Leather Wallet",
      category: "Accessories",
      price: 49.99,
      originalPrice: 59.99,
      image: "https://via.placeholder.com/300x300",
      rating: 4.6,
      reviewCount: 87,
      badge: "Sale",
      description: "Genuine leather wallet with multiple card slots and RFID protection. Slim design fits comfortably in your pocket.",
      isNew: false,
      isFeatured: false
  },
  {
      id: 9,
      name: "Portable Bluetooth Speaker",
      category: "Electronics",
      price: 69.99,
      originalPrice: 89.99,
      image: "https://via.placeholder.com/300x300",
      rating: 4.2,
      reviewCount: 104,
      badge: "Sale",
      description: "Compact Bluetooth speaker with powerful sound and 10-hour battery life. Water-resistant design makes it perfect for outdoor use.",
      isNew: false,
      isFeatured: false
  },
  {
      id: 10,
      name: "Running Shoes",
      category: "Clothing",
      price: 119.99,
      originalPrice: null,
      image: "https://via.placeholder.com/300x300",
      rating: 4.5,
      reviewCount: 132,
      badge: null,
      description: "Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for comfort and performance.",
      isNew: true,
      isFeatured: false
  },
  {
      id: 11,
      name: "Ceramic Coffee Mug Set",
      category: "Home & Living",
      price: 34.99,
      originalPrice: 39.99,
      image: "https://via.placeholder.com/300x300",
      rating: 4.3,
      reviewCount: 68,
      badge: null,
      description: "Set of 4 ceramic coffee mugs in assorted colors. Microwave and dishwasher safe.",
      isNew: false,
      isFeatured: false
  },
  {
      id: 12,
      name: "Sunglasses",
      category: "Accessories",
      price: 59.99,
      originalPrice: null,
      image: "https://via.placeholder.com/300x300",
      rating: 4.4,
      reviewCount: 91,
      badge: null,
      description: "Stylish sunglasses with UV protection. Lightweight frame and polarized lenses for reduced glare.",
      isNew: false,
      isFeatured: false
  }
];

// Function to create a product card
function createProductCard(product) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  return `
      <div class="product-card" data-id="${product.id}">
          <div class="product-image">
              <img src="${product.image}" alt="${product.name}">
              ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
              <div class="product-actions">
                  <button class="action-btn quick-view-btn" title="Quick View">
                      <i class="far fa-eye"></i>
                  </button>
                  <button class="action-btn add-to-cart-btn" title="Add to Cart">
                      <i class="fas fa-shopping-cart"></i>
                  </button>
                  <button class="action-btn wishlist-btn" title="Add to Wishlist">
                      <i class="far fa-heart"></i>
                  </button>
              </div>
          </div>
          <div class="product-info">
              <div class="product-category">${product.category}</div>
              <h3 class="product-title">
                  <a href="product-details.html?id=${product.id}">${product.name}</a>
              </h3>
              <div class="product-rating">
                  <div class="stars">
                      ${getStarRating(product.rating)}
                  </div>
                  <span class="rating-count">(${product.reviewCount})</span>
              </div>
              <div class="product-price">
                  <span class="current-price">$${product.price.toFixed(2)}</span>
                  ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
              </div>
          </div>
      </div>
  `;
}

// Function to generate star rating HTML
function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
  }
  
  // Add half star if needed
  if (halfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

// Function to load featured products on the home page
function loadFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products-container');
  if (!featuredProductsContainer) return;
  
  const featuredProducts = allProducts.filter(product => product.isFeatured);
  
  featuredProducts.forEach(product => {
      featuredProductsContainer.innerHTML += createProductCard(product);
  });
  
  // Add event listeners to the product cards
  addProductCardEventListeners();
}

// Function to load all products on the products page
function loadAllProducts() {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) return;
  
  // Clear the container
  productsContainer.innerHTML = '';
  
  // Add all products
  allProducts.forEach(product => {
      productsContainer.innerHTML += createProductCard(product);
  });
  
  // Update product count
  const productCountElement = document.getElementById('product-count');
  if (productCountElement) {
      productCountElement.textContent = allProducts.length;
  }
  
  // Add event listeners to the product cards
  addProductCardEventListeners();
}

// Function to load related products
function loadRelatedProducts() {
  const relatedProductsContainer = document.getElementById('related-products-container');
  if (!relatedProductsContainer) return;
  
  // Get 4 random products
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  const relatedProducts = shuffled.slice(0, 4);
  
  relatedProducts.forEach(product => {
      relatedProductsContainer.innerHTML += createProductCard(product);
  });
  
  // Add event listeners to the product cards
  addProductCardEventListeners();
}

// Function to add event listeners to product cards
function addProductCardEventListeners() {
  // Quick view buttons
  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  quickViewButtons.forEach(button => {
      button.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productId = productCard.dataset.id;
          // Open quick view modal (to be implemented)
          console.log(`Quick view for product ${productId}`);
      });
  });
  
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productId = productCard.dataset.id;
          addToCart(productId, 1);
      });
  });
  
  // Wishlist buttons
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  wishlistButtons.forEach(button => {
      button.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productId = productCard.dataset.id;
          // Add to wishlist (to be implemented)
          console.log(`Added product ${productId} to wishlist`);
          this.querySelector('i').classList.remove('far');
          this.querySelector('i').classList.add('fas');
      });
  });
}

// Function to add a product to the cart
function addToCart(productId, quantity) {
  // Get the current cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Find the product in the cart
  const existingProductIndex = cart.findIndex(item => item.id == productId);
  
  if (existingProductIndex !== -1) {
      // Product already in cart, update quantity
      cart[existingProductIndex].quantity += quantity;
  } else {
      // Product not in cart, add it
      const product = allProducts.find(p => p.id == productId);
      if (product) {
          cart.push({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: quantity
          });
      }
  }
  
  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update the cart count in the header
  updateCartCount();
  
  // Show a success message
  alert(`${quantity} item(s) added to your cart!`);
}

// Function to update the cart count in the header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
      cartCountElement.textContent = cartCount;
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Load products based on the current page
  if (document.getElementById('featured-products-container')) {
      loadFeaturedProducts();
  }
  
  if (document.getElementById('products-container')) {
      loadAllProducts();
  }
  
  if (document.getElementById('related-products-container')) {
      loadRelatedProducts();
  }
  
  // Update the cart count
  updateCartCount();
});