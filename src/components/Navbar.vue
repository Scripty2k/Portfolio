<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="nav-logo hover-target">
        <span class="logo-text" data-text="Scripty2k">Scripty2k</span>
      </router-link>
      
      <div class="nav-menu" :class="{ active: isMenuOpen }">
        <router-link 
          v-for="(link, index) in navLinks" 
          :key="link.path"
          :to="link.path" 
          class="nav-link hover-target" 
          :class="isMenuOpen ? `animate-delay-${(index + 1)}00` : ''"
          @click="closeMenu"
        >
          <span class="nav-link-text">{{ link.name }}</span>
          <span class="nav-link-hover"></span>
        </router-link>
      </div>
      
      <div 
        class="nav-toggle hover-target" 
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
    
    <!-- Mobile menu overlay -->
    <div class="mobile-overlay" :class="{ active: isMenuOpen }" @click="closeMenu"></div>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Navbar',
  setup() {
    const isMenuOpen = ref(false)
    const isScrolled = ref(false)
    
    const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Projects', path: '/projects' },
      { name: 'Contact', path: '/contact' }
    ]

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
      
      // Prevent body scroll when menu is open
      if (isMenuOpen.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }

    const closeMenu = () => {
      isMenuOpen.value = false
      document.body.style.overflow = 'auto'
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen.value) {
          closeMenu()
        }
      })
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = 'auto'
    })

    return {
      isMenuOpen,
      isScrolled,
      navLinks,
      toggleMenu,
      closeMenu
    }
  }
}
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1.5rem 0;
  position: fixed;
  top: 3px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-scrolled {
  padding: 1rem 0;
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.nav-logo {
  font-size: 1.8rem;
  font-weight: 900;
  color: #000;
  text-decoration: none;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  position: relative;
  transition: all 0.3s ease;
}

.logo-text {
  position: relative;
  display: inline-block;
}

.logo-text::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  color: #666;
  overflow: hidden;
  transition: width 0.3s ease;
}

.nav-logo:hover .logo-text::before {
  width: 100%;
}

.nav-menu {
  display: flex;
  gap: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #000;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.nav-link-text {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.nav-link-hover {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #000;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover .nav-link-text {
  transform: translateY(-1px);
}

.nav-link:hover .nav-link-hover {
  width: 100%;
}

.nav-link.router-link-active {
  color: #000;
}

.nav-link.router-link-active .nav-link-hover {
  width: 100%;
  height: 2px;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.nav-toggle:hover {
  transform: scale(1.1);
}

.bar {
  width: 24px;
  height: 2px;
  background: #000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.mobile-overlay {
  display: none;
}

/* Enhanced mobile menu animations */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem 0;
  }

  .nav-container {
    padding: 0 1rem;
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 0;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(30px);
    width: 100%;
    height: 100vh;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 8rem 0 3rem;
    gap: 2rem;
    justify-content: flex-start;
    overflow-y: auto;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-menu.active .nav-link {
    animation: slideInFromLeft 0.5s ease-out forwards;
    opacity: 0;
  }

  .nav-toggle {
    display: flex;
    z-index: 1001;
  }

  .nav-toggle.active {
    transform: rotate(180deg);
  }

  .nav-toggle.active .bar:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  .nav-toggle.active .bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .nav-toggle.active .bar:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  .nav-link {
    font-size: 1.5rem;
    padding: 1rem 0;
    position: relative;
  }

  .nav-link::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%);
    transition: all 0.3s ease;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  .nav-link:hover::before {
    width: 200px;
    height: 200px;
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
  }

  .mobile-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  /* Staggered animation delays */
  .animate-delay-100 { animation-delay: 0.1s; }
  .animate-delay-200 { animation-delay: 0.2s; }
  .animate-delay-300 { animation-delay: 0.3s; }
  .animate-delay-400 { animation-delay: 0.4s; }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Navbar entrance animation */
.navbar {
  animation: slideInFromTop 0.8s ease-out;
}

@keyframes slideInFromTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Logo pulse effect on load */
.nav-logo {
  animation: logoPulse 2s ease-in-out;
}

@keyframes logoPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Enhanced focus states for accessibility */
.nav-link:focus,
.nav-toggle:focus,
.nav-logo:focus {
  outline: 2px solid rgba(0, 0, 0, 0.5);
  outline-offset: 4px;
  border-radius: 2px;
}
</style>