import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Contact from '../views/Contact.vue'
import SecretLogin from '../views/SecretLogin.vue'
import SecretPanel from '../views/SecretPanel.vue'
import { account } from '../lib/appwrite'

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
  },
  {
    path: '/scripty2k-secret',
    name: 'SecretLogin',
    component: SecretLogin
  },
  {
    path: '/scripty2k-secret/panel',
    name: 'SecretPanel',
    component: SecretPanel,
    meta: { requiresAuth: true }
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

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  try {
    await account.get()
    next()
  } catch {
    next({ name: 'SecretLogin' })
  }
})

export default router