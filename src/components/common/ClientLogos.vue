<template>
  <section class="client-logos" :class="{ 'client-logos--dark': dark }">
    <div class="container">
      <AnimatedSection animation="fade-in" class="client-logos__header">
        <span class="client-logos__label">Trusted By</span>
        <h3 class="client-logos__title">Our Clients</h3>
      </AnimatedSection>
    </div>

    <div class="client-logos__carousel">
      <div class="client-logos__track" ref="trackRef">
        <!-- First set of logos -->
        <div
          v-for="(client, index) in clients"
          :key="`logo-1-${index}`"
          class="client-logos__item"
        >
          <div class="client-logos__placeholder">
            <span>{{ client.name }}</span>
          </div>
        </div>
        <!-- Duplicate set for seamless loop -->
        <div
          v-for="(client, index) in clients"
          :key="`logo-2-${index}`"
          class="client-logos__item"
        >
          <div class="client-logos__placeholder">
            <span>{{ client.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AnimatedSection from '@/components/common/AnimatedSection.vue'

defineProps({
  dark: {
    type: Boolean,
    default: false
  }
})

// Placeholder clients - replace with real logos later
const clients = ref([
  { name: 'Client 1', logo: null },
  { name: 'Client 2', logo: null },
  { name: 'Client 3', logo: null },
  { name: 'Client 4', logo: null },
  { name: 'Client 5', logo: null },
  { name: 'Client 6', logo: null },
  { name: 'Client 7', logo: null },
  { name: 'Client 8', logo: null },
  { name: 'Client 9', logo: null },
  { name: 'Client 10', logo: null },
  { name: 'Client 11', logo: null },
  { name: 'Client 12', logo: null }
])

const trackRef = ref(null)
let animationId = null

onMounted(() => {
  // CSS animation handles the scrolling
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.client-logos {
  padding: var(--space-16) 0;
  background-color: var(--bg-secondary);
  overflow: hidden;
}

.client-logos--dark {
  background-color: var(--gray-900);
}

.client-logos__header {
  text-align: center;
  margin-bottom: var(--space-10);
}

.client-logos__label {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--space-2);
}

.client-logos--dark .client-logos__label {
  color: var(--primary-light);
}

.client-logos__title {
  font-size: var(--text-2xl);
  color: var(--primary-dark);
}

.client-logos--dark .client-logos__title {
  color: var(--white);
}

.client-logos__carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.client-logos__track {
  display: flex;
  gap: var(--space-12);
  width: max-content;
  animation: scroll 40s linear infinite;
}

.client-logos__track:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.client-logos__item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 0 var(--space-6);
}

.client-logos__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 60px;
  background-color: var(--white);
  border: 2px dashed var(--gray-300);
  border-radius: var(--radius-md);
  color: var(--gray-400);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}

.client-logos--dark .client-logos__placeholder {
  background-color: var(--gray-800);
  border-color: var(--gray-700);
  color: var(--gray-500);
}

.client-logos__item:hover .client-logos__placeholder {
  border-color: var(--primary);
  color: var(--primary);
}

/* When real logos are added */
.client-logos__logo {
  max-width: 150px;
  max-height: 50px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all var(--transition-base);
}

.client-logos__item:hover .client-logos__logo {
  filter: grayscale(0%);
  opacity: 1;
}

.client-logos--dark .client-logos__logo {
  filter: grayscale(100%) brightness(2);
}

.client-logos--dark .client-logos__item:hover .client-logos__logo {
  filter: grayscale(0%) brightness(1);
}

/* Responsive */
@media (max-width: 768px) {
  .client-logos {
    padding: var(--space-12) 0;
  }

  .client-logos__track {
    gap: var(--space-8);
    animation-duration: 30s;
  }

  .client-logos__placeholder {
    width: 120px;
    height: 50px;
    font-size: var(--text-xs);
  }
}
</style>
