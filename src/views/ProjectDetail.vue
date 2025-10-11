<template>
  <div class="project-detail" v-if="project">
    <!-- Hero Section -->
    <section class="project-hero">
      <div class="container">
        <div class="hero-content reveal">
          <div class="project-meta">
            <router-link to="/projects" class="back-link hover-target">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Projects
            </router-link>
            <div class="meta-info">
              <span class="project-year">{{ project.year }}</span>
              <span class="project-type">{{ project.type }}</span>
              <span class="status-badge" :class="project.status.toLowerCase()">{{ project.status }}</span>
            </div>
          </div>
          
          <h1 class="glitch-title" :data-text="project.title">{{ project.title }}</h1>
          <p class="project-subtitle animate-fade-in-up animate-delay-300">{{ project.description }}</p>
          
          <div class="project-links">
            <a :href="project.liveUrl" target="_blank" class="btn btn-primary hover-lift" v-if="project.liveUrl !== '#'">
              <span>View Live</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m7 17 10-10"/>
                <path d="M7 7h10v10"/>
              </svg>
            </a>
            <a :href="project.githubUrl" target="_blank" class="btn btn-secondary hover-lift" v-if="project.githubUrl !== '#'">
              <span>View Code</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Showcase -->
    <section class="project-showcase">
      <div class="container">
        <div class="showcase-image reveal-scale">
          <div class="project-window">
            <div class="window-header">
              <div class="window-controls">
                <span class="control close"></span>
                <span class="control minimize"></span>
                <span class="control maximize"></span>
              </div>
              <div class="window-title">{{ project.title }}</div>
            </div>
            <div class="window-content">
              <img :src="project.image" :alt="project.title" class="project-image" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Details -->
    <section class="project-content">
      <div class="container">
        <div class="content-grid">
          <div class="main-content">
            <div class="section reveal">
              <h2>Overview</h2>
              <p>{{ project.detailedDescription || project.description }}</p>
            </div>

            <div class="section reveal" v-if="project.challenge">
              <h2>The Challenge</h2>
              <p>{{ project.challenge }}</p>
            </div>

            <div class="section reveal" v-if="project.solution">
              <h2>The Solution</h2>
              <p>{{ project.solution }}</p>
            </div>

            <div class="section reveal" v-if="project.features && project.features.length > 0">
              <h2>Key Features</h2>
              <ul class="features-list">
                <li v-for="feature in project.features" :key="feature" class="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="section reveal" v-if="project.results">
              <h2>Results & Impact</h2>
              <p>{{ project.results }}</p>
            </div>
          </div>

          <div class="sidebar">
            <div class="tech-stack reveal">
              <h3>Technologies Used</h3>
              <div class="tech-grid">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech" 
                  class="tech-tag hover-scale"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="project-info reveal" v-if="project.duration || project.team || project.role">
              <h3>Project Info</h3>
              <div class="info-item" v-if="project.duration">
                <strong>Duration:</strong>
                <span>{{ project.duration }}</span>
              </div>
              <div class="info-item" v-if="project.team">
                <strong>Team Size:</strong>
                <span>{{ project.team }}</span>
              </div>
              <div class="info-item" v-if="project.role">
                <strong>My Role:</strong>
                <span>{{ project.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Gallery -->
    <section class="project-gallery" v-if="project.gallery && project.gallery.length > 0">
      <div class="container">
        <h2 class="section-title reveal">Project Gallery</h2>
        <div class="gallery-grid">
          <div 
            v-for="(image, index) in project.gallery" 
            :key="index"
            class="gallery-item reveal-scale"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <img :src="image.url" :alt="image.alt || `${project.title} screenshot ${index + 1}`" />
            <div class="gallery-overlay">
              <p v-if="image.caption">{{ image.caption }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Next Project -->
    <section class="next-project" v-if="nextProject">
      <div class="container">
        <div class="next-project-content reveal">
          <div class="next-project-info">
            <span class="next-label">Next Project</span>
            <h3>{{ nextProject.title }}</h3>
            <p>{{ nextProject.description }}</p>
            <router-link :to="`/projects/${nextProject.id}`" class="btn btn-primary hover-lift">
              <span>View Project</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </router-link>
          </div>
          <div class="next-project-image">
            <img :src="nextProject.image" :alt="nextProject.title" />
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Loading state -->
  <div v-else class="loading-state">
    <div class="container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>Loading project details...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onActivated, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScrollAnimations } from '../composables/useAnimations.js'

export default {
  name: 'ProjectDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const project = ref(null)
    const nextProject = ref(null)

    // Extended project data with detailed information
    const projectsData = {
      1: {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with modern payment integration, inventory management, and real-time analytics dashboard.',
        detailedDescription: 'A comprehensive e-commerce platform built with modern web technologies, featuring a sophisticated admin dashboard, real-time inventory tracking, and seamless payment processing. The platform handles thousands of transactions daily and provides detailed analytics for business insights.',
        technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
        year: '2024',
        type: 'Web Application',
        status: 'Live',
        featured: true,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        liveUrl: '#',
        githubUrl: '#',
        challenge: 'The client needed a scalable e-commerce solution that could handle high traffic volumes while maintaining fast loading times and providing a seamless user experience across all devices.',
        solution: 'I developed a modern, responsive e-commerce platform using Vue.js for the frontend and Node.js for the backend. The solution includes advanced features like real-time inventory management, automated order processing, and comprehensive analytics.',
        features: [
          'Real-time inventory management',
          'Secure payment processing with Stripe',
          'Advanced search and filtering',
          'Customer review system',
          'Order tracking and notifications',
          'Comprehensive admin dashboard',
          'Mobile-responsive design',
          'SEO optimization'
        ],
        results: 'The platform successfully handles over 10,000 daily visitors with a 99.9% uptime rate. Customer satisfaction increased by 40% and the client saw a 65% increase in online sales within the first quarter.',
        duration: '4 months',
        team: '3 developers',
        role: 'Full-Stack Developer & Project Lead',
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            caption: 'Homepage design with featured products'
          },
          {
            url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
            caption: 'Product detail page with reviews'
          },
          {
            url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
            caption: 'Admin dashboard analytics'
          }
        ]
      },
      2: {
        id: 2,
        title: 'Creative Agency Website',
        description: 'A visually striking portfolio website with WebGL animations, smooth page transitions, and immersive storytelling.',
        detailedDescription: 'An award-winning portfolio website for a creative agency, featuring cutting-edge WebGL animations, smooth page transitions, and immersive storytelling. The site showcases the agency\'s work through interactive experiences and dynamic visual elements.',
        technologies: ['React', 'Three.js', 'GSAP', 'Sanity', 'WebGL', 'Framer Motion'],
        year: '2024',
        type: 'Website',
        status: 'Development',
        featured: false,
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
        liveUrl: '#',
        githubUrl: '#',
        challenge: 'Create a portfolio website that stands out in a competitive creative industry while maintaining excellent performance and accessibility standards.',
        solution: 'Developed an immersive, interactive website using React and Three.js, incorporating smooth animations and transitions while ensuring optimal performance through code splitting and lazy loading.',
        features: [
          'WebGL 3D animations',
          'Smooth page transitions',
          'Interactive project showcases',
          'Custom cursor effects',
          'Parallax scrolling',
          'CMS integration with Sanity',
          'Mobile-optimized interactions',
          'Performance optimization'
        ],
        results: 'The website won a Web Excellence Award and increased the agency\'s lead generation by 80%. Page load times remain under 2 seconds despite complex animations.',
        duration: '3 months',
        team: '2 developers, 1 designer',
        role: 'Frontend Developer & Animation Specialist',
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
            caption: 'Homepage with interactive 3D elements'
          },
          {
            url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
            caption: 'Portfolio grid with hover animations'
          }
        ]
      },
      3: {
        id: 3,
        title: 'Task Management Dashboard',
        description: 'A collaborative workspace with real-time updates, drag-and-drop functionality, advanced filtering, and team analytics.',
        detailedDescription: 'A sophisticated task management platform designed for teams to collaborate efficiently. Features real-time updates, intuitive drag-and-drop interfaces, advanced filtering options, and comprehensive analytics to track team productivity and project progress.',
        technologies: ['Vue.js', 'Firebase', 'Vuetify', 'Chart.js', 'Socket.io', 'Vuex'],
        year: '2023',
        type: 'Dashboard',
        status: 'Live',
        featured: false,
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        liveUrl: '#',
        githubUrl: '#',
        challenge: 'Build a task management system that could handle real-time collaboration for distributed teams while providing insightful analytics and maintaining excellent performance.',
        solution: 'Created a responsive dashboard using Vue.js and Firebase, implementing real-time synchronization and intuitive UI/UX patterns for efficient task management and team collaboration.',
        features: [
          'Real-time collaboration',
          'Drag-and-drop task management',
          'Advanced filtering and search',
          'Team performance analytics',
          'File attachments and comments',
          'Customizable project views',
          'Notification system',
          'Time tracking integration'
        ],
        results: 'Successfully deployed to 50+ teams with 99.8% uptime. Users reported 35% increase in productivity and 50% reduction in project completion time.',
        duration: '5 months',
        team: '4 developers, 1 designer',
        role: 'Frontend Lead Developer',
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
            caption: 'Main dashboard with task boards'
          },
          {
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
            caption: 'Analytics and reporting view'
          }
        ]
      },
      4: {
        id: 4,
        title: 'Weather Analytics App',
        description: 'A data visualization tool that provides detailed weather insights with interactive charts, forecasting, and location tracking.',
        detailedDescription: 'An advanced weather analytics application that transforms complex meteorological data into beautiful, interactive visualizations. Features detailed forecasting, historical data analysis, and location-based weather tracking with stunning charts and graphs.',
        technologies: ['React Native', 'D3.js', 'OpenWeather API', 'Node.js', 'MongoDB', 'Express'],
        year: '2023',
        type: 'Mobile App',
        status: 'Live',
        featured: false,
        image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
        liveUrl: '#',
        githubUrl: '#',
        challenge: 'Create a mobile app that makes complex weather data accessible and actionable for both casual users and weather enthusiasts.',
        solution: 'Developed a cross-platform mobile app using React Native with custom D3.js visualizations, integrating multiple weather APIs to provide comprehensive and accurate weather insights.',
        features: [
          'Interactive weather charts',
          '7-day detailed forecasting',
          'Historical weather data',
          'Severe weather alerts',
          'Location-based tracking',
          'Customizable widgets',
          'Offline data access',
          'Social sharing features'
        ],
        results: 'Over 100,000 downloads in the first year with a 4.8-star rating. Featured in the App Store as "App of the Day" and recognized for excellence in data visualization.',
        duration: '6 months',
        team: '3 developers, 1 UI/UX designer',
        role: 'Mobile App Developer & Data Visualization Specialist',
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
            caption: 'Main weather dashboard'
          },
          {
            url: 'https://images.unsplash.com/photo-1419833479618-c595710527b2?w=600&h=400&fit=crop',
            caption: 'Interactive charts and graphs'
          }
        ]
      },
      5: {
        id: 5,
        title: 'Brand Identity System',
        description: 'Complete visual identity and design system for a tech startup, including logo design, typography guidelines, and brand assets.',
        detailedDescription: 'A comprehensive brand identity system developed for an innovative tech startup. The project encompassed logo design, typography selection, color palette development, and creation of a complete design system with guidelines for consistent brand application across all touchpoints.',
        technologies: ['Figma', 'Adobe Creative Suite', 'Principle', 'Sketch', 'InVision'],
        year: '2023',
        type: 'Design',
        status: 'Completed',
        featured: false,
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
        liveUrl: '#',
        githubUrl: '#',
        challenge: 'Develop a distinctive brand identity that would help a tech startup stand out in a crowded market while conveying innovation, trust, and reliability.',
        solution: 'Created a modern, scalable brand identity system with a distinctive logo, carefully selected typography, and a versatile color palette that works across digital and print media.',
        features: [
          'Custom logo design',
          'Complete typography system',
          'Brand color palette',
          'Icon library creation',
          'Business card design',
          'Website mockups',
          'Brand guidelines document',
          'Social media templates'
        ],
        results: 'The brand identity helped the startup secure $2M in seed funding and was featured in several design publications. The design system is still in use across all company touchpoints.',
        duration: '2 months',
        team: '2 designers',
        role: 'Lead Brand Designer',
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
            caption: 'Logo variations and usage guidelines'
          },
          {
            url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop',
            caption: 'Brand colors and typography'
          }
        ]
      },
      6: {
        id: 6,
        title: 'Portfolio Website',
        description: 'A minimalist portfolio showcasing creative work with smooth animations, modern typography, and responsive design.',
        detailedDescription: 'A clean, minimalist portfolio website designed to showcase creative work effectively. Features smooth animations, modern typography, and a fully responsive design that adapts beautifully to all screen sizes while maintaining optimal performance.',
        technologies: ['Vue.js', 'GSAP', 'Netlify', 'Sass', 'Webpack'],
        year: '2024',
        type: 'Website',
        status: 'Live',
        featured: false,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        liveUrl: '#',
        githubUrl: '#',
        challenge: 'Create a portfolio website that effectively showcases creative work while maintaining fast loading times and excellent user experience across all devices.',
        solution: 'Built a lightweight, performance-optimized portfolio using Vue.js with carefully crafted animations that enhance the user experience without compromising load times.',
        features: [
          'Minimalist design approach',
          'Smooth scroll animations',
          'Project filtering system',
          'Responsive image gallery',
          'Contact form integration',
          'SEO optimization',
          'Fast loading times',
          'Accessibility compliance'
        ],
        results: 'The portfolio helped secure 5 new clients within the first month and received recognition in design communities for its clean aesthetic and smooth user experience.',
        duration: '1.5 months',
        team: '1 developer (solo project)',
        role: 'Full-Stack Developer & Designer',
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            caption: 'Homepage with featured projects'
          },
          {
            url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
            caption: 'Project detail page layout'
          }
        ]
      }
    }

    const loadProject = () => {
      const projectId = parseInt(route.params.id)
      project.value = projectsData[projectId] || null
      
      // Find next project for navigation
      const projectIds = Object.keys(projectsData).map(id => parseInt(id))
      const currentIndex = projectIds.indexOf(projectId)
      const nextIndex = (currentIndex + 1) % projectIds.length
      const nextProjectId = projectIds[nextIndex]
      nextProject.value = projectsData[nextProjectId]

      if (!project.value) {
        router.push('/projects')
      }
    }

    const initializeAnimations = () => {
      nextTick(() => {
        const { initScrollAnimations } = useScrollAnimations()
        initScrollAnimations()
      })
    }

    onMounted(() => {
      loadProject()
      initializeAnimations()
    })

    onActivated(() => {
      loadProject()
      initializeAnimations()
    })

    return {
      project,
      nextProject
    }
  }
}
</script>

<style scoped>
.project-detail {
  background: #fff;
}

.project-hero {
  padding: 8rem 0 4rem;
  background: #f8f8f8;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.project-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #000;
}

.meta-info {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-year {
  color: #666;
}

.project-type {
  color: #000;
  font-weight: 500;
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.live {
  background: #d4edda;
  color: #155724;
}

.status-badge.development {
  background: #fff3cd;
  color: #856404;
}

.status-badge.completed {
  background: #d1ecf1;
  color: #0c5460;
}

.hero-content h1 {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  color: #000;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.project-subtitle {
  font-size: 1.3rem;
  color: #666;
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.project-links .btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-showcase {
  padding: 4rem 0;
  background: #fff;
}

.showcase-image {
  max-width: 1200px;
  margin: 0 auto;
}

.project-window {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.window-header {
  height: 50px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: relative;
}

.window-controls {
  display: flex;
  gap: 10px;
}

.control {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.control.close {
  background: #ff5f57;
}

.control.minimize {
  background: #ffbd2e;
}

.control.maximize {
  background: #28ca42;
}

.window-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #495057;
}

.window-content {
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: auto;
  display: block;
}

.project-content {
  padding: 6rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 1rem;
}

.section p {
  color: #666;
  line-height: 1.7;
  font-size: 1.1rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #666;
  font-size: 1.05rem;
}

.feature-item svg {
  color: #28a745;
  flex-shrink: 0;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tech-stack,
.project-info {
  background: #f8f8f8;
  padding: 2rem;
  border-radius: 12px;
}

.tech-stack h3,
.project-info h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 1.5rem;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-tag {
  background: #fff;
  color: #666;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  border: 1px solid #eee;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background: #000;
  color: #fff;
  border-color: #000;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.info-item strong {
  color: #000;
  font-weight: 500;
}

.info-item span {
  color: #666;
}

.project-gallery {
  padding: 6rem 0;
  background: #f8f8f8;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 3rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: #fff;
  padding: 2rem 1.5rem 1.5rem;
}

.gallery-overlay p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.next-project {
  padding: 6rem 0;
  background: #000;
  color: #fff;
}

.next-project-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.next-label {
  display: block;
  color: #666;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.next-project-info h3 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.next-project-info p {
  color: #ccc;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.next-project-info .btn {
  background: #fff;
  color: #000;
}

.next-project-info .btn:hover {
  background: #f8f8f8;
}

.next-project-image {
  overflow: hidden;
  border-radius: 12px;
}

.next-project-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.next-project-image:hover img {
  transform: scale(1.05);
}

.loading-state {
  padding: 8rem 0;
  text-align: center;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .next-project-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .project-hero {
    padding: 6rem 0 3rem;
  }
  
  .project-content {
    padding: 4rem 0;
  }
  
  .project-gallery {
    padding: 4rem 0;
  }
  
  .next-project {
    padding: 4rem 0;
  }
  
  .project-meta {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .meta-info {
    flex-wrap: wrap;
  }
  
  .section h2 {
    font-size: 1.5rem;
  }
  
  .next-project-info h3 {
    font-size: 2rem;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .gallery-item img {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .project-links {
    flex-direction: column;
  }
  
  .tech-stack,
  .project-info {
    padding: 1.5rem;
  }
  
  .window-header {
    height: 40px;
    padding: 0 16px;
  }
  
  .window-title {
    font-size: 12px;
  }
  
  .control {
    width: 12px;
    height: 12px;
  }
}
</style>