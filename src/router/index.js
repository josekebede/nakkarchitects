import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'NAKK Architecture | Addis Ababa',
      description: 'Architecture and interiors rooted in place, designed for what comes next.'
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: {
      title: 'Projects | NAKK Architecture',
      description: 'Explore residential, commercial, hospitality, interior, and institutional projects by NAKK Architecture.'
    }
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
    meta: {
      title: 'Project | NAKK Architecture',
      description: 'Explore a project by NAKK Architecture in Addis Ababa.'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'About | NAKK Architecture',
      description: 'Meet NAKK Architecture, an Addis Ababa practice creating thoughtful architecture and interiors.'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: 'Contact | NAKK Architecture',
      description: 'Contact NAKK Architecture in Addis Ababa to discuss your architecture or interior design project.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  const title = to.meta.title || 'NAKK Architecture'
  const description = to.meta.description || 'Architecture and interiors by NAKK Architecture.'
  const canonicalUrl = new URL(to.path, 'https://nakkarchitecture.com').href
  const defaultImage = 'https://nakkarchitecture.com/projects/residence-01/full/009.webp'
  const defaultImageAlt = 'Exterior courtyard view of Residence 01'

  document.title = title
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('meta[property="og:type"]')?.setAttribute('content', 'website')
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', defaultImage)
  document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', defaultImageAlt)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
})

export default router
