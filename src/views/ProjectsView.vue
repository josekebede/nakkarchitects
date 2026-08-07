<template>
  <div class="projects-page">
    <header class="projects-intro">
      <div class="container projects-intro__grid">
        <div>
          <p class="eyebrow">Selected portfolio</p>
          <h1>Spaces shaped around how people live, work, and gather.</h1>
        </div>
        <div class="projects-intro__aside">
          <p>
            Explore residential, commercial, hospitality, interior, and institutional
            work by NAKK Architecture in Addis Ababa.
          </p>
          <dl class="projects-intro__stats" aria-label="Portfolio totals">
            <div>
              <dt>Projects</dt>
              <dd>{{ projects.length }}</dd>
            </div>
            <div>
              <dt>Images</dt>
              <dd>{{ totalImages }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>

    <section class="projects-section" aria-labelledby="projects-heading">
      <div class="container">
        <h2 id="projects-heading" class="sr-only">Project gallery</h2>
        <ProjectFilter />

        <TransitionGroup name="projects" tag="div" class="projects-grid">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.slug"
            :project="project"
          />
        </TransitionGroup>

        <p v-if="filteredProjects.length === 0" class="projects-empty">
          No projects are available in this category yet.
        </p>
      </div>
    </section>

    <section class="projects-cta">
      <div class="container projects-cta__inner">
        <div>
          <p class="eyebrow eyebrow--light">Start a project</p>
          <h2>Have a space in mind?</h2>
        </div>
        <div>
          <p>Tell us what you are planning and where you would like to begin.</p>
          <RouterLink to="/contact" class="btn btn-white">Start a conversation</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectFilter from '@/components/projects/ProjectFilter.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const route = useRoute()
const router = useRouter()

const projects = computed(() => store.projects)
const filteredProjects = computed(() => store.filteredProjects)
const totalImages = computed(() => store.totalImages)

watch(
  () => route.query.category,
  (category) => {
    const next = typeof category === 'string' ? category : 'all'
    const isValid = store.categories.some((item) => item.id === next)
    store.setActiveCategory(isValid ? next : 'all')

    if (!isValid && category) {
      const query = { ...route.query }
      delete query.category
      router.replace({ name: 'projects', query })
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.projects-page {
  padding-top: var(--navbar-height);
  background: var(--off-white);
}

.projects-intro {
  padding: clamp(5rem, 9vw, 9rem) 0 clamp(4rem, 7vw, 7rem);
  color: var(--white);
  background:
    linear-gradient(120deg, rgba(90, 125, 124, 0.22), transparent 46%),
    var(--gray-900);
}

.projects-intro__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(280px, 0.65fr);
  gap: clamp(3rem, 8vw, 8rem);
  align-items: end;
}

.eyebrow {
  margin: 0 0 var(--space-4);
  color: var(--primary-dark);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.projects-intro .eyebrow,
.eyebrow--light {
  color: var(--primary-lighter);
}

.projects-intro h1 {
  max-width: 900px;
  margin: 0;
  color: var(--white);
  font-size: clamp(2.4rem, 5.4vw, 5.4rem);
  font-weight: var(--font-medium);
  letter-spacing: -0.045em;
  line-height: 1.02;
}

.projects-intro__aside > p {
  margin: 0 0 var(--space-8);
  color: var(--gray-200);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

.projects-intro__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.22);
}

.projects-intro__stats div {
  padding-top: var(--space-4);
}

.projects-intro__stats dt {
  color: var(--gray-300);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

.projects-intro__stats dd {
  margin: var(--space-1) 0 0;
  color: var(--white);
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
}

.projects-section {
  padding: 0 0 var(--space-24);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-10) var(--space-8);
}

.projects-enter-active,
.projects-leave-active,
.projects-move {
  transition: opacity 280ms ease, transform 280ms ease;
}

.projects-enter-from,
.projects-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.projects-empty {
  padding: var(--space-20) 0;
  color: var(--text-secondary);
  text-align: center;
}

.projects-cta {
  padding: var(--space-20) 0;
  background: var(--primary-dark);
}

.projects-cta__inner {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 0.65fr);
  gap: var(--space-16);
  align-items: end;
}

.projects-cta h2 {
  margin: 0;
  color: var(--white);
  font-size: clamp(2rem, 4.5vw, 4.5rem);
  font-weight: var(--font-medium);
}

.projects-cta p:not(.eyebrow) {
  margin: 0 0 var(--space-6);
  color: var(--accent);
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .projects-intro__grid {
    gap: var(--space-12);
  }
}

@media (max-width: 768px) {
  .projects-page {
    padding-top: var(--navbar-height-mobile);
  }

  .projects-intro__grid,
  .projects-cta__inner {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }

  .projects-intro__aside {
    max-width: 560px;
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}
</style>
