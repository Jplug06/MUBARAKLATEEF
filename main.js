/**
 * Portfolio Website Main JavaScript
 * Author: Mubarak Lateef
 * Version: 1.0
 */

// Debug function to log information
function debug(message) {
    console.log(message)
    const debugInfo = document.getElementById("debugInfo")
    if (debugInfo) {
      const timestamp = new Date().toLocaleTimeString()
      debugInfo.innerHTML += `<div>[${timestamp}] ${message}</div>`
      debugInfo.scrollTop = debugInfo.scrollHeight
    }
  }
  
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    debug("DOM fully loaded")
  
    // Initialize AOS with error handling
    try {
      if (typeof AOS !== "undefined") {
        debug("Initializing AOS")
        AOS.init({
          duration: 800,
          easing: "ease",
          once: true,
          mirror: false,
        })
      } else {
        debug("WARNING: AOS library not loaded, animations will be disabled")
      }
    } catch (error) {
      debug("ERROR initializing AOS: " + error.message)
    }
  
    // Initialize Particles.js with error handling and fallback
    try {
      if (typeof particlesJS !== "undefined") {
        debug("Initializing Particles.js")
        particlesJS("particles-js", {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#4a63e7",
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#4a63e7",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        })
      } else {
        debug("WARNING: Particles.js library not loaded, using fallback background")
        // Fallback is handled in CSS with a pattern background
      }
    } catch (error) {
      debug("ERROR initializing Particles.js: " + error.message)
    }
  
    // Theme Toggle - Improved implementation
    const themeToggle = document.getElementById("themeToggle")
    const body = document.body
  
    if (themeToggle) {
      debug("Theme toggle found")
  
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme")
      debug("Saved theme: " + savedTheme)
  
      if (savedTheme === "dark") {
        body.classList.add("dark-mode")
        debug("Applied dark mode from saved preference")
      }
  
      themeToggle.addEventListener("click", () => {
        debug("Theme toggle clicked")
        body.classList.toggle("dark-mode")
  
        // Save theme preference
        if (body.classList.contains("dark-mode")) {
          localStorage.setItem("theme", "dark")
          debug("Dark mode activated and saved")
        } else {
          localStorage.setItem("theme", "light")
          debug("Light mode activated and saved")
        }
      })
    } else {
      debug("ERROR: Theme toggle element not found")
    }
  
    // Mobile Menu Toggle
    const hamburger = document.getElementById("hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger && navLinks) {
      debug("Mobile menu elements found")
  
      hamburger.addEventListener("click", () => {
        debug("Hamburger clicked")
        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
      })
  
      // Close mobile menu when clicking a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active")
          navLinks.classList.remove("active")
        })
      })
    } else {
      debug("WARNING: Mobile menu elements not found")
    }
  
    // Sticky Header
    const header = document.querySelector("header")
    if (header) {
      const scrollThreshold = 100
  
      window.addEventListener("scroll", () => {
        if (window.scrollY > scrollThreshold) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      })
    }
  
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll("section")
    const navItems = document.querySelectorAll(".nav-link")
  
    if (sections.length > 0 && navItems.length > 0) {
      window.addEventListener("scroll", () => {
        let current = ""
  
        sections.forEach((section) => {
          const sectionTop = section.offsetTop
          const sectionHeight = section.clientHeight
  
          if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id")
          }
        })
  
        navItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("href").substring(1) === current) {
            item.classList.add("active")
          }
        })
      })
    }
  
    // Back to Top Button
    const backToTopBtn = document.querySelector(".back-to-top")
    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add("active")
        } else {
          backToTopBtn.classList.remove("active")
        }
      })
    }
  
    // Project Filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    if (filterBtns.length > 0 && projectCards.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove active class from all buttons
          filterBtns.forEach((btn) => btn.classList.remove("active"))
  
          // Add active class to clicked button
          btn.classList.add("active")
  
          const filterValue = btn.getAttribute("data-filter")
  
          projectCards.forEach((card) => {
            if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
              card.style.display = "block"
              setTimeout(() => {
                card.style.opacity = "1"
                card.style.transform = "scale(1)"
              }, 100)
            } else {
              card.style.opacity = "0"
              card.style.transform = "scale(0.8)"
              setTimeout(() => {
                card.style.display = "none"
              }, 300)
            }
          })
        })
      })
    }
  
    // Contact Form Submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // Here you would typically send the form data to a server
        debug("Form submitted: " + name + ", " + email + ", " + subject)
  
        // Show success message
        alert("Thank you for your message! I will get back to you soon.")
  
        // Reset form
        contactForm.reset()
      })
    }
  
    // Animate skill bars on scroll
    const skillSection = document.querySelector(".skills")
    const progressBars = document.querySelectorAll(".progress-bar")
  
    if (skillSection && progressBars.length > 0) {
      const animateSkills = () => {
        if (isElementInViewport(skillSection)) {
          progressBars.forEach((bar) => {
            const width = bar.style.width
            bar.style.width = "0"
            setTimeout(() => {
              bar.style.width = width
            }, 100)
          })
  
          // Remove event listener after animation
          window.removeEventListener("scroll", animateSkills)
        }
      }
  
      window.addEventListener("scroll", animateSkills)
    }
  
    // Check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
    }
  
    // Debug panel controls
    const debugPanel = document.getElementById("debugPanel")
    const clearStorageBtn = document.getElementById("clearStorage")
    const toggleDebugBtn = document.getElementById("toggleDebug")
  
    if (clearStorageBtn) {
      clearStorageBtn.addEventListener("click", () => {
        localStorage.clear()
        debug("Local storage cleared")
        location.reload() // Reload to apply changes
      })
    }
  
    if (toggleDebugBtn && debugPanel) {
      toggleDebugBtn.addEventListener("click", () => {
        if (debugPanel.style.display === "none") {
          debugPanel.style.display = "block"
          toggleDebugBtn.textContent = "Hide Debug"
        } else {
          debugPanel.style.display = "none"
          toggleDebugBtn.textContent = "Show Debug"
        }
      })
    }
  
    // Show debug panel with keyboard shortcut (Ctrl+Shift+D)
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        if (debugPanel) {
          debugPanel.style.display = debugPanel.style.display === "none" ? "block" : "none"
        }
      }
    })
  
    // Create placeholder images folder if needed
    debug("Checking for placeholder images")
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      if (img.src.includes("placeholder.svg") || img.src === "" || img.src.includes("images/")) {
        debug("Placeholder image found: " + img.src)
        // This is just a debug message - in a real scenario we might load a fallback image
        img.onerror = function () {
          this.src =
            "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1892f114c44%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1892f114c44%22%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22107.1%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
          debug("Fallback image loaded for: " + img.alt)
        }
      }
    })
  
    debug("Initialization complete")
  })
  
  // Create images folder structure
  function createFolderStructure() {
    debug("Creating folder structure")
    // This is just a placeholder function - in a real scenario,
    // this would be handled by the server or build process
  }
  
  // Helper function to create a fallback image
  function createFallbackImage(width, height, text) {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
  
    // Background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, width, height)
  
    // Text
    ctx.font = "bold 16px Arial"
    ctx.fillStyle = "#999999"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text || "Image", width / 2, height / 2)
  
    return canvas.toDataURL()
  }
  