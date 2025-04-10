document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const menu = document.querySelector(".menu")
  
    if (mobileMenuBtn && menu) {
      mobileMenuBtn.addEventListener("click", function () {
        menu.classList.toggle("active")
  
        // Toggle the hamburger icon
        const spans = this.querySelectorAll("span")
        if (menu.classList.contains("active")) {
          spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
          spans[1].style.opacity = "0"
          spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
        } else {
          spans[0].style.transform = "none"
          spans[1].style.opacity = "1"
          spans[2].style.transform = "none"
        }
      })
    }
  
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".dot")
    let currentSlide = 0
  
    if (testimonialSlides.length > 0 && dots.length > 0) {
      // Function to show a specific slide
      function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach((slide) => {
          slide.style.display = "none"
        })
  
        // Remove active class from all dots
        dots.forEach((dot) => {
          dot.classList.remove("active")
        })
  
        // Show the selected slide and activate the corresponding dot
        testimonialSlides[index].style.display = "block"
        dots[index].classList.add("active")
  
        // Update current slide index
        currentSlide = index
      }
  
      // Add click event to dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index)
        })
      })
  
      // Auto slide change
      setInterval(() => {
        const nextSlide = (currentSlide + 1) % testimonialSlides.length
        showSlide(nextSlide)
      }, 5000)
    }
  
    // Newsletter form submission
    const newsletterForm = document.getElementById("newsletter-form")
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const emailInput = this.querySelector('input[type="email"]')
        if (emailInput && emailInput.value) {
          alert(`Thank you for subscribing with ${emailInput.value}!`)
          emailInput.value = ""
        }
      })
    }
  
    // Search icon functionality
    const searchIcon = document.getElementById("search-icon")
    if (searchIcon) {
      searchIcon.addEventListener("click", (e) => {
        e.preventDefault()
        // Create and show search overlay
        const searchOverlay = document.createElement("div")
        searchOverlay.className = "search-overlay"
        searchOverlay.innerHTML = `
                <div class="search-container">
                    <form class="search-form">
                        <input type="text" placeholder="Search for products..." autofocus>
                        <button type="submit"><i class="fas fa-search"></i></button>
                    </form>
                    <button class="close-search"><i class="fas fa-times"></i></button>
                </div>
            `
        document.body.appendChild(searchOverlay)
        document.body.style.overflow = "hidden"
  
        // Close search overlay
        const closeSearch = searchOverlay.querySelector(".close-search")
        closeSearch.addEventListener("click", () => {
          document.body.removeChild(searchOverlay)
          document.body.style.overflow = ""
        })
  
        // Handle search form submission
        const searchForm = searchOverlay.querySelector(".search-form")
        searchForm.addEventListener("submit", function (e) {
          e.preventDefault()
          const searchInput = this.querySelector("input")
          if (searchInput && searchInput.value) {
            // Redirect to products page with search query
            window.location.href = `product.html?search=${encodeURIComponent(searchInput.value)}`
          }
        })
      })
    }
  
    // User icon functionality
    const userIcon = document.getElementById("user-icon")
    if (userIcon) {
      userIcon.addEventListener("click", function (e) {
        e.preventDefault()
        // Create and show user menu
        const userMenu = document.createElement("div")
        userMenu.className = "user-menu"
        userMenu.innerHTML = `
                <ul>
                    <li><a href="#"><i class="fas fa-user"></i> My Account</a></li>
                    <li><a href="#"><i class="fas fa-heart"></i> Wishlist</a></li>
                    <li><a href="#"><i class="fas fa-box"></i> Orders</a></li>
                    <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                    <li><a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
            `
  
        // Position the menu
        const rect = this.getBoundingClientRect()
        userMenu.style.position = "absolute"
        userMenu.style.top = `${rect.bottom + window.scrollY}px`
        userMenu.style.right = `${window.innerWidth - rect.right}px`
  
        document.body.appendChild(userMenu)
  
        // Close the menu when clicking outside
        function closeUserMenu(e) {
          if (!userMenu.contains(e.target) && e.target !== userIcon) {
            document.body.removeChild(userMenu)
            document.removeEventListener("click", closeUserMenu)
          }
        }
  
        // Delay adding the event listener to prevent immediate closing
        setTimeout(() => {
          document.addEventListener("click", closeUserMenu)
        }, 0)
      })
    }
  
    // Add CSS for the search overlay and user menu
    const style = document.createElement("style")
    style.textContent = `
        .search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .search-container {
            width: 80%;
            max-width: 600px;
            position: relative;
        }
        
        .search-form {
            display: flex;
            width: 100%;
        }
        
        .search-form input {
            flex: 1;
            padding: 15px;
            font-size: 1.2rem;
            border: none;
            border-radius: 4px 0 0 4px;
        }
        
        .search-form button {
            padding: 0 20px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
        }
        
        .close-search {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .user-menu {
            background-color: white;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 100;
            min-width: 200px;
        }
        
        .user-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .user-menu li {
            border-bottom: 1px solid #eee;
        }
        
        .user-menu li:last-child {
            border-bottom: none;
        }
        
        .user-menu a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 15px;
            color: var(--text-color);
            transition: background-color 0.3s;
        }
        
        .user-menu a:hover {
            background-color: #f5f5f5;
        }
    `
    document.head.appendChild(style)
  })
  