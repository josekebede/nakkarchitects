import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { categories as categoryData, categoryAliases, projects as projectData } from '@/data/projects'

export const resolveCategoryId = (value) => {
  const id = typeof value === 'string' ? value : ''
  if (id === 'all' || categoryData.some((category) => category.id === id)) return id
  return categoryAliases[id] || ''
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(projectData)
  const activeCategory = ref('all')

  // Only categories that currently hold projects are shown.
  const groups = computed(() => {
    return categoryData
      .map((category) => ({
        ...category,
        projects: projects.value.filter((project) => project.category === category.id)
      }))
      .filter((group) => group.projects.length > 0)
  })

  const categories = computed(() => [
    { id: 'all', name: 'All Projects', count: projects.value.length },
    ...groups.value.map((group) => ({
      id: group.id,
      name: group.name,
      blurb: group.blurb,
      count: group.projects.length
    }))
  ])

  const filteredProjects = computed(() => {
    if (activeCategory.value === 'all') return projects.value
    return projects.value.filter((project) => project.category === activeCategory.value)
  })

  const activeGroup = computed(() => {
    return groups.value.find((group) => group.id === activeCategory.value) || null
  })

  const featuredProjects = computed(() => {
    return projects.value.filter((project) => project.featured)
  })

  const heroProject = computed(() => {
    return projects.value.find((project) => project.hero) || projects.value[0] || null
  })

  const totalImages = computed(() => {
    return projects.value.reduce((total, project) => total + (project.images?.length || 0), 0)
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
    groups,
    categories,
    activeCategory,
    activeGroup,
    filteredProjects,
    featuredProjects,
    heroProject,
    totalImages,
    setActiveCategory,
    getProjectBySlug
  }
})
