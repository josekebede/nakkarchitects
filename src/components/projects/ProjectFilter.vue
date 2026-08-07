<template>
  <nav class="project-filter" aria-label="Filter projects by type">
    <div class="project-filter__rail">
      <button
        v-for="category in categories"
        :key="category.id"
        class="project-filter__button"
        :class="{ 'project-filter__button--active': activeCategory === category.id }"
        type="button"
        :aria-pressed="activeCategory === category.id"
        @click="setCategory(category.id)"
      >
        <span>{{ category.name }}</span>
        <span class="project-filter__count" aria-hidden="true">{{ category.count }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const route = useRoute()
const router = useRouter()

const categories = computed(() => store.categories)
const activeCategory = computed(() => store.activeCategory)

const setCategory = (categoryId) => {
  const query = { ...route.query }
  if (categoryId === 'all') {
    delete query.category
  } else {
    query.category = categoryId
  }
  router.push({ name: 'projects', query })
}
</script>

<style scoped>
.project-filter {
  position: sticky;
  top: var(--navbar-height);
  z-index: 10;
  margin: 0 calc(var(--space-6) * -1) var(--space-12);
  padding: var(--space-3) var(--space-6);
  overflow: hidden;
  background: rgba(250, 251, 251, 0.94);
  border-top: 1px solid var(--gray-100);
  border-bottom: 1px solid var(--gray-200);
  backdrop-filter: blur(14px);
}

.project-filter__rail {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
}

.project-filter__rail::-webkit-scrollbar {
  display: none;
}

.project-filter__button {
  display: inline-flex;
  flex: 0 0 auto;
  min-height: 44px;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  scroll-snap-align: start;
  color: var(--gray-600);
  background: transparent;
  border: 1px solid transparent;
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  white-space: nowrap;
  transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.project-filter__button:hover {
  color: var(--primary-dark);
  border-color: var(--gray-300);
}

.project-filter__button--active {
  color: var(--white);
  background: var(--primary-dark);
  border-color: var(--primary-dark);
}

.project-filter__button--active:hover {
  color: var(--white);
}

.project-filter__count {
  min-width: 1.35rem;
  padding: 0.1rem 0.35rem;
  color: inherit;
  background: rgba(255, 255, 255, 0.16);
  font-size: 0.68rem;
  text-align: center;
}

@media (max-width: 768px) {
  .project-filter {
    top: var(--navbar-height-mobile);
    margin-right: calc(var(--space-4) * -1);
    margin-left: calc(var(--space-4) * -1);
    padding-right: var(--space-4);
    padding-left: var(--space-4);
  }
}
</style>
