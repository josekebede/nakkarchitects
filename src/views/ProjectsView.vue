<template>
  <div class="projects-page">
    <!-- Hero -->
    <section class="projects-hero">
      <div class="projects-hero__bg" :style="{ backgroundImage: `url(${heroImage})` }" />
      <div class="projects-hero__overlay" />
      <div class="projects-hero__content container">
        <AnimatedSection animation="fade-in-up">
          <h1 class="projects-hero__title">Our Projects</h1>
          <p class="projects-hero__subtitle">
            Explore our portfolio of architectural excellence
          </p>
        </AnimatedSection>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="projects-section section">
      <div class="container">
        <!-- Filter -->
        <AnimatedSection animation="fade-in">
          <ProjectFilter />
        </AnimatedSection>

        <!-- Grid -->
        <TransitionGroup name="projects" tag="div" class="projects-grid">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
          />
        </TransitionGroup>

        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="projects-empty">
          <p>No projects found in this category.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="projects-cta section bg-accent">
      <div class="container">
        <AnimatedSection animation="fade-in" class="projects-cta__content">
          <h2>Have a Project in Mind?</h2>
          <p>
            We'd love to hear about your vision. Let's discuss how we can help
            bring your architectural dreams to reality.
          </p>
          <RouterLink to="/contact" class="btn btn-primary btn-lg">
            Start a Conversation
          </RouterLink>
        </AnimatedSection>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AnimatedSection from '@/components/common/AnimatedSection.vue'
import ProjectFilter from '@/components/projects/ProjectFilter.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const filteredProjects = computed(() => store.filteredProjects)

const heroImage = new URL('@/assets/images/img3.jpg', import.meta.url).href
</script>

<style scoped>
.projects-page {
  padding-top: var(--navbar-height);
}

/* Hero */
.projects-hero {
  position: relative;
  height: 50vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.projects-hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.projects-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(26, 42, 42, 0.7) 0%,
    rgba(26, 42, 42, 0.5) 100%
  );
}

.projects-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--white);
}

.projects-hero__title {
  font-size: var(--text-5xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-4);
}

.projects-hero__subtitle {
  font-size: var(--text-xl);
  font-weight: var(--font-light);
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* Projects Section */
.projects-section {
  background-color: var(--bg-secondary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

/* Transition animations */
.projects-enter-active,
.projects-leave-active {
  transition: all 0.5s ease;
}

.projects-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.projects-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.projects-move {
  transition: transform 0.5s ease;
}

/* Empty State */
.projects-empty {
  text-align: center;
  padding: var(--space-16);
  color: var(--text-muted);
}

/* CTA Section */
.projects-cta {
  text-align: center;
}

.projects-cta__content {
  max-width: 600px;
  margin: 0 auto;
}

.projects-cta h2 {
  color: var(--primary-dark);
  margin-bottom: var(--space-4);
}

.projects-cta p {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}

/* Responsive */
@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-page {
    padding-top: var(--navbar-height-mobile);
  }

  .projects-hero {
    height: 40vh;
    min-height: 300px;
  }

  .projects-hero__title {
    font-size: var(--text-4xl);
  }

  .projects-hero__subtitle {
    font-size: var(--text-lg);
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}
</style>
