<template>
  <article class="project-card">
    <RouterLink
      class="project-card__link"
      :to="`/projects/${project.slug}`"
      :aria-label="`View ${project.name}, ${imageCountLabel}`"
    >
      <div class="project-card__media" :style="mediaStyle">
        <img
          :src="project.cover.thumb"
          :srcset="coverSrcset"
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
          :width="project.cover.width"
          :height="project.cover.height"
          :alt="project.cover.alt"
          :loading="loading"
          decoding="async"
          @error="hasImageError = true"
        />
        <div v-if="hasImageError" class="project-card__fallback" aria-hidden="true">
          <img
            class="project-card__fallback-logo"
            src="/brand/nakk-mark-square.png"
            alt=""
            width="180"
            height="180"
          />
        </div>
        <span class="project-card__count">{{ imageCountLabel }}</span>
      </div>

      <div class="project-card__content">
        <div>
          <p class="project-card__category">{{ project.categoryLabel }}</p>
          <h2 class="project-card__title">{{ project.name }}</h2>
        </div>
        <span class="project-card__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </RouterLink>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  loading: {
    type: String,
    default: 'lazy'
  }
})

const hasImageError = ref(false)

const imageCountLabel = computed(() => {
  const count = Number(props.project.imageCount) || 0
  return `${count} ${count === 1 ? 'image' : 'images'}`
})

const mediaStyle = computed(() => ({
  '--project-ratio': `${props.project.cover.width} / ${props.project.cover.height}`
}))

const coverSrcset = computed(() => {
  const cover = props.project.cover
  if (!cover?.thumb || !cover?.full || cover.thumb === cover.full) return undefined

  const fullWidth = Number(cover.width) || 1920
  const thumbWidth = Number(cover.thumbWidth) || Math.min(720, fullWidth)
  if (fullWidth <= thumbWidth) return undefined
  return `${cover.thumb} ${thumbWidth}w, ${cover.full} ${fullWidth}w`
})
</script>

<style scoped>
.project-card {
  min-width: 0;
}

.project-card__link {
  display: block;
  color: var(--text-primary);
  text-decoration: none;
}

.project-card__media {
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: var(--project-ratio, 4 / 3);
  min-height: 240px;
  max-height: 520px;
  background: var(--accent);
}

.project-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 650ms cubic-bezier(0.2, 0.65, 0.25, 1);
}

.project-card__link:hover .project-card__media img,
.project-card__link:focus-visible .project-card__media img {
  transform: scale(1.025);
}

.project-card__count {
  position: absolute;
  right: var(--space-3);
  bottom: var(--space-3);
  padding: 0.45rem 0.7rem;
  color: var(--white);
  background: rgba(26, 42, 42, 0.84);
  backdrop-filter: blur(8px);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
}

.project-card__fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: var(--primary-dark);
}

.project-card__media .project-card__fallback-logo {
  width: 78px;
  height: 78px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  object-fit: cover;
  opacity: 0.82;
}

.project-card__content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-5);
  padding: var(--space-5) 0 var(--space-8);
  border-bottom: 1px solid var(--gray-200);
}

.project-card__category {
  margin: 0 0 var(--space-2);
  color: var(--primary-dark);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

.project-card__title {
  margin: 0;
  color: var(--gray-900);
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-tight);
}

.project-card__arrow {
  display: grid;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid var(--gray-300);
  color: var(--primary-dark);
  transition: color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast);
}

.project-card__arrow svg {
  width: 19px;
  height: 19px;
}

.project-card__link:hover .project-card__arrow,
.project-card__link:focus-visible .project-card__arrow {
  color: var(--white);
  background: var(--primary-dark);
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .project-card__media {
    min-height: 210px;
  }

  .project-card__content {
    padding-top: var(--space-4);
  }
}
</style>
