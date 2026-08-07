<template>
  <section v-if="project" class="hero" aria-labelledby="hero-title">
    <img
      class="hero__image"
      :src="project.cover.full"
      :srcset="heroSrcset"
      sizes="100vw"
      :width="project.cover.width"
      :height="project.cover.height"
      :alt="project.cover.alt"
      fetchpriority="high"
      decoding="async"
    />
    <div class="hero__scrim" aria-hidden="true" />

    <div class="container hero__content">
      <div class="hero__statement">
        <p class="hero__eyebrow">NAKK Architecture · Addis Ababa</p>
        <h1 id="hero-title">Architecture rooted in place, designed for what comes next.</h1>
      </div>

      <RouterLink :to="`/projects/${project.slug}`" class="hero__project">
        <span>
          <span class="hero__project-label">Featured project</span>
          <strong>{{ project.name }}</strong>
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </RouterLink>

      <button class="hero__scroll" type="button" @click="scrollToContent">
        <span>Discover our work</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const project = computed(() => store.heroProject)

const heroSrcset = computed(() => {
  const cover = project.value?.cover
  if (!cover?.thumb || !cover?.full || cover.thumb === cover.full) return undefined

  const fullWidth = Number(cover.width) || 1920
  const thumbWidth = Math.min(720, fullWidth)
  if (fullWidth <= thumbWidth) return undefined
  return `${cover.thumb} ${thumbWidth}w, ${cover.full} ${fullWidth}w`
})

const scrollToContent = () => {
  document.querySelector('.hero + *')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: clamp(620px, 92svh, 980px);
  overflow: hidden;
  color: var(--white);
  background: var(--gray-900);
}

.hero__image,
.hero__scrim {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero__image {
  object-fit: cover;
  object-position: center;
  animation: hero-reveal 1.1s ease-out both;
}

.hero__scrim {
  background:
    linear-gradient(to bottom, rgba(13, 23, 23, 0.78) 0, rgba(13, 23, 23, 0.1) 26%),
    linear-gradient(to top, rgba(13, 23, 23, 0.88) 0, rgba(13, 23, 23, 0.22) 58%, transparent 80%),
    linear-gradient(to right, rgba(13, 23, 23, 0.58), transparent 70%);
}

.hero__content {
  position: relative;
  min-height: inherit;
}

.hero__statement {
  position: absolute;
  bottom: clamp(9.5rem, 20vh, 13rem);
  left: var(--space-6);
  max-width: min(900px, calc(100% - 3rem));
}

.hero__eyebrow,
.hero__project-label {
  display: block;
  margin: 0 0 var(--space-4);
  color: var(--accent);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 0;
  color: var(--white);
  font-size: clamp(2.7rem, 6.4vw, 6.7rem);
  font-weight: var(--font-medium);
  letter-spacing: -0.055em;
  line-height: 0.98;
  text-wrap: balance;
}

.hero__project {
  position: absolute;
  right: var(--space-6);
  bottom: var(--space-8);
  display: flex;
  width: min(390px, calc(100% - 3rem));
  min-height: 96px;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-5) var(--space-6);
  color: var(--white);
  background: rgba(26, 42, 42, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
}

.hero__project:hover,
.hero__project:focus-visible {
  color: var(--white);
  background: rgba(69, 99, 98, 0.95);
}

.hero__project-label {
  margin-bottom: var(--space-2);
  color: var(--primary-lighter);
}

.hero__project strong {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
}

.hero__project svg,
.hero__scroll svg {
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
}

.hero__scroll {
  position: absolute;
  bottom: var(--space-8);
  left: var(--space-6);
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  gap: var(--space-3);
  color: var(--white);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

@keyframes hero-reveal {
  from { opacity: 0; transform: scale(1.025); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 768px) {
  .hero {
    min-height: max(610px, 82svh);
  }

  .hero__statement {
    bottom: 12rem;
    left: var(--space-4);
    max-width: calc(100% - 2rem);
  }

  .hero__project {
    right: var(--space-4);
    bottom: var(--space-4);
    left: var(--space-4);
    width: auto;
  }

  .hero__scroll {
    display: none;
  }
}
</style>
