<script setup>
import Navbar from './components/Navbar.vue'
import RetroToggleButton from './components/RetroToggleButton.vue'
import RetroNotification from './components/RetroNotification.vue'
import { useScrollAnimations, useScrollProgress, useMouseTracker } from './composables/useAnimations.js'
import { useRetroTheme } from './composables/useRetroTheme.js'
import { onMounted, ref, nextTick } from 'vue'

// Initialize scroll animations
useScrollAnimations()

// Get scroll progress for progress bar
const { scrollProgress } = useScrollProgress()

// Mouse tracking for custom cursor
const { mouseX, mouseY } = useMouseTracker()

// Retro theme functionality
const { isRetroMode, showNotification, notificationMessage } = useRetroTheme()

const cursor = ref(null)
const cursorDot = ref(null)

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Add smooth scrolling behavior and cursor tracking
onMounted(async () => {
  // Wait for next tick to ensure refs are available
  await nextTick()
  
  // Smooth scroll for anchor links
  document.documentElement.style.scrollBehavior = 'smooth'
  
  // Add loading animation to body
  document.body.classList.add('loaded')
  
  // Custom cursor tracking
  if (cursor.value && cursorDot.value) {
    const updateCursor = () => {
      if (cursor.value && cursorDot.value) {
        cursor.value.style.left = mouseX.value + 'px'
        cursor.value.style.top = mouseY.value + 'px'
        cursorDot.value.style.left = mouseX.value + 'px'
        cursorDot.value.style.top = mouseY.value + 'px'
      }
    }
    
    // Update cursor position
    const animateCursor = () => {
      updateCursor()
      requestAnimationFrame(animateCursor)
    }
    animateCursor()
    
    // Add hover effects for interactive elements
    const addCursorHover = () => {
      const interactiveElements = document.querySelectorAll('a, button, .hover-target')
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (cursor.value) {
            cursor.value.style.transform = 'scale(1.5)'
            cursor.value.style.borderColor = 'rgba(0, 0, 0, 0.5)'
          }
        })
        
        el.addEventListener('mouseleave', () => {
          if (cursor.value) {
            cursor.value.style.transform = 'scale(1)'
            cursor.value.style.borderColor = 'rgba(0, 0, 0, 0.2)'
          }
        })
      })
    }
    
    // Initialize hover effects
    setTimeout(addCursorHover, 500)
  }
})
</script>

<template>
  <div id="app">
    <!-- Retro Theme Notification -->
    <RetroNotification 
      :show="showNotification"
      :message="notificationMessage"
      :is-retro-mode="isRetroMode"
      @close="showNotification = false"
    />
    
    <!-- Scroll Progress Bar -->
    <div class="scroll-progress">
      <div 
        class="scroll-progress-bar" 
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>
    
    <!-- Custom Cursor -->
    <div class="custom-cursor" ref="cursor"></div>
    <div class="custom-cursor-dot" ref="cursorDot"></div>
    
    <Navbar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    
    <!-- Back to Top Button -->
    <button 
      class="back-to-top" 
      :class="{ visible: scrollProgress > 20 }"
      @click="scrollToTop"
    >
      ↑
    </button>
    
    <!-- Retro Toggle Button -->
    <RetroToggleButton />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import './assets/animations.css';
@import './assets/retro-theme.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.4;
  color: #000;
  background: #ffffff;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  cursor: none; /* Hide default cursor for custom cursor */
}

body.loaded {
  animation: fadeInUp 0.8s ease-out;
}

#app {
  min-height: 100vh;
  position: relative;
}

.main-content {
  margin-top: 83px;
  min-height: calc(100vh - 83px);
}

/* Scroll Progress Bar */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #000 0%, #333 100%);
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* Custom Cursor */
.custom-cursor {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transition: all 0.1s ease;
  mix-blend-mode: difference;
}

.custom-cursor-dot {
  position: fixed;
  width: 4px;
  height: 4px;
  background: #000;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.05s ease;
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Global Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

h1 {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 800;
}

h2 {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  font-weight: 700;
}

h3 {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 600;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

/* Selection */
::selection {
  background: rgba(0, 0, 0, 0.1);
  color: #000;
}

/* Global Utilities */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  body {
    cursor: auto; /* Restore default cursor on mobile */
  }
  
  .custom-cursor,
  .custom-cursor-dot {
    display: none;
  }
}

/* Button Styles */
.btn {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: #000;
  color: #fff;
  border: 1px solid #000;
}

.btn-primary:hover {
  background: #333;
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: #000;
  border: 1px solid #000;
}

.btn-secondary:hover {
  background: #000;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Loading Animation */
@keyframes pageLoad {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Improved Focus States */
*:focus {
  outline: 2px solid rgba(0, 0, 0, 0.5);
  outline-offset: 2px;
}

/* Enhanced Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* Preloader */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  transition: opacity 0.5s ease;
}

.preloader.hidden {
  opacity: 0;
  pointer-events: none;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Glitch Effect for Fun */
.glitch {
  position: relative;
  display: inline-block;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  animation: glitch-1 0.5s infinite;
  color: #ff0000;
  z-index: -1;
}

.glitch::after {
  animation: glitch-2 0.5s infinite;
  color: #00ff00;
  z-index: -2;
}

@keyframes glitch-1 {
  0%, 100% {
    transform: translate(0);
  }
  20% {
    transform: translate(-1px, 1px);
  }
  40% {
    transform: translate(-1px, -1px);
  }
  60% {
    transform: translate(1px, 1px);
  }
  80% {
    transform: translate(1px, -1px);
  }
}

@keyframes glitch-2 {
  0%, 100% {
    transform: translate(0);
  }
  20% {
    transform: translate(1px, -1px);
  }
  40% {
    transform: translate(1px, 1px);
  }
  60% {
    transform: translate(-1px, -1px);
  }
  80% {
    transform: translate(-1px, 1px);
  }
}
</style>
