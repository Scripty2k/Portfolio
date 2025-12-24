import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetail
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        resolve(savedPosition)
      } else {
        nextTick(() => {
          window.scrollTo(0, 0)
          resolve({ top: 0 })
        })
      }
    })
  }
})

export default router