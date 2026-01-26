<template>
  <section class="featured section">
    <div class="container">
      <!-- Header -->
      <AnimatedSection animation="fade-in" class="section-header">
        <span class="featured__label">Our Work</span>
        <h2>Featured Projects</h2>
        <p>Discover our latest architectural achievements</p>
      </AnimatedSection>

      <!-- Projects Grid -->
      <div class="featured__grid">
        <AnimatedSection
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          animation="fade-in-up"
          :delay="`${index * 0.15}s`"
          class="featured__item"
        >
          <RouterLink :to="`/projects`" class="featured__card img-zoom">
            <div class="featured__image">
              <img
                :src="getImagePath(project.image)"
                :alt="project.name"
                loading="lazy"
              />
            </div>
            <div class="featured__overlay">
              <span class="featured__category">{{ formatCategory(project.category) }}</span>
              <h3 class="featured__title">{{ project.name }}</h3>
              <p class="featured__description">{{ project.description }}</p>
              <span class="featured__link">
                View Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </RouterLink>
        </AnimatedSection>
      </div>

      <!-- CTA -->
      <AnimatedSection animation="fade-in" class="featured__cta">
        <RouterLink to="/projects" class="btn btn-primary btn-lg">
          View All Projects
        </RouterLink>
      </AnimatedSection>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import AnimatedSection from '@/components/common/AnimatedSection.vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const featuredProjects = computed(() => store.featuredProjects)

const getImagePath = (filename) => {
  return new URL(`../../assets/images/${filename}`, import.meta.url).href
}

const formatCategory = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
}
</script>

<style scoped>
.featured {
  background-color: var(--bg-primary);
}

.featured__label {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--space-2);
}

/* Grid */
.featured__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

/* Card */
.featured__card {
  display: block;
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  aspect-ratio: 4/5;
}

.featured__image {
  position: absolute;
  inset: 0;
}

.featured__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.featured__card:hover .featured__image img {
  transform: scale(1.08);
}

/* Overlay */
.featured__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-8);
  background: linear-gradient(
    to top,
    rgba(26, 42, 42, 0.95) 0%,
    rgba(26, 42, 42, 0.4) 50%,
    transparent 100%
  );
  color: var(--white);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
}

.featured__card:hover .featured__overlay {
  opacity: 1;
  transform: translateY(0);
}

.featured__category {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--primary-light);
  margin-bottom: var(--space-2);
}

.featured__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--white);
  margin-bottom: var(--space-2);
}

.featured__description {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--space-4);
  line-height: var(--leading-relaxed);
}

.featured__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  color: var(--white);
  transition: gap 0.3s ease;
}

.featured__card:hover .featured__link {
  gap: var(--space-3);
}

.featured__link svg {
  width: 16px;
  height: 16px;
}

/* CTA */
.featured__cta {
  text-align: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .featured__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .featured__item:nth-child(3) {
    grid-column: span 2;
  }

  .featured__item:nth-child(3) .featured__card {
    aspect-ratio: 16/9;
  }
}

@media (max-width: 640px) {
  .featured__grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .featured__item:nth-child(3) {
    grid-column: span 1;
  }

  .featured__item:nth-child(3) .featured__card {
    aspect-ratio: 4/5;
  }

  .featured__card {
    aspect-ratio: 3/4;
  }

  .featured__overlay {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
