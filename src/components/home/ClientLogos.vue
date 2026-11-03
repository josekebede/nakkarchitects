<template>
  <section v-if="items.length" class="clients" aria-labelledby="clients-heading">
    <div class="container">
      <p class="clients__eyebrow">Our clients</p>
      <h2 id="clients-heading" class="clients__title">Clients we've worked with.</h2>
    </div>

    <div class="clients__viewport">
      <ul class="clients__track" :style="{ '--clients-duration': `${duration}s` }">
        <li
          v-for="(entry, index) in loop"
          :key="`${entry.name}-${index}`"
          class="clients__item"
          :class="{ 'clients__item--copy': entry.copy }"
          :aria-hidden="entry.copy ? 'true' : undefined"
        >
          <img
            :src="entry.logo"
            :alt="entry.copy ? '' : entry.name"
            :title="entry.copy ? undefined : entry.name"
            decoding="async"
            draggable="false"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { clients } from '@/data/clients'

// Only clients that have a logo file
const items = computed(() => clients.filter((client) => client.logo))

// The strip is the same set of logos twice in a row and slides left by exactly one
// set, so the end joins the start with no visible jump. With only a few logos each
// set is repeated until it is wide enough to fill a big screen.
const MIN_PER_SET = 8

const loop = computed(() => {
  const base = items.value
  if (!base.length) return []

  const repeats = Math.max(1, Math.ceil(MIN_PER_SET / base.length))
  const set = Array.from({ length: repeats }, () => base).flat()

  return [...set, ...set].map((client, index) => ({
    ...client,
    // Only the first full pass through the list is "real"; the rest is for the loop
    copy: index >= base.length
  }))
})

// About 3.5 seconds per logo keeps the slide calm however many there are
const duration = computed(() => Math.max(24, (loop.value.length / 2) * 3.5))
</script>

<style scoped>
.clients {
  padding: clamp(3.5rem, 7vw, 6rem) 0;
  background: var(--white);
  overflow: hidden;
}

.clients__eyebrow {
  margin: 0 0 var(--space-4);
  color: var(--primary-dark);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.18em;
  text-align: center;
  text-transform: uppercase;
}

.clients__title {
  margin: 0;
  color: var(--gray-900);
  font-size: clamp(1.75rem, 3.4vw, 2.75rem);
  font-weight: var(--font-medium);
  letter-spacing: -0.035em;
  line-height: 1.1;
  text-align: center;
}

.clients__viewport {
  position: relative;
  margin-top: clamp(2rem, 4vw, 3.5rem);
  overflow: hidden;
  /* Logos fade in and out at both edges instead of being cut off */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.clients__track {
  display: flex;
  width: max-content;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  animation: clients-slide var(--clients-duration, 30s) linear infinite;
  will-change: transform;
}

.clients__item {
  display: flex;
  flex: 0 0 auto;
  height: 5rem;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 clamp(1.75rem, 4vw, 3.5rem);
}

.clients__item img {
  width: auto;
  max-width: 9.5rem;
  height: auto;
  max-height: 3.5rem;
  object-fit: contain;
  /* One calm grey look so very different logos sit well together */
  filter: grayscale(1);
  opacity: 0.72;
  transition: filter var(--transition-base), opacity var(--transition-base);
  -webkit-user-drag: none;
  user-select: none;
}

@keyframes clients-slide {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-50%, 0, 0);
  }
}

/* Mouse users can stop the slide to look closely; on phones it just keeps gliding */
@media (hover: hover) {
  .clients__viewport:hover .clients__track {
    animation-play-state: paused;
  }

  .clients__item:hover img {
    filter: none;
    opacity: 1;
  }
}

/* For people who prefer no motion: a still, wrapped row with one copy of each logo */
@media (prefers-reduced-motion: reduce) {
  .clients__viewport {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .clients__track {
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 var(--space-4);
    animation: none;
  }

  .clients__item--copy {
    display: none;
  }
}
</style>
