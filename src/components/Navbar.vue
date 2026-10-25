<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="nav-logo hover-target">
        <img :src="currentImage" alt="Logo" class="logo-image">
        <span class="logo-text" data-text="Scripty2k">
          Scripty2k
          <span class="sparkle sparkle-1">★</span>
          <span class="sparkle sparkle-2">★</span>
          <span class="sparkle sparkle-3">★</span>
        </span>
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

      <button
        type="button"
        class="nav-cv hover-target"
        @click="openCv"
      >
        View CV
      </button>
      
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

    <!-- CV Viewer Overlay -->
    <Teleport to="body">
      <div
        v-if="isCvOpen"
        class="cv-overlay"
        @click.self="closeCv"
        role="dialog"
        aria-modal="true"
        aria-label="Curriculum Vitae"
      >
        <div class="cv-window">
          <div class="cv-window-bar">
            <span class="cv-window-title">Curriculum Vitae</span>
            <div class="cv-window-actions">
              <a
                :href="resumeUrl"
                class="cv-window-btn"
                download="Amal-Rahimli-CV.pdf"
                title="Download CV"
              >
                Download
              </a>
              <button
                type="button"
                class="cv-window-close"
                @click="closeCv"
                aria-label="Close CV viewer"
              >
                &times;
              </button>
            </div>
          </div>
          <div class="cv-window-body">
            <iframe
              :src="`${resumeUrl}#view=FitH`"
              class="cv-iframe"
              title="CV document"
            ></iframe>
          </div>
        </div>
      </div>
    </Teleport>
  </nav>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import animepfp1 from '../assets/animepfp1.png'
import animepfp2 from '../assets/animepfp2.png'

export default {
  name: 'Navbar',
  setup() {
    const isMenuOpen = ref(false)
    const isScrolled = ref(false)
    const imageIndex = ref(0)
    let imageInterval = null
    
    const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Projects', path: '/projects' },
      { name: 'Contact', path: '/contact' }
    ]

    // CV file lives in /public — replace public/resume.pdf with your real CV.
    const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`
    const isCvOpen = ref(false)

    const openCv = () => {
      isCvOpen.value = true
      document.body.style.overflow = 'hidden'
    }

    const closeCv = () => {
      isCvOpen.value = false
      document.body.style.overflow = 'auto'
    }

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

    const handleKeydown = (e) => {
      if (e.key !== 'Escape') return
      if (isCvOpen.value) {
        closeCv()
      } else if (isMenuOpen.value) {
        closeMenu()
      }
    }

    const currentImage = computed(() => {
      const images = [animepfp1, animepfp2]
      return images[imageIndex.value]
    })

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      // Start image switching interval every 1.5 seconds
      imageInterval = setInterval(() => {
        imageIndex.value = (imageIndex.value + 1) % 2
      }, 1000)
      
      // Close menu / CV viewer on escape key
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'auto'
      // Clean up interval when component is destroyed
      if (imageInterval) {
        clearInterval(imageInterval)
      }
    })

    return {
      isMenuOpen,
      isScrolled,
      navLinks,
      toggleMenu,
      closeMenu,
      imageIndex,
      currentImage,
      resumeUrl,
      isCvOpen,
      openCv,
      closeCv
    }
  }
}
</script>

<style scoped>
.navbar {
  background: rgba(255, 240, 223, 0.95);
  backdrop-filter: blur(20px);
  padding: 1.5rem 0;
  position: fixed;
  top: 3px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid rgba(41, 37, 36, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-scrolled {
  padding: 1rem 0;
  background: rgba(255, 240, 223, 0.98);
  border-bottom: 1px solid rgba(41, 37, 36, 0.1);
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
  color: #292524;
  text-decoration: none;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-image {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.2rem;
  flex-shrink: 0;
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

/* Sparkle Animation */
.sparkle {
  position: absolute;
  color: #292524;
  font-size: 0.6rem;
  opacity: 0;
  pointer-events: none;
}

.nav-logo:hover .sparkle-1 {
  animation: sparkle-fade 0.5s ease-out;
}

.nav-logo:hover .sparkle-2 {
  animation: sparkle-fade 0.5s ease-out 0.1s;
}

.nav-logo:hover .sparkle-3 {
  animation: sparkle-fade 0.5s ease-out 0.15s;
}

.sparkle-1 {
  top: -5px;
  left: 20%;
}

.sparkle-2 {
  top: -8px;
  right: 25%;
}

.sparkle-3 {
  bottom: -5px;
  left: 60%;
}

@keyframes sparkle-fade {
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.5) rotate(360deg);
  }
}

.nav-menu {
  display: flex;
  gap: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #292524;
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

.nav-cv {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.1rem;
  margin-left: 2rem;
  background: #292524;
  color: #fff0df;
  border: none;
  font-family: inherit;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 8px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-cv:hover {
  background: #3f3a38;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(41, 37, 36, 0.25);
}

.nav-cv:focus-visible {
  outline: 2px solid rgba(41, 37, 36, 0.5);
  outline-offset: 4px;
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
  background: #292524;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover .nav-link-text {
  transform: translateY(-1px);
}

.nav-link:hover .nav-link-hover {
  width: 100%;
}

.nav-link.router-link-active {
  color: #292524;
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
  background: #292524;
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
    background: rgba(255, 240, 223, 0.98);
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

  .nav-cv {
    margin-left: auto;
    margin-right: 0.75rem;
    padding: 0.5rem 0.85rem;
    font-size: 0.7rem;
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

<style>
/* CV Viewer Overlay — teleported to body, so intentionally not scoped */
.cv-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(20, 18, 17, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: cvOverlayFade 0.25s ease-out;
}

.cv-window {
  display: flex;
  flex-direction: column;
  width: min(1000px, 100%);
  height: min(88vh, 1200px);
  background: #fff0df;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  transform-origin: center;
  animation: cvWindowScale 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.cv-window-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem 0.75rem 1.25rem;
  background: #292524;
  color: #fff0df;
  flex-shrink: 0;
}

.cv-window-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.cv-window-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cv-window-btn {
  padding: 0.4rem 0.85rem;
  background: rgba(255, 240, 223, 0.12);
  color: #fff0df;
  border: 1px solid rgba(255, 240, 223, 0.25);
  border-radius: 7px;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.cv-window-btn:hover {
  background: rgba(255, 240, 223, 0.22);
  border-color: rgba(255, 240, 223, 0.45);
}

.cv-window-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  color: #fff0df;
  border: none;
  border-radius: 7px;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease;
}

.cv-window-close:hover {
  background: rgba(255, 240, 223, 0.15);
}

.cv-window-body {
  flex: 1;
  min-height: 0;
  background: #e7d9c8;
}

.cv-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

@keyframes cvOverlayFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes cvWindowScale {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (max-width: 768px) {
  .cv-overlay {
    padding: 0.75rem;
  }

  .cv-window {
    height: 92vh;
    border-radius: 10px;
  }

  .cv-window-title {
    font-size: 0.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cv-overlay,
  .cv-window {
    animation: none;
  }
}
</style>