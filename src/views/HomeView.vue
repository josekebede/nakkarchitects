<template>
  <div class="home">
    <HeroSlider />
    <AboutPreview />
    <FeaturedProjects />
    <ClientLogos />

    <!-- Services Preview Section -->
    <section class="services-preview section bg-accent">
      <div class="container">
        <AnimatedSection animation="fade-in" class="section-header">
          <span class="services-preview__label">What We Do</span>
          <h2>Our Services</h2>
          <p>Comprehensive architectural solutions for every project</p>
        </AnimatedSection>

        <div class="services-preview__grid">
          <AnimatedSection
            v-for="(service, index) in services"
            :key="service.title"
            animation="fade-in-up"
            :delay="`${index * 0.1}s`"
            class="services-preview__card"
          >
            <div class="services-preview__icon">
              <component :is="service.icon" />
            </div>
            <h3 class="services-preview__title">{{ service.title }}</h3>
            <p class="services-preview__text">{{ service.description }}</p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section section bg-dark">
      <div class="container">
        <AnimatedSection animation="fade-in" class="cta-section__content">
          <h2 class="cta-section__title">Ready to Start Your Project?</h2>
          <p class="cta-section__text">
            Let's discuss how we can bring your architectural vision to life.
            Our team is ready to help you create something extraordinary.
          </p>
          <RouterLink to="/contact" class="btn btn-white btn-lg">
            Get In Touch
          </RouterLink>
        </AnimatedSection>
      </div>
    </section>
  </div>
</template>

<script setup>
import { h } from 'vue'
import HeroSlider from '@/components/home/HeroSlider.vue'
import AboutPreview from '@/components/home/AboutPreview.vue'
import FeaturedProjects from '@/components/home/FeaturedProjects.vue'
import AnimatedSection from '@/components/common/AnimatedSection.vue'
import ClientLogos from '@/components/common/ClientLogos.vue'

// Service icons as render functions
const ArchitectureIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('path', { d: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6' })
])

const InteriorIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('rect', { x: '3', y: '11', width: '18', height: '10', rx: '1' }),
  h('path', { d: 'M12 11V5a2 2 0 0 1 4 0v6M8 11V7a2 2 0 0 1 4 0v4' })
])

const PlanningIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('path', { d: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2' }),
  h('rect', { x: '9', y: '3', width: '6', height: '4', rx: '1' }),
  h('path', { d: 'M9 12h6M9 16h6' })
])

const SustainableIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('path', { d: 'M12 3v18M12 3c-4.5 3-7 6-7 9a7 7 0 0 0 14 0c0-3-2.5-6-7-9' }),
  h('path', { d: 'M9 17c.6-1.2 1.8-2 3-2s2.4.8 3 2' })
])

const services = [
  {
    icon: ArchitectureIcon,
    title: 'Architectural Design',
    description: 'From concept to construction documents, we create innovative designs that exceed expectations.'
  },
  {
    icon: InteriorIcon,
    title: 'Interior Design',
    description: 'Thoughtful interior spaces that complement our architectural vision with style and function.'
  },
  {
    icon: PlanningIcon,
    title: 'Project Management',
    description: 'End-to-end project oversight ensuring quality, timeline, and budget adherence.'
  },
  {
    icon: SustainableIcon,
    title: 'Sustainable Design',
    description: 'Environmentally responsible solutions that reduce impact and improve efficiency.'
  }
]
</script>

<style scoped>
.home {
  padding-top: 0;
}

/* Services Preview */
.services-preview__label {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--space-2);
}

.services-preview__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
}

.services-preview__card {
  text-align: center;
  padding: var(--space-8);
  background-color: var(--white);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  box-shadow: var(--shadow);
}

.services-preview__card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.services-preview__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background-color: var(--accent);
  color: var(--primary);
  margin-bottom: var(--space-6);
}

.services-preview__icon svg {
  width: 32px;
  height: 32px;
}

.services-preview__title {
  font-size: var(--text-lg);
  color: var(--primary-dark);
  margin-bottom: var(--space-3);
}

.services-preview__text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* CTA Section */
.cta-section {
  text-align: center;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--gray-900) 100%);
}

.cta-section__content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-section__title {
  font-size: var(--text-4xl);
  color: var(--white);
  margin-bottom: var(--space-6);
}

.cta-section__text {
  font-size: var(--text-lg);
  color: var(--gray-300);
  margin-bottom: var(--space-8);
  line-height: var(--leading-relaxed);
}

/* Responsive */
@media (max-width: 1024px) {
  .services-preview__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services-preview__grid {
    grid-template-columns: 1fr;
  }

  .cta-section__title {
    font-size: var(--text-3xl);
  }
}
</style>
