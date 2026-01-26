<template>
  <section class="hero">
    <!-- Slides -->
    <div class="hero__slides">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="hero__slide"
        :class="{ 'hero__slide--active': currentSlide === index }"
      >
        <!-- Video Slide -->
        <template v-if="slide.type === 'video'">
          <video
            class="hero__media"
            :poster="getImagePath(slide.poster)"
            autoplay
            muted
            loop
            playsinline
          >
            <source :src="getImagePath(slide.src)" type="video/mp4" />
          </video>
        </template>

        <!-- Image Slide -->
        <template v-else>
          <div
            class="hero__media hero__media--image"
            :style="{ backgroundImage: `url(${getImagePath(slide.src)})` }"
          />
        </template>

        <!-- Slide Content -->
        <div class="hero__content">
          <div class="hero__text">
            <h1 class="hero__title">{{ slide.title }}</h1>
            <p class="hero__subtitle">{{ slide.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div class="hero__overlay" />

    <!-- Navigation Arrows -->
    <div class="hero__nav">
      <button
        class="hero__nav-btn hero__nav-btn--prev"
        @click="prevSlide"
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        class="hero__nav-btn hero__nav-btn--next"
        @click="nextSlide"
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Indicators -->
    <div class="hero__indicators">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        class="hero__indicator"
        :class="{ 'hero__indicator--active': currentSlide === index }"
        @click="goToSlide(index)"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>

    <!-- Scroll Indicator -->
    <div class="hero__scroll" @click="scrollToContent">
      <span class="hero__scroll-text">Scroll</span>
      <div class="hero__scroll-line">
        <div class="hero__scroll-dot" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const slides = store.heroSlides

const currentSlide = ref(0)
let slideInterval = null
let isTransitioning = false

const getImagePath = (filename) => {
  return new URL(`../../assets/images/${filename}`, import.meta.url).href
}

const goToSlide = (index) => {
  if (isTransitioning || index === currentSlide.value) return
  isTransitioning = true
  currentSlide.value = index
  resetInterval()
  setTimeout(() => {
    isTransitioning = false
  }, 1000)
}

const nextSlide = () => {
  const next = (currentSlide.value + 1) % slides.length
  goToSlide(next)
}

const prevSlide = () => {
  const prev = (currentSlide.value - 1 + slides.length) % slides.length
  goToSlide(prev)
}

const resetInterval = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  slideInterval = setInterval(nextSlide, 7000)
}

const scrollToContent = () => {
  const nextSection = document.querySelector('.hero + *')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  resetInterval()
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  background-color: var(--gray-900);
}

/* Slides */
.hero__slides {
  position: absolute;
  inset: 0;
}

.hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s ease;
}

.hero__slide--active {
  opacity: 1;
  z-index: 1;
}

.hero__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__media--image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Overlay */
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(26, 42, 42, 0.7) 0%,
    rgba(26, 42, 42, 0.3) 40%,
    rgba(26, 42, 42, 0.1) 100%
  );
  z-index: 2;
  pointer-events: none;
}

/* Content */
.hero__content {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: flex-end;
  padding: var(--space-20);
  padding-bottom: calc(var(--space-20) + 60px);
}

.hero__text {
  max-width: 700px;
}

.hero__title {
  font-size: var(--text-6xl);
  font-weight: var(--font-semibold);
  color: var(--white);
  margin-bottom: var(--space-4);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
}

.hero__subtitle {
  font-size: var(--text-xl);
  font-weight: var(--font-light);
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
}

/* Navigation */
.hero__nav {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 var(--space-6);
  z-index: 4;
}

.hero__nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--white);
  cursor: pointer;
  transition: all var(--transition-base);
}

.hero__nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.hero__nav-btn svg {
  width: 24px;
  height: 24px;
}

/* Indicators */
.hero__indicators {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-3);
  z-index: 4;
}

.hero__indicator {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

.hero__indicator:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.hero__indicator--active {
  background: var(--white);
  transform: scale(1.3);
}

/* Scroll Indicator */
.hero__scroll {
  position: absolute;
  bottom: var(--space-8);
  right: var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  z-index: 4;
  cursor: pointer;
}

.hero__scroll-text {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.hero__scroll-line {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.hero__scroll-dot {
  width: 3px;
  height: 10px;
  background: var(--white);
  border-radius: var(--radius-full);
  position: absolute;
  left: -1px;
  animation: scrollDown 2s ease-in-out infinite;
}

@keyframes scrollDown {
  0% {
    top: 0;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    top: 50px;
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .hero__content {
    padding: var(--space-12);
    padding-bottom: calc(var(--space-16) + 60px);
  }

  .hero__title {
    font-size: var(--text-5xl);
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 100vh;
  }

  .hero__content {
    padding: var(--space-6);
    padding-bottom: calc(var(--space-12) + 80px);
    align-items: flex-end;
  }

  .hero__title {
    font-size: var(--text-4xl);
  }

  .hero__subtitle {
    font-size: var(--text-lg);
  }

  .hero__nav-btn {
    width: 44px;
    height: 44px;
  }

  .hero__nav-btn svg {
    width: 20px;
    height: 20px;
  }

  .hero__scroll {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: var(--text-3xl);
  }
}
</style>
