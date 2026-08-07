import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { projects as projectData } from '@/data/projects'

const categoryOrder = [
  ['residential', 'Residential'],
  ['interior', 'Interior Design'],
  ['commercial', 'Commercial'],
  ['hospitality', 'Hospitality'],
  ['institutional', 'Institutional']
]

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(projectData)
  const activeCategory = ref('all')

  const categories = computed(() => {
    const counts = projects.value.reduce((result, project) => {
      result[project.category] = (result[project.category] || 0) + 1
      return result
    }, {})

    return [
      { id: 'all', name: 'All Projects', count: projects.value.length },
      ...categoryOrder
        .filter(([id]) => counts[id])
        .map(([id, name]) => ({ id, name, count: counts[id] }))
    ]
  })

  const filteredProjects = computed(() => {
    if (activeCategory.value === 'all') return projects.value
    return projects.value.filter((project) => project.category === activeCategory.value)
  })

  const featuredProjects = computed(() => {
    return projects.value.filter((project) => project.featured)
  })

  const heroProject = computed(() => {
    return projects.value.find((project) => project.hero) || projects.value[0] || null
  })

  const totalImages = computed(() => {
    return projects.value.reduce((total, project) => total + project.images.length, 0)
  })

  function setActiveCategory(category) {
    const isValid = categories.value.some((item) => item.id === category)
    activeCategory.value = isValid ? category : 'all'
  }

  function getProjectBySlug(slug) {
    return projects.value.find((project) => project.slug === slug)
  }

  return {
    projects,
    categories,
    activeCategory,
    filteredProjects,
    featuredProjects,
    heroProject,
    totalImages,
    setActiveCategory,
    getProjectBySlug
  }
})
