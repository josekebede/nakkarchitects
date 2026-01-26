<template>
  <div
    ref="sectionRef"
    class="animated-section"
    :class="[animationClass, { visible: isVisible }]"
    :style="{ transitionDelay: delay }"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  animation: {
    type: String,
    default: 'fade-in',
    validator: (value) => ['fade-in', 'slide-in-left', 'slide-in-right', 'scale-in', 'fade-in-up'].includes(value)
  },
  delay: {
    type: String,
    default: '0s'
  },
  threshold: {
    type: Number,
    default: 0.1
  },
  once: {
    type: Boolean,
    default: true
  }
})

const sectionRef = ref(null)
const isVisible = ref(false)
const animationClass = ref(props.animation)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (props.once && observer) {
            observer.unobserve(entry.target)
          }
        } else if (!props.once) {
          isVisible.value = false
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value)
  }
})
</script>

<style scoped>
.animated-section {
  will-change: opacity, transform;
}
</style>
