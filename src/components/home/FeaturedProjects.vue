<template>
  <section class="featured" aria-labelledby="featured-heading">
    <div class="container">
      <div class="featured__header">
        <div>
          <p class="featured__eyebrow">Selected work</p>
          <h2 id="featured-heading">A closer look at recent projects.</h2>
        </div>
        <RouterLink to="/projects" class="featured__all">
          Explore all projects
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </RouterLink>
      </div>

      <div class="featured__grid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.slug"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const featuredProjects = computed(() => store.featuredProjects)
</script>

<style scoped>
.featured {
  padding: clamp(5rem, 9vw, 9rem) 0;
  background: var(--off-white);
}

.featured__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: var(--space-10);
  margin-bottom: clamp(3rem, 6vw, 5.5rem);
}

.featured__eyebrow {
  margin: 0 0 var(--space-4);
  color: var(--primary-dark);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.featured h2 {
  max-width: 760px;
  margin: 0;
  color: var(--gray-900);
  font-size: clamp(2.2rem, 4.6vw, 4.5rem);
  font-weight: var(--font-medium);
  letter-spacing: -0.045em;
  line-height: 1.04;
}

.featured__all {
  display: inline-flex;
  flex: 0 0 auto;
  min-height: 44px;
  align-items: center;
  gap: var(--space-3);
  color: var(--primary-dark);
  border-bottom: 1px solid var(--primary-dark);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.featured__all svg {
  width: 19px;
  height: 19px;
  transition: transform var(--transition-fast);
}

.featured__all:hover svg,
.featured__all:focus-visible svg {
  transform: translateX(4px);
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-14, 3.5rem) var(--space-8);
}

@media (max-width: 720px) {
  .featured__header {
    display: block;
  }

  .featured__all {
    margin-top: var(--space-8);
  }

  .featured__grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}
</style>
