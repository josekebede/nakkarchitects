<template>
  <section class="about-preview section">
    <div class="container">
      <div class="about-preview__grid">
        <!-- Content -->
        <AnimatedSection animation="slide-in-left" class="about-preview__content">
          <span class="about-preview__label">About Us</span>
          <h2 class="about-preview__title">Where Heritage Meets Innovation</h2>
          <p class="about-preview__text">
            Founded in 2021 by Nahom Kebede, NAKK Architecture bridges the contextual
            and cultural richness of Ethiopian heritage with innovative and bold
            contemporary design. Based in Addis Ababa, we've delivered over 30 projects
            with thoughtful attention to detail and deep respect for local context.
          </p>
          <p class="about-preview__text">
            From concept to completion, we collaborate closely with our clients to deliver
            architectural solutions that are not only aesthetically compelling but also
            functionally exceptional and culturally meaningful.
          </p>
          <RouterLink to="/about" class="btn btn-outline">
            Learn More About Us
          </RouterLink>
        </AnimatedSection>

        <!-- Image -->
        <AnimatedSection animation="slide-in-right" class="about-preview__image-wrapper">
          <div class="about-preview__image img-zoom">
            <img
              src="/projects/abay-technical-trading/full/011.webp"
              alt="Reception and workspace designed for Abay Technical & Trading PLC"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="about-preview__accent" />
        </AnimatedSection>
      </div>
    </div>
  </section>
</template>

<script setup>
import AnimatedSection from '@/components/common/AnimatedSection.vue'
</script>

<style scoped>
.about-preview {
  background-color: var(--bg-secondary);
}

.about-preview__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

/* Content */
.about-preview__content {
  max-width: 540px;
}

.about-preview__label {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--space-4);
}

.about-preview__title {
  font-size: var(--text-4xl);
  color: var(--primary-dark);
  margin-bottom: var(--space-6);
}

.about-preview__text {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.about-preview__text:last-of-type {
  margin-bottom: var(--space-8);
}

/* Image */
.about-preview__image-wrapper {
  position: relative;
}

.about-preview__image {
  position: relative;
  z-index: 2;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
}

.about-preview__image img {
  width: 100%;
  height: auto;
  display: block;
}

.about-preview__accent {
  position: absolute;
  top: var(--space-8);
  right: calc(-1 * var(--space-8));
  width: 100%;
  height: 100%;
  background-color: var(--accent);
  border-radius: var(--radius-lg);
  z-index: 1;
}

/* Responsive */
@media (max-width: 1024px) {
  .about-preview__grid {
    gap: var(--space-10);
  }

  .about-preview__accent {
    top: var(--space-4);
    right: calc(-1 * var(--space-4));
  }
}

@media (max-width: 768px) {
  .about-preview__grid {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }

  .about-preview__content {
    max-width: 100%;
    text-align: center;
  }

  .about-preview__title {
    font-size: var(--text-3xl);
  }

  .about-preview__image-wrapper {
    order: -1;
  }

  .about-preview__accent {
    display: none;
  }
}
</style>
