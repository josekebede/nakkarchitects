<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="about-hero">
      <div class="about-hero__bg" :style="{ backgroundImage: `url(${heroImage})` }" />
      <div class="about-hero__overlay" />
      <div class="about-hero__content container">
        <AnimatedSection animation="fade-in-up">
          <h1 class="about-hero__title">About Us</h1>
          <p class="about-hero__subtitle">
            Where Heritage Meets Innovation
          </p>
        </AnimatedSection>
      </div>
    </section>

    <!-- Story Section -->
    <section class="about-story section">
      <div class="container">
        <div class="about-story__grid">
          <AnimatedSection animation="slide-in-left" class="about-story__content">
            <span class="about-story__label">Our Story</span>
            <h2>Where Heritage Meets Innovation</h2>
            <p>
              NAKK Architecture was founded in 2021 by Nahom Kebede with a singular vision:
              to create spaces that honor cultural context while embracing bold innovation.
              Based in the heart of Addis Ababa, Ethiopia, our practice has grown to deliver
              over 30 projects known for thoughtful design and unwavering commitment to quality.
            </p>
            <p>
              Our philosophy bridges two worlds - the contextual and cultural richness of
              Ethiopian heritage with innovative and bold contemporary design. Every project
              we undertake is an opportunity to push boundaries while respecting local context
              and sustainable practices.
            </p>
            <p>
              Today, NAKK Architecture continues to build on this foundation, creating
              residential, commercial, and institutional projects that leave lasting
              impressions on communities and individuals alike.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="slide-in-right" class="about-story__image-wrapper">
            <div class="about-story__image img-zoom">
              <img
                src="/projects/abay-technical-trading/full/011.webp"
                alt="Reception and workspace designed for Abay Technical & Trading PLC"
                loading="lazy"
                decoding="async"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="about-values section bg-accent">
      <div class="container">
        <AnimatedSection animation="fade-in" class="section-header">
          <span class="about-values__label">Our Values</span>
          <h2>What Drives Us</h2>
          <p>The principles that guide every decision we make</p>
        </AnimatedSection>

        <div class="about-values__grid">
          <AnimatedSection
            v-for="(value, index) in values"
            :key="value.title"
            animation="fade-in-up"
            :delay="`${index * 0.15}s`"
            class="about-values__card"
          >
            <div class="about-values__number">0{{ index + 1 }}</div>
            <h3 class="about-values__title">{{ value.title }}</h3>
            <p class="about-values__text">{{ value.description }}</p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="about-services section">
      <div class="container">
        <AnimatedSection animation="fade-in" class="section-header">
          <span class="about-services__label">What We Do</span>
          <h2>Our Services</h2>
          <p>Comprehensive architectural solutions tailored to your needs</p>
        </AnimatedSection>

        <div class="about-services__grid">
          <AnimatedSection
            v-for="(service, index) in services"
            :key="service.title"
            animation="fade-in"
            :delay="`${index * 0.1}s`"
            class="about-services__item"
          >
            <div class="about-services__icon">
              <component :is="service.icon" />
            </div>
            <div class="about-services__content">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="about-stats section bg-dark">
      <div class="container">
        <div class="about-stats__grid">
          <AnimatedSection
            v-for="(stat, index) in stats"
            :key="stat.label"
            animation="fade-in-up"
            :delay="`${index * 0.1}s`"
            class="about-stats__item"
          >
            <span class="about-stats__number">{{ stat.value }}</span>
            <span class="about-stats__label">{{ stat.label }}</span>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="about-cta section">
      <div class="container">
        <AnimatedSection animation="fade-in" class="about-cta__content">
          <h2>Let's Create Something Extraordinary</h2>
          <p>
            Whether you're planning a new build or renovation, we're here to
            help bring your vision to life. Start a conversation with our team today.
          </p>
          <RouterLink to="/contact" class="btn btn-primary btn-lg">
            Get In Touch
          </RouterLink>
        </AnimatedSection>
      </div>
    </section>
  </div>
</template>

<script setup>
import { h } from 'vue'
import AnimatedSection from '@/components/common/AnimatedSection.vue'

const heroImage = '/projects/nuclear-energy-commission/full/001.webp'

const values = [
  {
    title: 'Cultural Context',
    description: 'We honor Ethiopian heritage and local traditions, designing spaces that respect and celebrate the cultural richness of our surroundings.'
  },
  {
    title: 'Bold Innovation',
    description: 'We push boundaries with contemporary design solutions, embracing new ideas and technologies to create forward-thinking architectural experiences.'
  },
  {
    title: 'Client Partnership',
    description: 'Great architecture emerges from collaboration. We work closely with clients to understand their vision and bring their dreams to reality.'
  },
  {
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards in every aspect of our work, from initial concepts to final construction details.'
  }
]

// Service icons
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
  h('path', { d: 'M12 3v18M12 3c-4.5 3-7 6-7 9a7 7 0 0 0 14 0c0-3-2.5-6-7-9' })
])

const CommercialIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }),
  h('path', { d: 'M3 9h18M9 21V9' })
])

const ConsultIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })
])

const services = [
  { icon: ArchitectureIcon, title: 'Architectural Design', description: 'Complete design services from concept to construction documents, creating spaces that inspire.' },
  { icon: InteriorIcon, title: 'Interior Design', description: 'Thoughtful interior solutions that complement our architectural vision with style and functionality.' },
  { icon: PlanningIcon, title: 'Project Management', description: 'End-to-end project oversight ensuring quality, timeline adherence, and budget management.' },
  { icon: SustainableIcon, title: 'Sustainable Design', description: 'Environmentally responsible design solutions that reduce impact and improve efficiency.' },
  { icon: CommercialIcon, title: 'Commercial Projects', description: 'Office buildings, retail spaces, and mixed-use developments designed for success.' },
  { icon: ConsultIcon, title: 'Consultation', description: 'Expert architectural consultation and feasibility studies for your project needs.' }
]

const stats = [
  { value: '30+', label: 'Projects Completed' },
  { value: '4+', label: 'Years Experience' },
  { value: '2021', label: 'Year Founded' },
  { value: '100%', label: 'Client Satisfaction' }
]
</script>

<style scoped>
.about-page {
  padding-top: var(--navbar-height);
}

/* Hero */
.about-hero {
  position: relative;
  height: 50vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.about-hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.about-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(26, 42, 42, 0.7) 0%,
    rgba(26, 42, 42, 0.5) 100%
  );
}

.about-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--white);
}

.about-hero__title {
  font-size: var(--text-5xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-4);
}

.about-hero__subtitle {
  font-size: var(--text-xl);
  font-weight: var(--font-light);
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* Story Section */
.about-story__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.about-story__label {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--space-4);
}

.about-story__content h2 {
  color: var(--primary-dark);
  margin-bottom: var(--space-6);
}

.about-story__content p {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}

.about-story__image {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
}

.about-story__image img {
  width: 100%;
  height: auto;
}

/* Values Section */
.about-values__label {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--space-2);
}

.about-values__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
}

.about-values__card {
  background-color: var(--white);
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  transition: all var(--transition-base);
}

.about-values__card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.about-values__number {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--accent-dark);
  margin-bottom: var(--space-4);
}

.about-values__title {
  font-size: var(--text-xl);
  color: var(--primary-dark);
  margin-bottom: var(--space-3);
}

.about-values__text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* Services Section */
.about-services__label {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--space-2);
}

.about-services__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
}

.about-services__item {
  display: flex;
  gap: var(--space-6);
  padding: var(--space-6);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.about-services__item:hover {
  background-color: var(--accent);
}

.about-services__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background-color: var(--primary);
  color: var(--white);
}

.about-services__icon svg {
  width: 28px;
  height: 28px;
}

.about-services__content h3 {
  font-size: var(--text-lg);
  color: var(--primary-dark);
  margin-bottom: var(--space-2);
}

.about-services__content p {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--leading-relaxed);
}

/* Stats Section */
.about-stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
  text-align: center;
}

.about-stats__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.about-stats__number {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  color: var(--white);
}

.about-stats__label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--gray-400);
}

/* CTA Section */
.about-cta {
  text-align: center;
  background-color: var(--bg-secondary);
}

.about-cta__content {
  max-width: 600px;
  margin: 0 auto;
}

.about-cta h2 {
  color: var(--primary-dark);
  margin-bottom: var(--space-4);
}

.about-cta p {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}

/* Responsive */
@media (max-width: 1024px) {
  .about-values__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-stats__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-10);
  }
}

@media (max-width: 768px) {
  .about-page {
    padding-top: var(--navbar-height-mobile);
  }

  .about-hero {
    height: 40vh;
    min-height: 300px;
  }

  .about-hero__title {
    font-size: var(--text-4xl);
  }

  .about-story__grid {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }

  .about-story__image-wrapper {
    order: -1;
  }

  .about-services__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .about-values__grid {
    grid-template-columns: 1fr;
  }

  .about-stats__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }

  .about-stats__number {
    font-size: var(--text-4xl);
  }
}
</style>
