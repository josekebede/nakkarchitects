<template>
  <article class="project-card" :class="{ 'project-card--visible': isVisible }">
    <div class="project-card__inner img-zoom">
      <div class="project-card__image">
        <img
          :src="imagePath"
          :alt="project.name"
          loading="lazy"
          @load="onImageLoad"
        />
      </div>
      <div class="project-card__overlay">
        <span class="project-card__category">{{ formatCategory(project.category) }}</span>
        <h3 class="project-card__title">{{ project.name }}</h3>
        <p class="project-card__description">{{ project.description }}</p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const isVisible = ref(false)

const imagePath = computed(() => {
  return new URL(`../../assets/images/${props.project.image}`, import.meta.url).href
})

const formatCategory = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
}

const onImageLoad = () => {
  isVisible.value = true
}
</script>

<style scoped>
.project-card {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.project-card--visible {
  opacity: 1;
  transform: scale(1);
}

.project-card__inner {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4/3;
}

.project-card__image {
  position: absolute;
  inset: 0;
}

.project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.project-card__inner:hover .project-card__image img {
  transform: scale(1.1);
}

/* Overlay */
.project-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-6);
  background: linear-gradient(
    to top,
    rgba(26, 42, 42, 0.95) 0%,
    rgba(26, 42, 42, 0.3) 60%,
    transparent 100%
  );
  color: var(--white);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
}

.project-card__inner:hover .project-card__overlay {
  opacity: 1;
  transform: translateY(0);
}

.project-card__category {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--primary-light);
  margin-bottom: var(--space-2);
}

.project-card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--white);
  margin-bottom: var(--space-2);
}

.project-card__description {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: var(--leading-relaxed);
}

/* Always show overlay on mobile */
@media (max-width: 768px) {
  .project-card__overlay {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
