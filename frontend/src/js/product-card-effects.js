// Enhanced Product Card Effects
document.addEventListener("DOMContentLoaded", () => {
  // Function to add 3D tilt effect to product cards
  function addTiltEffect() {
    const cards = document.querySelectorAll(".product-card")

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
      })
    })
  }

  // Function to add shine effect on hover
  function addShineEffect() {
    const cards = document.querySelectorAll(".product-card")

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const shine = document.createElement("div")
        shine.classList.add("card-shine")
        shine.style.cssText = `
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(30deg);
          animation: shine 1.5s ease-in-out;
          z-index: 1;
          pointer-events: none;
        `

        card.style.overflow = "hidden"
        card.appendChild(shine)

        setTimeout(() => {
          card.removeChild(shine)
        }, 1500)
      })
    })

    // Add the animation to the stylesheet
    const style = document.createElement("style")
    style.textContent = `
      @keyframes shine {
        0% {
          transform: rotate(30deg) translateX(-300%);
        }
        100% {
          transform: rotate(30deg) translateX(300%);
        }
      }
    `
    document.head.appendChild(style)
  }

  // Function to add floating animation to product badges
  function addFloatingBadges() {
    const badges = document.querySelectorAll(".product-badge, .discount-label, .new-product")

    badges.forEach((badge) => {
      badge.style.animation = "float 3s ease-in-out infinite"
    })
  }

  // Initialize effects when products are loaded
  function initializeEffects() {
    // Check if products are loaded
    const productsGrid = document.querySelector(".products-grid")
    if (productsGrid && productsGrid.children.length > 1) {
      addTiltEffect()
      addShineEffect()
      addFloatingBadges()
    } else {
      // If products are not yet loaded, try again after a delay
      setTimeout(initializeEffects, 1000)
    }
  }

  // Start initializing effects
  initializeEffects()

  // Add event listener for dynamic content loading
  document.addEventListener("productsLoaded", initializeEffects)
})
