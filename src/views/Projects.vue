<template>
  <div class="projects">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content reveal">
          <h1 class="glitch-title" data-text="Work">Work</h1>
          <p class="hero-subtitle animate-fade-in-up">Selected projects and experiments</p>
        </div>
      </div>
    </section>

    <section class="projects-section">
      <!-- Notification Sticker -->
      <!-- <img v-if="!isRetroMode" :src="notificationImage" alt="notification" class="notification-sticker" /> -->
      
      <div class="container">
        <!-- Filter Buttons -->
        <div class="filter-buttons reveal">
          <button 
            v-for="filter in filters" 
            :key="filter"
            class="filter-btn hover-target"
            :class="{ active: activeFilter === filter }"
            @click="setFilter(filter)"
          >
            {{ filter }}
          </button>
        </div>

        <!-- Music Filter Message -->
        <div v-if="activeFilter === 'Music'" class="music-section reveal">
          <h2 class="music-title">About that...</h2>
          <div class="music-message">
            <p>I don't think adding every single song without any cool timelapses or descriptions would work. At this point, just go to my <a href="https://open.spotify.com/artist/7bc3TWzNRWbVICIjVvGoac" target="_blank" rel="noopener noreferrer" class="music-link spotify-link">Spotify</a> or <a href="https://soundcloud.com/Scripty2k" target="_blank" rel="noopener noreferrer" class="music-link soundcloud-link">SoundCloud</a>! :)</p>
          </div>
        </div>

        <div class="projects-grid">
          <div 
            class="project-card reveal-scale hover-lift" 
            v-for="(project, index) in filteredProjects" 
            :key="project.id"
            :class="{ 'featured': project.featured }"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @mouseenter="onProjectHover(project.id)"
            @mouseleave="onProjectLeave"
          >
            <div class="project-image">
              <div class="project-number">{{ String(index + 1).padStart(2, '0') }}</div>
              
              <!-- Custom Media Background -->
              <div class="project-media-container">
                <!-- Image Background -->
                <div 
                  v-if="project.media.type === 'image'" 
                  class="project-image-bg"
                  :style="{ backgroundImage: `url(${project.media.src})` }"
                ></div>
                
                <!-- YouTube Video Background -->
                <div 
                  v-else-if="project.media.type === 'youtube'" 
                  class="project-youtube-bg"
                >
                  <iframe
                    :src="`https://www.youtube.com/embed/${project.media.src}?controls=1&showinfo=0&rel=0&autoplay=0&loop=1&mute=0&playlist=${project.media.src}`"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="youtube-iframe"
                  ></iframe>
                </div>
                
                <!-- Behance Preview Background -->
                <div 
                  v-else-if="project.media.type === 'behance'" 
                  class="project-behance-bg"
                  :style="{ backgroundImage: `url(${project.media.thumbnail})` }"
                >
                  <div class="behance-overlay">
                    <div class="behance-logo">
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
                        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.665-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                      </svg>
                    </div>
                    <div class="behance-text">View on Behance</div>
                  </div>
                  <a 
                    :href="`https://www.behance.net/gallery/${project.media.src}`" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="behance-link"
                  ></a>
                </div>
                
                <!-- Instagram Video Background -->                                                              
                <div 
                  v-else-if="project.media.type === 'instagram'" 
                  class="project-instagram-bg"
                >
                  <iframe
                    :src="`https://www.instagram.com/p/${project.media.src}/embed`"
                    frameborder="0"
                    scrolling="no"
                    allowtransparency="true"
                    class="instagram-iframe"
                  ></iframe>
                </div>
                
                <!-- SoundCloud Audio Background -->
                <div 
                  v-else-if="project.media.type === 'soundcloud'" 
                  class="project-soundcloud-bg"
                >
                  <iframe
                    :src="`https://w.soundcloud.com/player/?url=${encodeURIComponent(project.media.src)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`"
                    frameborder="0"
                    allow="autoplay"
                    class="soundcloud-iframe"
                  ></iframe>
                </div>
                
                <!-- Fallback for unknown types -->
                <div 
                  v-else 
                  class="project-default-bg"
                  :style="{ backgroundImage: `url(${project.media.thumbnail || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop'})` }"
                ></div>
              </div>
              
              <div class="project-status" v-if="project.status">
                <span class="status-badge" :class="project.status.toLowerCase().replace(/[^a-z0-9]/g, '-')">{{ project.status }}</span>
              </div>
            </div>
            
            <div class="project-content">
              <div class="project-meta">
                <span class="project-year">{{ project.year }}</span>
                <span class="project-type">{{ project.type }}</span>
              </div>
              
              <h3 class="project-title hover-target">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              
              <a v-if="project.githubUrl && project.githubUrl !== '#'" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="project-github-link">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
              
              <a v-if="project.liveUrl && project.liveUrl !== '#'" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="project-live-link">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                View Live Site
              </a>
              
              <a v-if="project.youtubeUrl && project.youtubeUrl !== '#'" :href="project.youtubeUrl" target="_blank" rel="noopener noreferrer" class="project-youtube-link">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                {{ project.youtubeText || 'View on YouTube' }}
              </a>
              
              <div class="project-tech">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech" 
                  class="tech-tag hover-scale"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content reveal">
          <h2 class="animate-fade-in-up">Have a project in mind?</h2>
          <p class="animate-fade-in-up animate-delay-200">Let's discuss how we can bring your ideas to life.</p>
          <router-link to="/contact" class="btn btn-primary hover-lift animate-fade-in-up animate-delay-400">
            <span>Start a conversation</span>
            <div class="btn-particles"></div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Project Detail Modal -->
    <div class="project-modal" :class="{ active: activeProject }" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <div v-if="activeProject" class="modal-body">
          <h3>{{ activeProject.title }}</h3>
          <p>{{ activeProject.description }}</p>
          <!-- Add more project details here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onActivated, nextTick } from 'vue'
import { useScrollAnimations } from '../composables/useAnimations.js'
import { useRetroTheme } from '../composables/useRetroTheme.js'
import notificationImage from '../assets/notification.png'
import { staticProjects } from '../data/staticProjects.js'
import { databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_PROJECTS } from '../lib/appwrite.js'
import { Query } from 'appwrite'

export default {
  name: 'Projects',
  setup() {
    const activeFilter = ref('All')
    const activeProject = ref(null)
    const { isRetroMode } = useRetroTheme()
    
    const filters = ['All', 'Software', 'Videos', 'Music', 'Extras']
    
    const projects = ref(staticProjects)

    const mapDocumentToProject = (doc) => {
      let techs = []
      if (Array.isArray(doc.technologies)) {
        techs = doc.technologies
      } else if (typeof doc.technologies === 'string') {
        techs = doc.technologies.split(',').map(t => t.trim()).filter(Boolean)
      }

      return {
        id: doc.$id || doc.id,
        title: doc.title || '',
        description: doc.description || '',
        technologies: techs,
        year: doc.year || '',
        type: doc.type || 'Software',
        status: doc.status || '',
        featured: Boolean(doc.featured),
        media: {
          type: doc.media_type || 'image',
          src: doc.media_src || '',
          thumbnail: doc.media_thumbnail || doc.media_src || ''
        },
        liveUrl: doc.live_url || '#',
        githubUrl: doc.github_url || '#',
        youtubeUrl: doc.youtube_url || '',
        youtubeText: doc.youtube_text || ''
      }
    }

    const triggerReanimation = () => {
      nextTick(() => {
        resetAnimations()
        setTimeout(() => {
          const { initScrollAnimations } = useScrollAnimations()
          initScrollAnimations()
          
          const revealElements = document.querySelectorAll('.projects-grid .reveal-scale')
          revealElements.forEach(el => {
            const rect = el.getBoundingClientRect()
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0
            if (isVisible) {
              el.classList.add('revealed')
            }
          })
        }, 100)
      })
    }

    const loadProjectsFromAppwrite = async () => {
      try {
        const response = await databases.listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_PROJECTS,
          [Query.limit(100)]
        )

        if (response && response.documents && response.documents.length > 0) {
          const docs = [...response.documents]
          docs.sort((a, b) => {
            const valA = typeof a.order_num === 'number' ? a.order_num : 99999
            const valB = typeof b.order_num === 'number' ? b.order_num : 99999
            return valA - valB
          })
          projects.value = docs.map(mapDocumentToProject)
        }
      } catch (err) {
        console.warn('Appwrite projects query note (using local list as fallback):', err.message || err)
      } finally {
        triggerReanimation()
      }
    }

    const filteredProjects = computed(() => {
      if (activeFilter.value === 'All') {
        return projects.value
      }
      return projects.value.filter(project => project.type === activeFilter.value)
    })

    const setFilter = (filter) => {
      activeFilter.value = filter
      triggerReanimation()
    }

    const onProjectHover = (projectId) => {
      // Add hover effects here if needed
    }

    const onProjectLeave = () => {
      // Remove hover effects here if needed
    }

    const openModal = (project) => {
      activeProject.value = project
      document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
      activeProject.value = null
      document.body.style.overflow = 'auto'
    }

    const resetAnimations = () => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      revealElements.forEach(el => {
        el.classList.remove('revealed')
      })
    }

    const initializeAnimations = () => {
      resetAnimations()
      nextTick(() => {
        const { initScrollAnimations } = useScrollAnimations()
        initScrollAnimations()
      })
    }

    onMounted(() => {
      initializeAnimations()
      loadProjectsFromAppwrite()
    })

    onActivated(() => {
      initializeAnimations()
      loadProjectsFromAppwrite()
    })

    return {
      filters,
      activeFilter,
      projects,
      filteredProjects,
      activeProject,
      setFilter,
      onProjectHover,
      onProjectLeave,
      openModal,
      closeModal,
      notificationImage,
      isRetroMode
    }
  }
}
</script>

<style scoped>
.projects {
  background: #fff0df;
}

.hero-section {
  padding: 8rem 0 4rem;
  background: #fff0df;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
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

.projects-section {
  padding: 6rem 0;
  position: relative;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  background: #292524;
  color: #fff0df;
  border-color: #292524;
  transform: translateY(-1px);
}

.music-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.music-title {
  font-size: 2rem;
  font-weight: 700;
  color: #292524;
  margin: 0;
  animation: slideIn 0.5s ease-out;
}

.music-message {
  text-align: center;
  padding: 2rem;
  background: #f5e5d4;
  border-radius: 12px;
  border: 1px solid #eee;
  animation: slideIn 0.5s ease-out;
}

.music-message p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
}

.music-link {
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  border-bottom: 2px solid;
}

.spotify-link {
  color: #1DB954;
  border-bottom-color: #1DB954;
}

.spotify-link:hover {
  color: #1ed760;
  border-bottom-color: #1ed760;
}

.soundcloud-link {
  color: #FF5500;
  border-bottom-color: #FF5500;
}

.soundcloud-link:hover {
  color: #FF7722;
  border-bottom-color: #FF7722;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 4rem 3rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.project-card.featured {
  grid-column: span 2;
}

.project-card:hover {
  transform: translateY(-8px);
}

.project-image {
  aspect-ratio: 16/10;
  position: relative;
  margin-bottom: 2rem;
  overflow: hidden;
  cursor: pointer;
  border-radius: 12px;
  padding: 1rem;
  background: #fff0df;
}

.project-media-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.project-image-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image-bg {
  transform: scale(1.05);
}

.project-youtube-bg {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: none;
  pointer-events: auto;
  border-radius: 8px;
}

.project-behance-bg {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.project-card:hover .project-behance-bg {
  transform: scale(1.05);
}

.behance-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 105, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  text-align: center;
}

.project-behance-bg:hover .behance-overlay {
  opacity: 1;
}

.behance-logo {
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

.behance-text {
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.behance-link {
  position: absolute;
  inset: 0;
  z-index: 10;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.behance-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: none;
  pointer-events: auto;
  border-radius: 8px;
}

.project-instagram-bg {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.instagram-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: none;
  pointer-events: auto;
  border-radius: 8px;
  background: white;
}

.project-soundcloud-bg {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #ff5500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.soundcloud-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: none;
  pointer-events: auto;
  border-radius: 8px;
  background: transparent;
}

.project-default-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: transform 0.3s ease;
}

.project-card:hover .project-default-bg {
  transform: scale(1.05);
}

.project-number {
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 4rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.1);
  line-height: 1;
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-image:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.project-btn {
  padding: 0.8rem 1.5rem;
  font-size: 0.85rem;
  min-width: 120px;
  text-align: center;
  border-radius: 8px;
}

.project-btn .btn-ripple {
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

.project-btn:hover .btn-ripple {
  width: 300px;
  height: 300px;
}

.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-year {
  color: #666;
}

.project-type {
  color: #292524;
  font-weight: 500;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #292524;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.project-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-github-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2A2524;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
  border-bottom: 1px solid transparent;
  width: fit-content;
}

.project-github-link:hover {
  color: #666;
  border-bottom-color: #666;
}

.project-github-link svg {
  transition: transform 0.2s ease;
}

.project-github-link:hover svg {
  transform: translateX(2px);
}

.project-live-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2A2524;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  border-bottom: 1px solid transparent;
  width: fit-content;
}

.project-live-link:hover {
  color: #666;
  border-bottom-color: #666;
}

.project-live-link svg {
  transition: transform 0.2s ease;
}

.project-live-link:hover svg {
  transform: translateX(2px);
}

.project-youtube-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff0000;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  border-bottom: 1px solid transparent;
  width: fit-content;
}

.project-youtube-link:hover {
  color: #cc0000;
  border-bottom-color: #cc0000;
}

.project-youtube-link svg {
  transition: transform 0.2s ease;
}

.project-youtube-link:hover svg {
  transform: translateX(2px);
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.5rem 0;
  justify-content: center;
}

.tech-tag {
  background: #f5e5d4;
  color: #666;
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background: #292524;
  color: #fff0df;
  border-color: #292524;
}

.cta-section {
  padding: 6rem 0;
  background: #fff0df;
  text-align: center;
}

.cta-content h2 {
  margin-bottom: 1rem;
  color: #292524;
}

.cta-content p {
  margin-bottom: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.project-status {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 10;
  pointer-events: none;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
}

.status-badge::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: pulse-dot 1.8s ease-in-out infinite;
}

/* Green dot & text for Live / Online / Active */
.status-badge[class*="live"]::before,
.status-badge[class*="online"]::before,
.status-badge[class*="active"]::before {
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}
.status-badge[class*="live"],
.status-badge[class*="online"],
.status-badge[class*="active"] {
  color: #6ee7b7;
}

/* Amber/Orange dot & text for W.I.P / Work in progress */
.status-badge[class*="wip"]::before,
.status-badge[class*="w-i-p"]::before,
.status-badge[class*="progress"]::before {
  background: #fbbf24;
  box-shadow: 0 0 8px #fbbf24;
}
.status-badge[class*="wip"],
.status-badge[class*="w-i-p"],
.status-badge[class*="progress"] {
  color: #fde68a;
}

/* Blue dot & text for Completed / Done */
.status-badge[class*="complete"]::before,
.status-badge[class*="done"]::before {
  background: #3b82f6;
  box-shadow: 0 0 8px #3b82f6;
}
.status-badge[class*="complete"],
.status-badge[class*="done"] {
  color: #93c5fd;
}

/* Purple dot for Concept / Soon */
.status-badge[class*="concept"]::before,
.status-badge[class*="soon"]::before {
  background: #a855f7;
  box-shadow: 0 0 8px #a855f7;
}
.status-badge[class*="concept"],
.status-badge[class*="soon"] {
  color: #e9d5ff;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.8);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 0 3rem;
  }

  .projects-section {
    padding: 4rem 0;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .project-card.featured {
    grid-column: span 1;
  }

  .project-number {
    font-size: 3rem;
    top: 1.5rem;
    left: 1.5rem;
  }

  .project-links {
    flex-direction: row;
    justify-content: center;
    gap: 0.75rem;
  }

  .project-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    min-width: 100px;
  }

  .filter-buttons {
    gap: 0.5rem;
    margin-bottom: 3rem;
  }

  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }

  .cta-section {
    padding: 4rem 0;
  }
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .notification-sticker {
    display: none;
  }
}

/* Notification Sticker Styles */
.notification-sticker {
  position: absolute;
  top: -20rem;
  right: -5rem;
  max-width: 400px;
  width: auto;
  height: auto;
  z-index: 50;
  pointer-events: none;

}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>