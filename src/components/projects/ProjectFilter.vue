<template>
  <div class="project-filter">
    <button
      v-for="category in categories"
      :key="category.id"
      class="project-filter__btn"
      :class="{ 'project-filter__btn--active': activeCategory === category.id }"
      @click="setCategory(category.id)"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const categories = computed(() => store.categories)
const activeCategory = computed(() => store.activeCategory)

const setCategory = (categoryId) => {
  store.setActiveCategory(categoryId)
}
</script>

<style scoped>
.project-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-12);
}

.project-filter__btn {
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  color: var(--text-secondary);
  background-color: var(--white);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-base);
}

.project-filter__btn:hover {
  color: var(--primary);
  border-color: var(--primary);
}

.project-filter__btn--active {
  color: var(--white);
  background-color: var(--primary);
  border-color: var(--primary);
}

.project-filter__btn--active:hover {
  color: var(--white);
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
}

@media (max-width: 640px) {
  .project-filter {
    gap: var(--space-2);
  }

  .project-filter__btn {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-xs);
  }
}
</style>
