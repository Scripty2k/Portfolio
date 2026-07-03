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
                <span class="status-badge" :class="project.status.toLowerCase()">{{ project.status }}</span>
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

export default {
  name: 'Projects',
  setup() {
    const activeFilter = ref('All')
    const activeProject = ref(null)
    const { isRetroMode } = useRetroTheme()
    
    const filters = ['All', 'Software', 'Videos', 'Music', 'Extras']
    
    const projects = ref([
      {
        id: 28,
        title: 'Siobhan Moors Portfolio',
        description: 'A portfolio website I made for a friend named Siobhan Moors. Mainly based on Vue.js and Tailwind CSS. Also equipped with a custom Admin Panel to manage the content of the website. I also made a custom CMS for this project.',
        technologies: ["Vue.js", "Tailwind CSS", "Supabase", "Typescript"],
        year: '2026',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'image',
          src: 'https://i.postimg.cc/G90LRW7b/image.png',
          thumbnail: 'https://i.postimg.cc/G90LRW7b/image.png'
        },
        liveUrl: 'https://scripty2k.github.io/VonniePorto/',
        githubUrl: 'https://github.com/Scripty2k/VonniePorto'
      },
      {
        id: 27,
        title: 'Look for the Light - A Short Film',
        description: 'A short film I made on my free time. The clips I used was purely from the game "The Last of Us Part II". I made this film to show my love for the game and to show my skills in video editing. I used Premiere Pro and After Effects for this project.',
        technologies: ["Premiere Pro", "After Effects", "FL Studio", "Touch Designer"],
        year: '2026',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', 'behance', or 'soundcloud'
          src: 'mfjHfZlRBg4', // image URL, YouTube video ID, Behance project ID, or SoundCloud track ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
      },
      {
        id: 26,
        title: 'MixMatch - Professional Audio Mastering',
        description: 'A modern web application that automatically masters audio tracks to match professional reference tracks. Built with React, FastAPI, and the Matchering library.',
        technologies: ["React", "FastAPI", "Python", "Matchering", "Tailwind CSS", "Vite"],
        year: '2025',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'image',
          src: 'https://i.imgur.com/aKfSPTb.gif',
          thumbnail: 'https://i.imgur.com/aKfSPTb.gif'
        },
        liveUrl: 'https://scripty2k.github.io/MixMatch/',
        githubUrl: 'https://github.com/Scripty2k/MixMatch'
      },
      {
        id: 25,
        title: 'The Living Alone App',
        description: 'A student portal for students, by students. A portal made for students to help them with their daily life as a student.',
        technologies: ["Vue.js", "Typescript", "Supabase"],
        year: '2025',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', 'behance', or 'soundcloud'
          src: 'vK1bwyFzyU4', // image URL, YouTube video ID, Behance project ID, or SoundCloud track ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: 'https://github.com/Sint-Lucas/sd4-p14-schoolproject-2526-quinten-samed-amal'
      },
      {
        id: 24,
        title: 'Everything Became a Memory',
        description: 'A stress test project just to test my limits of my computer',
        technologies: ["Premiere Pro", "My Camcorder", "Friends"],
        year: '2025',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', 'behance', or 'soundcloud'
          src: 'Cueuojq0cnE', // image URL, YouTube video ID, Behance project ID, or SoundCloud track ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 23,
        title: 'Musixx (a music sharing platform)',
        description: 'A music sharing platform made for musicians to share their music with others.',
        technologies: ["Vue.js", "SQLite", "Node.js"],
        year: '2025',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', 'behance', or 'soundcloud'
          src: '9U6u32QvY6s', // image URL, YouTube video ID, Behance project ID, or SoundCloud track ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: 'https://github.com/Sint-Lucas/sd4-p13-ambitieproject-2526-Scripty2k'
      },
      {
        id: 22,
        title: 'Moving art collage',
        description: 'Some experimental video I made.',
        technologies: ["After Effects"],
        year: '2025',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', 'behance', or 'soundcloud'
          src: 'C0b4vRg2Phc', // image URL, YouTube video ID, Behance project ID, or SoundCloud track ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#',
        youtubeUrl: 'https://www.youtube.com/watch?v=C724xlKPBAw',
        youtubeText: 'See timelapse here'
      },
      {
        id: 21,
        title: 'Vonnie',
        description: 'Another short video made for fun. This will have a remaster soon.',
        technologies: ["After Effects", "My camcorder", "Friends"],
        year: '2025',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', 'behance', or 'soundcloud'
          src: 'F69JaJSa11Q', // image URL, YouTube video ID, Behance project ID, or SoundCloud track ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#',
        youtubeUrl: 'https://www.youtube.com/watch?v=cDkq7Mj3o6k',
        youtubeText: 'See timelapse here'
      },
      {
        id: 20,
        title: 'Hugging is Healthy',
        description: 'This was a video I made just for fun.',
        technologies: ["After Effects", "My camcorder", "Friends"],
        year: '2025',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', 'behance', or 'soundcloud'
          src: 'n5809vp8osw', // image URL, YouTube video ID, Behance project ID, or SoundCloud track ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 1,
        title: 'Three.JS portfolio inspiration',
        description: 'This was meant for school. But I was kinda proud of it really. This is just a simple portfolio website made with Three.JS. I looked into a lot of inspiration from other portfolios. But I made it all by myself. I used Three.JS, HTML and CSS for this project.',
        technologies: ["HTML", "CSS", "Vue", "Three.js"],
        year: '2025',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', 'behance', or 'soundcloud'
          src: 'Pntq3SkYDwU', // image URL, YouTube video ID, Behance project ID, or SoundCloud track ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: 'https://github.com/Scripty2k/LABS-Threejs'
      },
      {
        id: 2,
        title: 'Albert Heijn Team Project',
        description: 'This is somewhat of a team project I made for school. This was pretty hard to make since this was my first time working with threejs. I learned a lot from this project. I used Three.JS, HTML and CSS but also Vue.',
        technologies: ["HTML", "CSS", "Vue", "Three.js"],
        year: '2025',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', or 'behance'
          src: 'GpmbK_LvCYk', // image URL, YouTube video ID, or Behance project ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: 'https://github.com/Sint-Lucas/sd3-p12-md-project-2425-kotcha'
      },
      {
        id: 3,
        title: 'Y2K Webshop template',
        description: 'A template for a webshop inspired by Y2K aesthetics.',
        technologies: ["HTML", "CSS", "JavaScript"],
        year: '2025',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', or 'behance'
          src: 'hGOvk1YhLvw', // image URL, YouTube video ID, or Behance project ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 4,
        title: 'Python Youtube link downloader',
        description: 'A Python script that downloads videos from YouTube.',
        technologies: ["Python", "YouTube API"],
        year: '2025',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', or 'behance'
          src: '7lFg5ilmqxs', // image URL, YouTube video ID, or Behance project ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 5,
        title: 'Siobhan',
        description: 'A paper Y2K stop motion video I made for a friend named Siobhan!',
        technologies: ["After Effects",],
        year: '2025',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', or 'behance'
          src: 'hzeElRKMWtg', // image URL, YouTube video ID, or Behance project ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 6,
        title: 'Interlinked.',
        description: 'Touch Designer project made for a school assignment.',
        technologies: ['Premiere Pro', "After Effects", "Touch Designer"],
        year: '2025',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', or 'behance'
          src: 'NzEBrPx4qJg', // image URL, YouTube video ID, or Behance project ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 7,
        title: 'Scrolling Addiction',
        description: 'Short video about how people are addicted to scrolling on their phones.',
        technologies: ['Premiere Pro', "After Effects"],
        year: '2025',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', or 'behance'
          src: 'N_3nH3pBlOY', // image URL, YouTube video ID, or Behance project ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 8,
        title: 'Promo video Rhion',
        description: 'First Promotional video I made for a company called Rhion. This was my first ever paid video project.',
        technologies: ['Premiere Pro',],
        year: '2022',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', or 'behance'
          src: '5WeISIkfJHk', // image URL, YouTube video ID, or Behance project ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 9,
        title: 'First ever video trailer',
        description: 'I was pursuing my passion to be a Youtuber. So I made a trailer for my channel. This was my first ever video project.',
        technologies: ['Premiere Pro',],
        year: '2024',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', or 'behance'
          src: 'Dt-vbX9A6Mg', // image URL, YouTube video ID, or Behance project ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 10,
        title: 'Drug Abuse Awareness (School Project)',
        description: 'A short video made to raise awareness about the dangers of drug abuse.',
        technologies: ['Premiere Pro',],
        year: '2022',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image', 'youtube', or 'behance'
          src: 'Dm3Yw9ZEm_I', // image URL, YouTube video ID, or Behance project ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 11,
        title: 'Stealing costs money (School Project)',
        description: 'A short video made to raise awareness about the dangers of kleptomania.',
        technologies: ['Adobe Creative Suite', 'Figma', 'UI/UX Design'],
        year: '2022',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'behance', // 'image', 'youtube', or 'behance'
          src: '169057961/Campagne-stelen#', // Behance project ID/slug (from URL: behance.net/gallery/98765432/creative-portfolio-showcase)
          thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop&crop=center' // Preview image
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 12,
        title: 'VR Archery Game',
        description: 'A virtual reality archery game developed for Oculus Quest.',
        technologies: ['Unity', 'C#', 'Oculus SDK'],
        year: '2024',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image' or 'youtube'
          src: 'xCQke4C4oLg', // image URL or YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail for YouTube
        },
        liveUrl: '#',
        githubUrl: 'https://github.com/Sint-Lucas/final-project-p8-thedreamybulls'
      },
      {
        id: 13,
        title: 'Happy New Year 2023',
        description: 'Another short clip with my friends',
        technologies: ['Premiere Pro', 'My friends :3',],
        year: '2023',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image' or 'youtube'
          src: 'EczBldXtH3g', // image URL or YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail for YouTube
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 14,
        title: 'First cinematographify video',
        description: 'I slowly leaned into this style of video making. Kinda liked it.',
        technologies: ['Premiere Pro', 'My friends :3',],
        year: '2022',
        type: 'Videos',
        status: '',
        featured: true,
        media: {
          type: 'youtube', // 'image' or 'youtube'
          src: 'GdFD5vfXDNo', // image URL or YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail for YouTube
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 15,
        title: 'Mobile top down game',
        description: 'My first ever mobile game. This was just especially to aim to the functionality of the game ',
        technologies: ['Game Development', 'C#',],
        year: '2022',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image' or 'youtube'
          src: 'XrxuqIFutug', // image URL or YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail for YouTube
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 16,
        title: 'Personality assignment',
        description: 'I made a game for the subject called personality I had from previous year. This game was to show everything I was proud of.',
        technologies: ['Game Development', 'C#', 'After Effects',],
        year: '2022',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image' or 'youtube'
          src: 'A4yL5Cy8NkI', // image URL or YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail for YouTube
        },
        liveUrl: '#',
        githubUrl: '#'
      },
        {
        id: 17,
        title: 'Summer 2022',
        description: 'Summer 2022 changed me. I made a video about it. I realized that friends are temporarily. So I made this video at first for myself to remind myself that I need to appreciate my time. A couple days later, my friends were upset about their enviorment, school, situations, etc. So I showed them this. They loved it.',
        technologies: ['Premiere Pro',],
        year: '2022',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image' or 'youtube'
          src: 'hOtaf72imtg', // image URL or YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail for YouTube
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 18,
        title: 'Raspberry Pi Bad USB',
        description: 'A tool that turns a Raspberry Pi into a Bad USB device for penetration testing and security research. But this time harmless.',
        technologies: ['Raspberry Pi', 'Physical Computing', 'Python',],
        year: '2022',
        type: 'Software',
        status: '',
        featured: false,
        media: {
          type: 'youtube', // 'image' or 'youtube'
          src: '2hnbO9eQyyE', // image URL or YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // fallback thumbnail for YouTube
        },
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 19,
        title: 'First video project',
        description: 'My first ever video project with no plans, no experience, just looking back at life',
        technologies: ['Video Editing', 'Premiere Pro'],
        year: '2020',
        type: 'Videos',
        status: '',
        featured: false,
        media: {
          type: 'youtube',
          src: 'nQOleL_YGs0', // YouTube video ID (from URL: youtube.com/watch?v=dQw4w9WgXcQ)
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // YouTube thumbnail
        },
        liveUrl: '#',
        githubUrl: '#'
      },
    ])

    const filteredProjects = computed(() => {
      if (activeFilter.value === 'All') {
        return projects.value
      }
      return projects.value.filter(project => project.type === activeFilter.value)
    })

    const setFilter = (filter) => {
      activeFilter.value = filter
      // Reset animations when filter changes
      nextTick(() => {
        resetAnimations()
        setTimeout(() => {
          const { initScrollAnimations } = useScrollAnimations()
          initScrollAnimations()
          
          // Manually trigger revealed state for visible elements
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

    const onProjectHover = (projectId) => {
      // Add hover effects here
    }

    const onProjectLeave = () => {
      // Remove hover effects here
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
      // Reset all reveal elements
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      revealElements.forEach(el => {
        el.classList.remove('revealed')
      })
    }

    const initializeAnimations = () => {
      resetAnimations()
      
      nextTick(() => {
        // Re-initialize scroll animations
        const { initScrollAnimations } = useScrollAnimations()
        initScrollAnimations()
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
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #2d2d2d;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.status-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.status-badge.work.in.progress {
  color: #10b981;
}

.status-badge.work.in.progress::before {
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
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