// Scroll Reveal Effect
document.addEventListener("DOMContentLoaded", () => {
  // Reveal elements on scroll
  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal")
    const staggered = document.querySelectorAll(".stagger-children")

    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight
      const elementTop = reveals[i].getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active")
      }
    }

    for (let i = 0; i < staggered.length; i++) {
      const windowHeight = window.innerHeight
      const elementTop = staggered[i].getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < windowHeight - elementVisible) {
        staggered[i].classList.add("active")
      }
    }
  }

  // Scroll indicator
  function updateScrollIndicator() {
    const scrollIndicator = document.querySelector(".scroll-indicator")
    if (scrollIndicator) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      scrollIndicator.style.width = scrolled + "%"
    }
  }

  // 3D Card Tilt Effect
  const cards = document.querySelectorAll(".card-3d")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
    })
  })

  // Add scroll indicator to the page
  const scrollIndicator = document.createElement("div")
  scrollIndicator.className = "scroll-indicator"
  document.body.appendChild(scrollIndicator)

  // Add event listeners
  window.addEventListener("scroll", revealOnScroll)
  window.addEventListener("scroll", updateScrollIndicator)

  // Initial check
  revealOnScroll()
  updateScrollIndicator()
})
