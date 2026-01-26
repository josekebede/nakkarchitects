<template>
  <div class="contact-page">
    <!-- Hero -->
    <section class="contact-hero">
      <div class="contact-hero__bg" :style="{ backgroundImage: `url(${heroImage})` }" />
      <div class="contact-hero__overlay" />
      <div class="contact-hero__content container">
        <AnimatedSection animation="fade-in-up">
          <h1 class="contact-hero__title">Get In Touch</h1>
          <p class="contact-hero__subtitle">
            Let's discuss how we can bring your vision to life
          </p>
        </AnimatedSection>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-main section">
      <div class="container">
        <div class="contact-main__grid">
          <!-- Contact Info -->
          <AnimatedSection animation="slide-in-left" class="contact-info">
            <h2 class="contact-info__title">Contact Information</h2>
            <p class="contact-info__text">
              We'd love to hear from you. Whether you have a project in mind or
              just want to learn more about our services, we're here to help.
            </p>

            <div class="contact-info__items">
              <div class="contact-info__item">
                <div class="contact-info__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div class="contact-info__content">
                  <h4>Office Address</h4>
                  <p>Mina Building, Wolo Sefer<br>Ethio China St, Addis Ababa<br>ሚና ህንጻ | ወሎ ሰፈር</p>
                </div>
              </div>

              <div class="contact-info__item">
                <div class="contact-info__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div class="contact-info__content">
                  <h4>Email</h4>
                  <a href="mailto:yosephktamene@gmail.com">yosephktamene@gmail.com</a>
                </div>
              </div>

              <div class="contact-info__item">
                <div class="contact-info__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div class="contact-info__content">
                  <h4>Phone</h4>
                  <a href="tel:+251911728807">+251 911 728 807</a>
                </div>
              </div>

              <div class="contact-info__item">
                <div class="contact-info__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div class="contact-info__content">
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="contact-info__social">
              <h4>Follow Us</h4>
              <div class="contact-info__social-links">
                <a href="https://www.instagram.com/nkarchitects__" target="_blank" rel="noopener noreferrer" class="contact-info__social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2" />
                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2" />
                    <circle cx="17.5" cy="6.5" r="1.5" />
                  </svg>
                </a>
              </div>
            </div>
          </AnimatedSection>

          <!-- Contact Form -->
          <AnimatedSection animation="slide-in-right" class="contact-form-wrapper">
            <h2 class="contact-form-wrapper__title">Send Us a Message</h2>
            <ContactForm />
          </AnimatedSection>
        </div>
      </div>
    </section>

    <!-- Map Section (Placeholder) -->
    <section class="contact-map">
      <div class="contact-map__placeholder">
        <div class="contact-map__content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p>Map integration available on request</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import AnimatedSection from '@/components/common/AnimatedSection.vue'
import ContactForm from '@/components/common/ContactForm.vue'

const heroImage = new URL('@/assets/images/img4.jpg', import.meta.url).href
</script>

<style scoped>
.contact-page {
  padding-top: var(--navbar-height);
}

/* Hero */
.contact-hero {
  position: relative;
  height: 50vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.contact-hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.contact-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(26, 42, 42, 0.7) 0%,
    rgba(26, 42, 42, 0.5) 100%
  );
}

.contact-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--white);
}

.contact-hero__title {
  font-size: var(--text-5xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-4);
}

.contact-hero__subtitle {
  font-size: var(--text-xl);
  font-weight: var(--font-light);
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* Main Contact Section */
.contact-main {
  background-color: var(--bg-secondary);
}

.contact-main__grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--space-16);
}

/* Contact Info */
.contact-info {
  padding: var(--space-8);
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.contact-info__title {
  font-size: var(--text-2xl);
  color: var(--primary-dark);
  margin-bottom: var(--space-4);
}

.contact-info__text {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
  line-height: var(--leading-relaxed);
}

.contact-info__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.contact-info__item {
  display: flex;
  gap: var(--space-4);
}

.contact-info__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  background-color: var(--accent);
  color: var(--primary);
}

.contact-info__icon svg {
  width: 24px;
  height: 24px;
}

.contact-info__content h4 {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.contact-info__content p,
.contact-info__content a {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-decoration: none;
  margin: 0;
}

.contact-info__content a:hover {
  color: var(--primary);
}

/* Social */
.contact-info__social h4 {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.contact-info__social-links {
  display: flex;
  gap: var(--space-3);
}

.contact-info__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--accent);
  color: var(--primary);
  transition: all var(--transition-fast);
}

.contact-info__social-link:hover {
  background-color: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
}

.contact-info__social-link svg {
  width: 20px;
  height: 20px;
}

/* Form Wrapper */
.contact-form-wrapper {
  padding: var(--space-8);
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.contact-form-wrapper__title {
  font-size: var(--text-2xl);
  color: var(--primary-dark);
  margin-bottom: var(--space-8);
}

/* Map */
.contact-map {
  height: 400px;
  background-color: var(--gray-100);
}

.contact-map__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-map__content {
  text-align: center;
  color: var(--text-muted);
}

.contact-map__content svg {
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-4);
}

.contact-map__content p {
  font-size: var(--text-sm);
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-main__grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

@media (max-width: 768px) {
  .contact-page {
    padding-top: var(--navbar-height-mobile);
  }

  .contact-hero {
    height: 40vh;
    min-height: 300px;
  }

  .contact-hero__title {
    font-size: var(--text-4xl);
  }

  .contact-info,
  .contact-form-wrapper {
    padding: var(--space-6);
  }

  .contact-map {
    height: 300px;
  }
}
</style>
