import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'NAKK Architects | Addis Ababa',
      description: 'Architecture and interiors rooted in place, designed for what comes next.'
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: {
      title: 'Projects | NAKK Architects',
      description: 'Explore residential, commercial, hospitality, interior, and institutional projects by NAKK Architects.'
    }
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
    meta: {
      title: 'Project | NAKK Architects',
      description: 'Explore a project by NAKK Architects in Addis Ababa.'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'About | NAKK Architects',
      description: 'Meet NAKK Architects, an Addis Ababa practice creating thoughtful architecture and interiors.'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: 'Contact | NAKK Architects',
      description: 'Contact NAKK Architects in Addis Ababa to discuss your architecture or interior design project.'
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
      // top: keeps the target clear of the fixed navbar
      const target = { el: to.hash, top: 96, behavior: 'smooth' }
      // Coming from another page, the new page only appears once the old one has
      // faded out (about 0.3s), so give it a moment before looking for the target.
      if (from.path !== to.path) {
        return new Promise((resolve) => setTimeout(() => resolve(target), 500))
      }
      return target
    }
    // left: 0 too, so a page that was nudged sideways never stays that way
    return { top: 0, left: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  const title = to.meta.title || 'NAKK Architects'
  const description = to.meta.description || 'Architecture and interiors by NAKK Architects.'
  const canonicalUrl = new URL(to.path, 'https://nakkarchitects.com').href
  const defaultImage = 'https://nakkarchitects.com/projects/limestone-villa/full/023.webp'
  const defaultImageAlt = 'Entry court and glazed facade of a two-storey villa'

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
