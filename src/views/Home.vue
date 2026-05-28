<template>
  <div class="home">


    <section class="hero">
      <div class="container">
        <div class="hero-content reveal">
          <h1 class="hero-title">
            <span class="title-line animate-fade-in-up">SCRIPTY2K</span>
          </h1>
          <p class="hero-subtitle animate-fade-in-up animate-delay-400">Creative Developer</p>
          <div class="hero-description animate-fade-in-up animate-delay-600">
            <p><AnimatedDescription /></p>
          </div>
          <div class="hero-actions animate-fade-in-up animate-delay-800">
            <router-link to="/projects" class="btn btn-primary">
              <span>View Work</span>
            </router-link>
            <router-link to="/contact" class="btn btn-secondary">
              <span>Get In Touch</span>
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="floating-elements">
        <div class="floating-shape shape-1 animate-float"></div>
        <div class="floating-shape shape-2 animate-float animate-delay-300"></div>
        <div class="floating-shape shape-3 animate-float animate-delay-600"></div>
      </div>
      
      <div class="scroll-indicator animate-pulse">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <section class="intro-section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-text reveal-left">
            <h2 class="section-title">About me</h2>
            <p class="intro-paragraph">
              I'm a passionate developer who loves to create stuff with my creativity and coding skills.
              I have a knack for developing but also designing online projects!
              I enjoy making creative projects like music and videos in my free time.
            </p>
            <br>
            <p>
              Dynamic and solution-driven Full-Stack Developer with a strong foundation in digital media,
              cybersecurity, webdeveloping, sound production and cinematography.
            </p>
            <br>
            <p>
              Combines technical expertise with a highly strategic mindset to build optimized, scalable web
              applications and innovative digital content.
            </p>
            <br>
            <p>
              Recognized for excellent communication skills, collaborative problem-solving, and the ability to
              proactively deliver strategic recommendations that elevate project outcomes.
            </p>
          </div>
          <div class="intro-stats reveal-right">
            <div class="stat hover-scale" v-for="(stat, index) in stats" :key="index">
              <span class="stat-number" :data-count="stat.number">0</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-section">
      <div class="container">
        <h2 class="section-title reveal text-center">Expertise</h2>
        <p class="section-subtitle">The skill bars are not indicative of actual proficiency levels. They are randomized. You'll have to
          explore my projects to see what I can really do :)
        </p>
        <div class="skills-grid">
          <div 
            class="skill-category reveal-scale hover-lift" 
            v-for="(category, index) in skillCategories" 
            :key="index"
            :class="`animate-delay-${(index + 1) * 100}`"
          >
            <div class="skill-icon">{{ category.icon }}</div>
            <h3>{{ category.title }}</h3>
            <p class="skill-description">{{ category.description }}</p>
            <ul>
              <li v-for="skill in category.skills" :key="skill" class="skill-item">
                <span class="skill-text">{{ skill }}</span>
                <div class="skill-bar">
                  <div class="skill-progress"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Parallax Background -->
    <div class="parallax-bg" data-parallax data-speed="0.5"></div>
  </div>
</template>

<script>
import { onMounted, onActivated, reactive, nextTick } from 'vue'
import { useScrollAnimations } from '../composables/useAnimations.js'
import AnimatedDescription from '../components/AnimatedDescription.vue'

export default {
  name: 'Home',
  components: {
    AnimatedDescription
  },
  setup() {
    const stats = reactive([
      { number: 50, label: 'Songs produced' },
      { number: 15, label: 'Videos edited' },
      { number: 20, label: 'Github projects made' }
    ])

    const skillCategories = reactive([
      {
        icon: '',
        title: 'CLI & Systems',
        skills: ['Linux', 'CLI', 'Git', 'Bash', 'SQL', 'SSH', 'Docker'],
      },
      {
        icon: '',
        title: 'Frontend Architecture',
        skills: ['Vue.js', 'Vite', 'Typescript', 'Three.js', 'Tailwind CSS', 'React'],
      },
      {
        icon: '',
        title: 'Backend Architecture',
        skills: ['PHP', 'Node.js', 'JavaScript', 'SQL'],
      }
    ])

    const animateStats = () => {
      const statNumbers = document.querySelectorAll('.stat-number')
      
      statNumbers.forEach((stat, index) => {
        const target = parseInt(stat.dataset.count)
        let current = 0
        const increment = target / 50
        
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          
          if (stats[index]?.label.includes('%')) {
            stat.textContent = Math.floor(current) + '%'
          } else {
            stat.textContent = Math.floor(current) + '+'
          }
        }, 40)
      })
    }

    const initSkillBars = () => {
      const skillBars = document.querySelectorAll('.skill-progress')
      
      skillBars.forEach((bar, index) => {
        // Reset width first
        bar.style.width = '0%'
        setTimeout(() => {
          const randomWidth = Math.floor(Math.random() * 30) + 70 // 70-100%
          bar.style.width = randomWidth + '%'
        }, index * 200)
      })
    }

    const resetAnimations = () => {
      // Reset all reveal elements
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      revealElements.forEach(el => {
        el.classList.remove('revealed')
      })

      // Reset hero animations
      const heroElements = document.querySelectorAll('.hero-content .title-line, .hero-subtitle, .hero-description, .hero-actions')
      heroElements.forEach(el => {
        el.style.animation = 'none'
        el.offsetHeight // Trigger reflow
        el.style.animation = null
      })

      // Reset skill progress bars
      const skillBars = document.querySelectorAll('.skill-progress')
      skillBars.forEach(bar => {
        bar.style.width = '0%'
      })

      // Reset stat numbers
      const statNumbers = document.querySelectorAll('.stat-number')
      statNumbers.forEach(stat => {
        stat.textContent = '0'
      })
    }

    const initializeAnimations = () => {
      resetAnimations()
      
      nextTick(() => {
        // Re-initialize scroll animations
        const { initScrollAnimations } = useScrollAnimations()
        initScrollAnimations()

        // Animate stats when they come into view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.classList.contains('intro-stats')) {
              animateStats()
              observer.unobserve(entry.target)
            }
          })
        })

        const statsSection = document.querySelector('.intro-stats')
        if (statsSection) {
          observer.observe(statsSection)
        }

        // Initialize skill bars with delay
        setTimeout(initSkillBars, 1000)
      })
    }

    onMounted(() => {
      initializeAnimations()
    })

    // This hook is called every time the component is reactivated (when navigating back)
    onActivated(() => {
      initializeAnimations()
    })

    return {
      stats,
      skillCategories
    }
  }
}
</script>

<style scoped>
.home {
  background: #fff0df;
  position: relative;
  overflow: hidden;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2rem 0;
  background: linear-gradient(135deg, #f5e5d4 0%, #fff0df 100%);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  color: #292524;
  line-height: 0.9;
  margin-bottom: 1rem;
  letter-spacing: -0.04em;
  overflow: hidden;
}

.title-line {
  display: block;
  transform: translateY(100%);
  animation: slideUpReveal 1s ease-out forwards;
}

@keyframes slideUpReveal {
  to {
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 300;
  color: #666;
  margin-bottom: 3rem;
  letter-spacing: 0.02em;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.4s forwards;
}

.hero-description {
  max-width: 500px;
  margin: 0 auto 3rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.6s forwards;
}

.hero-description p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.8s forwards;
}

.btn {
  position: relative;
  overflow: hidden;
  transform: translateY(20px);
  animation: slideUpFade 0.6s ease-out forwards;
}

.btn span {
  position: relative;
  z-index: 2;
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
  border-radius: 50%;
}

.btn:hover .btn-ripple {
  width: 300px;
  height: 300px;
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-shape {
  position: absolute;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%);
  border-radius: 50%;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  right: 10%;
  animation-duration: 6s;
}

.shape-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 20%;
  animation-duration: 8s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  top: 80%;
  left: 10%;
  animation-duration: 10s;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #666;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 2;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, #000 0%, transparent 100%);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { 
    opacity: 0.3;
    transform: scaleY(1);
  }
  50% { 
    opacity: 1;
    transform: scaleY(1.2);
  }
}

.intro-section {
  padding: 8rem 0;
  background: #fff0df;
  position: relative;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
}

.section-title {
  margin-bottom: 2rem;
  color: #292524;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 50px;
  height: 2px;
  background: #292524;
  animation: expandLine 1s ease-out;
}

@keyframes expandLine {
  from { width: 0; }
  to { width: 50px; }
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
}

.intro-stats {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: #f5e5d4;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(41, 37, 36, 0.05);
  transition: all 0.3s ease;
}

.stat:hover {
  background: #f5e5d4;
  border-color: rgba(41, 37, 36, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  color: #292524;
  line-height: 1;
  background: linear-gradient(135deg, #292524 0%, #333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skills-section {
  padding: 8rem 0;
  background: #fff0df;
  position: relative;
}

.skills-section .section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.section-subtitle {
  text-align: center;
  font-size: 0.9rem;
  color: #999;
  margin-top: -2rem;
  margin-bottom: 3rem;
}

.text-center {
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.skill-category {
  text-align: center;
  padding: 3rem 2rem;
  background: #f5e5d4;
  border-radius: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.skill-category::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-category:hover::before {
  opacity: 1;
}

.skill-category:hover {
  background: #f5e5d4;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  transform: translateY(-10px);
}

.skill-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s ease-in-out infinite;
}
.skill-category h3 {
  margin-bottom: 0.5rem;
  color: #292524;
  font-weight: 600;
}

.skill-description {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.skill-category ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  position: relative;
  text-align: left;
}

.skill-text {
  color: #666;
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.skill-item:hover .skill-text {
  color: #292524;
}

.skill-bar {
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #292524 0%, #333 100%);
  width: 0%;
  transition: width 1s ease-out;
  position: relative;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Parallax Background */
.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="rgba(0,0,0,0.02)"/></svg>') repeat;
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 0 2rem;
    min-height: 90vh;
  }

  .hero-content {
    width: 100%;
    max-width: 32rem;
    margin: 0 auto;
    text-align: center;
  }

  .hero-description {
    max-width: 28rem;
    margin: 0 auto 2.5rem;
  }

  .hero-description p {
    text-align: center;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 20rem;
    margin: 0 auto;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .scroll-indicator {
    display: none;
  }

  .intro-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .intro-stats {
    flex-direction: column;
    gap: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .skill-category {
    padding: 2rem 1.5rem;
  }

  .intro-section,
  .skills-section {
    padding: 4rem 0;
  }

  .floating-elements {
    display: none;
  }
}

@media (max-width: 430px) {
  .hero {
    padding-top: 3.5rem;
  }

  .hero-title {
    font-size: clamp(2.5rem, 12vw, 3.6rem);
  }

  .hero-subtitle {
    margin-bottom: 2rem;
  }
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>