import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([
    // Residential Projects
    {
      id: 1,
      name: 'Modern Residence',
      category: 'residential',
      description: 'Contemporary living space with minimalist design',
      image: 'img7.jpg',
      featured: true
    },
    {
      id: 2,
      name: 'Urban Villa',
      category: 'residential',
      description: 'Elegant urban dwelling with modern amenities',
      image: 'img8.jpg',
      featured: false
    },
    {
      id: 3,
      name: 'Family Estate',
      category: 'residential',
      description: 'Spacious family home with functional elegance',
      image: 'img9.jpg',
      featured: false
    },
    {
      id: 4,
      name: 'Suburban Retreat',
      category: 'residential',
      description: 'Peaceful suburban residence with modern touches',
      image: 'img10.jpg',
      featured: false
    },
    // Commercial Projects
    {
      id: 5,
      name: 'Business Complex',
      category: 'commercial',
      description: 'Modern office spaces for the contemporary workplace',
      image: 'img11.jpeg',
      featured: true
    },
    {
      id: 6,
      name: 'Corporate Tower',
      category: 'commercial',
      description: 'Iconic architecture for business excellence',
      image: 'img12.jpeg',
      featured: false
    },
    {
      id: 7,
      name: 'Retail Center',
      category: 'commercial',
      description: 'Commercial excellence in retail design',
      image: 'img13.jpeg',
      featured: false
    },
    {
      id: 8,
      name: 'Office Building',
      category: 'commercial',
      description: 'Professional spaces designed for productivity',
      image: 'img14.jpeg',
      featured: false
    },
    // Institutional Projects
    {
      id: 9,
      name: 'Educational Facility',
      category: 'institutional',
      description: 'Learning environments that inspire',
      image: 'img15.jpeg',
      featured: false
    },
    {
      id: 10,
      name: 'Cultural Center',
      category: 'institutional',
      description: 'Community spaces for cultural engagement',
      image: 'img16.jpeg',
      featured: true
    },
    {
      id: 11,
      name: 'Public Building',
      category: 'institutional',
      description: 'Civic architecture serving the community',
      image: 'img18.jpeg',
      featured: false
    },
    // Hospitality Projects
    {
      id: 12,
      name: 'Boutique Hotel',
      category: 'hospitality',
      description: 'Luxury hospitality with distinctive design',
      image: 'img19.jpeg',
      featured: false
    },
    {
      id: 13,
      name: 'Resort Complex',
      category: 'hospitality',
      description: 'Relaxation spaces in natural settings',
      image: 'img20.jpeg',
      featured: false
    },
    {
      id: 14,
      name: 'Restaurant Design',
      category: 'hospitality',
      description: 'Culinary experiences through thoughtful design',
      image: 'img21.jpeg',
      featured: false
    },
    // Mixed-Use Projects
    {
      id: 15,
      name: 'Urban Development',
      category: 'mixed-use',
      description: 'Integrated communities for modern living',
      image: 'img22.jpeg',
      featured: false
    },
    {
      id: 16,
      name: 'City Center',
      category: 'mixed-use',
      description: 'Multi-purpose spaces for urban life',
      image: 'img23.jpeg',
      featured: false
    },
    {
      id: 17,
      name: 'Plaza Complex',
      category: 'mixed-use',
      description: 'Dynamic environments for work and play',
      image: 'img24.jpeg',
      featured: false
    },
    // Sustainable Projects
    {
      id: 18,
      name: 'Eco Building',
      category: 'sustainable',
      description: 'Green architecture for a better future',
      image: 'img25.jpeg',
      featured: false
    },
    {
      id: 19,
      name: 'Solar Complex',
      category: 'sustainable',
      description: 'Renewable energy integrated design',
      image: 'img26.jpeg',
      featured: false
    },
    {
      id: 20,
      name: 'Green Building',
      category: 'sustainable',
      description: 'Environmental design for sustainability',
      image: 'img27.jpeg',
      featured: false
    }
  ])

  const categories = ref([
    { id: 'all', name: 'All Projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'institutional', name: 'Institutional' },
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'mixed-use', name: 'Mixed-Use' },
    { id: 'sustainable', name: 'Sustainable' }
  ])

  const activeCategory = ref('all')

  const filteredProjects = computed(() => {
    if (activeCategory.value === 'all') {
      return projects.value
    }
    return projects.value.filter(p => p.category === activeCategory.value)
  })

  const featuredProjects = computed(() => {
    return projects.value.filter(p => p.featured)
  })

  const heroSlides = ref([
    {
      id: 1,
      type: 'image',
      src: 'img1.jpg',
      title: 'Modern Design',
      subtitle: 'Creating spaces that inspire'
    },
    {
      id: 2,
      type: 'image',
      src: 'img2.jpg',
      title: 'Innovative Solutions',
      subtitle: 'Architecture for tomorrow'
    },
    {
      id: 3,
      type: 'image',
      src: 'img3.jpg',
      title: 'Sustainable Living',
      subtitle: 'Building a better future'
    },
    {
      id: 4,
      type: 'video',
      src: 'img17.mp4',
      poster: 'img4.jpg',
      title: 'Timeless Elegance',
      subtitle: 'Where form meets function'
    },
    {
      id: 5,
      type: 'image',
      src: 'img5.jpg',
      title: 'Urban Excellence',
      subtitle: 'Transforming cityscapes'
    }
  ])

  function setActiveCategory(category) {
    activeCategory.value = category
  }

  return {
    projects,
    categories,
    activeCategory,
    filteredProjects,
    featuredProjects,
    heroSlides,
    setActiveCategory
  }
})
