import { ref, watch, onMounted, onUnmounted } from 'vue'
import retroSound from '../assets/easteregg.wav'

// Reactive state for theme
const isRetroMode = ref(false)
const showNotification = ref(false)
const isTransitioning = ref(false)
const isMuted = ref(false)

// Notification message
const notificationMessage = ref('')

// Audio instance
let retroAudio = null

// Create retro sparkles
const createSparkles = () => {
  const sparkleCount = 30
  
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div')
    sparkle.className = 'retro-sparkle'
    
    // Random starting position
    const startX = Math.random() * window.innerWidth
    const startY = Math.random() * window.innerHeight
    
    // Random travel distance
    const tx = (Math.random() - 0.5) * 200 + 'px'
    const ty = (Math.random() - 0.5) * 200 + 'px'
    
    // Random delay for staggered effect
    const delay = Math.random() * 0.3 + 's'
    
    sparkle.style.left = startX + 'px'
    sparkle.style.top = startY + 'px'
    sparkle.style.setProperty('--tx', tx)
    sparkle.style.setProperty('--ty', ty)
    sparkle.style.animationDelay = delay
    
    document.body.appendChild(sparkle)
    
    // Remove sparkle after animation completes
    setTimeout(() => {
      sparkle.remove()
    }, 900)
  }
}

export function useRetroTheme() {
  // Initialize audio
  const initializeAudio = () => {
    if (!retroAudio) {
      retroAudio = new Audio(retroSound)
      retroAudio.loop = true
      retroAudio.volume = 0.2 // 20% volume
    }
  }

  // Toggle mute function
  const toggleMute = () => {
    if (retroAudio && isRetroMode.value) {
      isMuted.value = !isMuted.value
      retroAudio.muted = isMuted.value
      
      // Show notification for mute status
      notificationMessage.value = isMuted.value ? 'AUDIO MUTED' : 'AUDIO UNMUTED'
      showNotification.value = true
      
      // Hide notification after 2 seconds
      setTimeout(() => {
        showNotification.value = false
      }, 2000)
    }
  }

  // Keyboard event handler
  const handleKeyPress = (event) => {
    if (event.key.toLowerCase() === 'k') {
      toggleMute()
    }
  }

  // Setup keyboard listener
  onMounted(() => {
    document.addEventListener('keydown', handleKeyPress)
  })

  // Cleanup keyboard listener
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyPress)
    if (retroAudio) {
      retroAudio.pause()
      retroAudio = null
    }
  })

  const toggleRetroMode = async () => {
    if (isTransitioning.value) return
    
    isTransitioning.value = true
    
    // Initialize audio if not already done
    initializeAudio()
    
    // Create fade to black overlay
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      z-index: 99999;
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    `
    document.body.appendChild(overlay)
    
    // Trigger fade to black
    requestAnimationFrame(() => {
      overlay.style.opacity = '1'
    })
    
    // Wait for fade to complete
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Toggle theme
    isRetroMode.value = !isRetroMode.value
    
    // Apply/remove retro theme class
    if (isRetroMode.value) {
      document.documentElement.classList.add('retro-theme')
      notificationMessage.value = 'Changed to retro mode'
      
      // Create sparkles when entering retro mode
      createSparkles()
      
      // Play easter egg sound when switching to retro theme
      const easterEggAudio = new Audio(retroSound)
      easterEggAudio.play().catch(err => console.log('Easter egg sound not available:', err))
    } else {
      document.documentElement.classList.remove('retro-theme')
      notificationMessage.value = 'EXITED RETRO MODE'
      
      // Stop audio when exiting retro mode
      if (retroAudio) {
        retroAudio.pause()
        retroAudio.currentTime = 0
      }
      isMuted.value = false
    }
    
    // Wait a bit for theme to apply
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Scroll to top when theme changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Fade back in
    overlay.style.opacity = '0'
    
    // Show notification
    showNotification.value = true
    
    // Remove overlay after fade out
    setTimeout(() => {
      document.body.removeChild(overlay)
      isTransitioning.value = false
    }, 500)
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      showNotification.value = false
    }, 5000)
  }
  
  // Watch for theme changes and update CSS custom properties
  watch(isRetroMode, (newValue) => {
    // The CSS is already loaded via App.vue import
    // Just need to apply the class which is done in toggleRetroMode
  })
  
  return {
    isRetroMode,
    showNotification,
    notificationMessage,
    isTransitioning,
    isMuted,
    toggleRetroMode,
    toggleMute
  }
}

// Export for global access
export { isRetroMode, showNotification, notificationMessage, isTransitioning, isMuted }