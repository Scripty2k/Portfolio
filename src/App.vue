<script setup>
import Navbar from './components/Navbar.vue'
import RetroToggleButton from './components/RetroToggleButton.vue'
import RetroNotification from './components/RetroNotification.vue'
import { useScrollAnimations, useScrollProgress } from './composables/useAnimations.js'
import { useRetroTheme } from './composables/useRetroTheme.js'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { supabase } from './lib/supabase'

// Initialize scroll animations
useScrollAnimations()

// Get scroll progress for progress bar
const { scrollProgress } = useScrollProgress()

// Retro theme functionality
const { isRetroMode, showNotification, notificationMessage } = useRetroTheme()

const globalNoticeMessage = ref('')
const isNoticeDismissed = ref(false)
const showGlobalNotice = computed(() => {
  return globalNoticeMessage.value.trim().length > 0 && !isNoticeDismissed.value
})

let noticeChannel = null

const applyGlobalNotice = (record) => {
  if (record && record.is_active && record.message) {
    globalNoticeMessage.value = record.message
    isNoticeDismissed.value = false
    return
  }

  globalNoticeMessage.value = ''
  isNoticeDismissed.value = false
}

const fetchGlobalNotice = async () => {
  const { data, error } = await supabase
    .from('global_notifications')
    .select('message, is_active')
    .eq('id', 1)
    .maybeSingle()

  if (error) {
    applyGlobalNotice(null)
    return
  }

  applyGlobalNotice(data)
}

const dismissGlobalNotice = () => {
  isNoticeDismissed.value = true
}

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Add smooth scrolling behavior
onMounted(() => {
  // Smooth scroll for anchor links
  document.documentElement.style.scrollBehavior = 'smooth'
  
  // Add loading animation to body
  document.body.classList.add('loaded')

  fetchGlobalNotice()

  noticeChannel = supabase
    .channel('global-notifications')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'global_notifications', filter: 'id=eq.1' },
      (payload) => {
        applyGlobalNotice(payload.new)
      }
    )
    .subscribe()
})

onUnmounted(() => {
  if (noticeChannel) {
    supabase.removeChannel(noticeChannel)
    noticeChannel = null
  }
})
</script>

<template>
  <div id="app" :class="{ 'has-global-notice': showGlobalNotice }">
    <!-- Retro Theme Notification -->
    <RetroNotification 
      :show="showNotification"
      :message="notificationMessage"
      :is-retro-mode="isRetroMode"
      @close="showNotification = false"
    />

    <transition name="global-notice">
      <div v-if="showGlobalNotice" class="global-notice">
        <div class="global-notice__content">
          <span class="global-notice__text">{{ globalNoticeMessage }}</span>
          <button class="global-notice__close" type="button" @click="dismissGlobalNotice">
            ×
          </button>
        </div>
      </div>
    </transition>
    
    <!-- Scroll Progress Bar -->
    <div class="scroll-progress">
      <div 
        class="scroll-progress-bar" 
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>
    
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
  color: #292524;
  background: #fff0df;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

body.loaded {
  animation: pageFadeIn 0.45s ease-out;
}

@keyframes pageFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#app {
  min-height: 100vh;
  position: relative;
  --global-banner-height: 0px;
}

#app.has-global-notice {
  --global-banner-height: 48px;
}

.main-content {
  margin-top: calc(83px + var(--global-banner-height, 0px));
  min-height: calc(100vh - 83px - var(--global-banner-height, 0px));
  transition: margin-top 0.25s ease;
}

#app .navbar {
  position: fixed;
  top: calc(var(--global-banner-height, 0px) + 3px) !important;
  left: 0;
  right: 0;
  transition: top 0.25s ease;
}

/* Scroll Progress Bar */
.scroll-progress {
  position: fixed;
  top: var(--global-banner-height, 0px);
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  z-index: 9999;
  transition: top 0.25s ease;
}

/* Global notification banner */
.global-notice {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11000;
  background: #e2574c;
  color: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.global-notice__content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.global-notice__text {
  line-height: 1.4;
}

.global-notice__close {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: transparent;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.global-notice__close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.global-notice__close:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

.global-notice-enter-active,
.global-notice-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.global-notice-enter-from,
.global-notice-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

@media (max-width: 768px) {
  #app.has-global-notice {
    --global-banner-height: 60px;
  }

  .global-notice__content {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #292524 0%, #333 100%);
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: #292524;
  color: #fff0df;
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
  background: rgba(41, 37, 36, 0.1);
  color: #292524;
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

.btn-primary {
  background: #292524;
  color: #fff0df;
  border: 1px solid #292524;
}

.btn-primary:hover {
  background: #333;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: #292524;
  border: 1px solid #292524;
}

.btn-secondary:hover {
  background: #292524;
  color: #fff0df;
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

/* Custom Minimalistic Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  transition: background 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
}

/* Firefox scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

/* Preloader */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff0df;
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
  border-top: 2px solid #292524;
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
