import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimations() {
  const observer = ref(null)

  const initScrollAnimations = () => {
    if (typeof window === 'undefined') return

    // Disconnect existing observer if it exists
    if (observer.value) {
      observer.value.disconnect()
    }

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    revealElements.forEach((el) => {
      observer.value.observe(el)
    })
  }

  onMounted(() => {
    // Small delay to ensure DOM is ready
    setTimeout(initScrollAnimations, 100)
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return {
    initScrollAnimations
  }
}

export function useParallax() {
  const parallaxElements = ref([])

  const updateParallax = () => {
    const scrollY = window.pageYOffset

    parallaxElements.value.forEach((element) => {
      const speed = element.dataset.speed || 0.5
      const yPos = -(scrollY * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  }

  const initParallax = () => {
    parallaxElements.value = document.querySelectorAll('[data-parallax]')
    window.addEventListener('scroll', updateParallax, { passive: true })
  }

  onMounted(() => {
    initParallax()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateParallax)
  })

  return {
    initParallax
  }
}

export function useTypewriter(text, speed = 50) {
  const displayText = ref('')
  const isComplete = ref(false)

  const startTypewriter = () => {
    let i = 0
    const timer = setInterval(() => {
      displayText.value = text.slice(0, i + 1)
      i++
      
      if (i === text.length) {
        clearInterval(timer)
        isComplete.value = true
      }
    }, speed)
  }

  return {
    displayText,
    isComplete,
    startTypewriter
  }
}

export function useMouseTracker() {
  const mouseX = ref(0)
  const mouseY = ref(0)

  const updateMousePosition = (e) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
  }

  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition)
  })

  return {
    mouseX,
    mouseY
  }
}

export function useScrollProgress() {
  const scrollProgress = ref(0)

  const updateScrollProgress = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollTop = window.pageYOffset
    scrollProgress.value = (scrollTop / scrollHeight) * 100
  }

  onMounted(() => {
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollProgress)
  })

  return {
    scrollProgress
  }
}