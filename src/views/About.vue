<template>
  <div class="about">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content animate-fade-in-up">
          <h1>About</h1>
          <p class="hero-subtitle">What am I doing at the moment?</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="content-grid">
          <div class="content-main">
            <div class="text-block">
              <h2>What I make</h2>
              <p>
                I'm a dynamic full-stack developer who thrives on solving tricky problems and building cool 
                things online. Beyond coding, I’ve got a deep love for all things digital media. I'm always 
                blending technical web development and cybersecurity with my creative sides, like sound production 
                and cinematography. I love mixing logic with creativity to craft unique digital experiences from start 
                to finish!</p>
                <br>
              <p>
                I make digital products like websites, web apps, and interactive experiences. 
                I also create music and videos as a hobby. My goal is to blend creativity with technology
                to deliver engaging and effective solutions.
              </p>
            </div>

            <div class="text-block">
              <h2>My dream</h2>
              <p>
                I aim to innovate at the intersection of technology and creativity. I love putting my mind to 
                projects with not only my coding skills but also my creative skills. 
                Whether it's building a sleek web app or producing a catchy tune, I strive to create work
                that resonates and inspires.
              </p>
            </div>

            <div class="text-block">
              <h2>Approach</h2>
              <p>
                I focus on clean, maintainable code and intuitive user interfaces. 
                Every project starts with understanding the problem deeply, then crafting 
                solutions that are both technically sound and visually compelling.
              </p>
              <br>
              <p>Recognized for excellent communication skills, collaborative problem-solving, and the ability to proactively deliver strategic recommendations that elevate project outcomes.</p>
            </div>
          </div>

          <div class="content-sidebar">
            <div 
              class="info-card parallax-card reveal-scale animate-delay-200" 
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
              ref="card1"
            >
              <h3>What I'm busy with right now</h3>
              <ul>
                <div class="experience-item">
                <span class="year">2026</span>
                <span class="role">Wordpress Web-Developer at Hyperconnected</span>
                <span class="company">Nijmegen</span>
              </div>
              </ul>
              <br>
                <ul>
                <div class="experience-item">
                <span class="year">2026</span>
                <span class="role">Busy with my COMPTIA+ certification</span>
                <span class="company">Nijmegen</span>
              </div>
              </ul>
            </div>

            <div 
              class="info-card parallax-card reveal-scale animate-delay-400" 
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
              ref="card2"
            >
              <h3>Experience</h3>
              <div class="experience-item">
                <span class="year">2024 - 2025</span>
                <span class="role">Odoo/Python Developer at NHMB Software</span>
                <span class="company">Arnhem</span>
              </div>

              <div class="experience-item">
                <span class="year">2023</span>
                <span class="role">Promo Video for Rhion</span>
                <span class="company">Eindhoven</span>
              </div>
            </div>

            <div 
              class="info-card parallax-card reveal-scale animate-delay-600" 
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
              ref="card3"
            >
              <h3>Education</h3>
              <div class="education-item">
                <span class="degree">Software Developer ENG/NL</span>
                <span class="school">Sintlucas Eindhoven</span>
                <span class="year">2022 - 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-section">
      <div class="container">
        <h2>Technical Expertise</h2>
        <div class="skills-categories">


          <div class="skill-group">
            <h3>CLI & Systems</h3>
            <div class="skill-list">
              <span>Linux</span>
              <span>CLI</span>
              <span>Git</span>
              <span>Bash</span>
              <span>SQL</span>
              <span>SSH</span>
              <span>Docker</span>
            </div>
          </div>
          
          <div class="skill-group">
            <h3>Frontend Architecture</h3>
            <div class="skill-list">
              <span>Vue.js</span>
              <span>Vite</span>
              <span>Typescript</span>
              <span>Three.js</span>
              <span>Tailwind CSS</span>
              <span>React</span>
            </div>
          </div>
          
          <div class="skill-group">
            <h3>Backend Architecture</h3>
            <div class="skill-list">
              <span>PHP</span>
              <span>Node.js</span>
              <span>Javascript</span>
              <span>SQL</span>
            </div>
          </div>
          
          <div class="skill-group">
            <h3>Tools I'm familiar with</h3>
            <div class="skill-list">
              <span>Git</span>
              <span>Docker</span>
              <span>Figma</span>
              <span>Adobe After Effects</span>
              <span>Premiere Pro</span>
              <span>Touch Designer</span>
              <span>FL Studio</span>
              <span>Ableton Live</span>
              <span>Davinci Resolve</span>
              <span>Warp</span>
              <span>TablePlus</span>
              <span>Postman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, onActivated, nextTick } from 'vue'
import { useScrollAnimations } from '../composables/useAnimations.js'

export default {
  name: 'About',
  setup() {
    const { initScrollAnimations } = useScrollAnimations()

    const handleMouseMove = (e) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -10
      const rotateY = ((x - centerX) / centerX) * 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    }

    const handleMouseLeave = (e) => {
      const card = e.currentTarget
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    }

    const initializeAnimations = () => {
      nextTick(() => {
        initScrollAnimations()
      })
    }

    onMounted(() => {
      initializeAnimations()
    })

    onActivated(() => {
      initializeAnimations()
    })

    return {
      handleMouseMove,
      handleMouseLeave
    }
  }
}
</script>

<style scoped>
.about {
  background: #fff0df;
}

.hero-section {
  padding: 8rem 0 4rem;
  background: #fff0df;
}

.hero-content {
  text-align: center;
}

.hero-content h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: #292524;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.content-section {
  padding: 6rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 6rem;
}

.content-main {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.text-block h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #292524;
  margin-bottom: 1.5rem;
}

.parallax-card {
  transition: transform 0.4s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  will-change: transform;
  cursor: pointer;
}

.parallax-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.text-block p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
}

.content-sidebar {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.info-card {
  padding: 2rem;
  background: #f5e5d4;
  border-radius: 0;
}

.info-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #292524;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-card ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-card li {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

.experience-item,
.education-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 2rem;
}

.experience-item:last-child,
.education-item:last-child {
  margin-bottom: 0;
}

.year {
  font-size: 0.85rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.role,
.degree {
  font-weight: 600;
  color: #292524;
}

.company,
.school {
  color: #666;
  font-size: 0.95rem;
}

.skills-section {
  padding: 6rem 0;
  background: #fff0df;
}

.skills-section h2 {
  text-align: center;
  margin-bottom: 4rem;
  color: #292524;
}

.skills-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.skill-group h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #292524;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-list span {
  color: #666;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #666;
  transition: color 0.2s ease;
}

.skill-list span:hover {
  color: #292524;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 0 3rem;
  }

  .content-section {
    padding: 4rem 0;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .content-main {
    gap: 3rem;
  }

  .content-sidebar {
    gap: 2rem;
  }

  .info-card {
    padding: 1.5rem;
  }

  .skills-section {
    padding: 4rem 0;
  }

  .skills-categories {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>