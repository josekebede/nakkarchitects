<template>
  <section class="project-gallery" :aria-label="`${projectName} image gallery`">
    <div v-if="galleryImages.length" class="project-gallery__grid" role="list">
      <figure
        v-for="(image, index) in galleryImages"
        :key="image.full || image.thumb || index"
        class="project-gallery__item"
        :class="`project-gallery__item--${image.orientation}`"
        :style="{ '--gallery-aspect': image.aspectRatio }"
        role="listitem"
      >
        <button
          type="button"
          class="project-gallery__trigger"
          :aria-label="`Open image ${index + 1} of ${galleryImages.length}: ${image.alt}`"
          @click="openLightbox(index, $event)"
        >
          <img
            class="project-gallery__image"
            :src="image.thumb || image.full"
            :srcset="getSrcset(image)"
            :sizes="getGallerySizes(image)"
            :alt="image.alt"
            :width="image.width || undefined"
            :height="image.height || undefined"
            loading="lazy"
            decoding="async"
          />
          <span class="project-gallery__shade" aria-hidden="true" />
          <span class="project-gallery__caption" aria-hidden="true">
            {{ image.alt }}
          </span>
          <span class="project-gallery__number" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
        </button>
      </figure>
    </div>

    <p v-else class="project-gallery__empty">
      Project photography is being prepared.
    </p>

    <Teleport to="body">
      <Transition name="project-lightbox">
        <div
          v-if="isOpen"
          ref="lightboxRef"
          class="project-lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="`${projectName} image viewer`"
          tabindex="-1"
          @click.self="closeLightbox"
        >
          <header class="project-lightbox__header">
            <div class="project-lightbox__heading">
              <span class="project-lightbox__project">{{ projectName }}</span>
              <span class="project-lightbox__position" aria-hidden="true">
                {{ activeIndex + 1 }} / {{ galleryImages.length }}
              </span>
            </div>
            <button
              ref="closeButtonRef"
              type="button"
              class="project-lightbox__control project-lightbox__close"
              aria-label="Close image viewer"
              aria-keyshortcuts="Escape"
              @click="closeLightbox"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </header>

          <div class="project-lightbox__stage" @click.self="closeLightbox">
            <button
              v-if="galleryImages.length > 1"
              type="button"
              class="project-lightbox__control project-lightbox__arrow project-lightbox__arrow--previous"
              aria-label="Show previous image"
              aria-keyshortcuts="ArrowLeft"
              @click="showPrevious"
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>

            <figure v-if="currentImage" class="project-lightbox__figure">
              <img
                :key="currentImage.full || currentImage.thumb"
                class="project-lightbox__image"
                :src="currentImage.full || currentImage.thumb"
                :srcset="getSrcset(currentImage)"
                sizes="100vw"
                :alt="currentImage.alt"
                :width="currentImage.width || undefined"
                :height="currentImage.height || undefined"
                decoding="async"
              />
              <figcaption class="project-lightbox__caption">
                {{ currentImage.alt }}
              </figcaption>
            </figure>

            <button
              v-if="galleryImages.length > 1"
              type="button"
              class="project-lightbox__control project-lightbox__arrow project-lightbox__arrow--next"
              aria-label="Show next image"
              aria-keyshortcuts="ArrowRight"
              @click="showNext"
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>

          <div
            v-if="galleryImages.length > 1"
            class="project-lightbox__filmstrip"
            role="group"
            aria-label="Choose an image"
          >
            <button
              v-for="(image, index) in galleryImages"
              :key="`lightbox-${image.full || image.thumb || index}`"
              type="button"
              class="project-lightbox__thumbnail"
              :class="{ 'project-lightbox__thumbnail--active': index === activeIndex }"
              :aria-label="`Show image ${index + 1}: ${image.alt}`"
              :aria-current="index === activeIndex ? 'true' : undefined"
              @click="showImage(index)"
            >
              <img :src="image.thumb || image.full" alt="" loading="lazy" decoding="async" />
            </button>
          </div>

          <p class="sr-only" aria-live="polite">
            Image {{ activeIndex + 1 }} of {{ galleryImages.length }}. {{ currentImage?.alt }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  projectName: {
    type: String,
    default: 'Project'
  }
})

const isOpen = ref(false)
const activeIndex = ref(0)
const lightboxRef = ref(null)
const closeButtonRef = ref(null)
const lastTriggerRef = ref(null)

let previousBodyStyles = null
let previousAppRootState = null

const galleryImages = computed(() => {
  const images = Array.isArray(props.images) ? props.images : []

  return images
    .map((image, index) => {
      const normalizedImage = typeof image === 'string'
        ? { thumb: image, full: image }
        : image

      if (!normalizedImage || (!normalizedImage.thumb && !normalizedImage.full)) return null

      const width = Number(normalizedImage.width) || 4
      const height = Number(normalizedImage.height) || 3
      const ratio = width / height

      return {
        ...normalizedImage,
        thumb: normalizedImage.thumb || normalizedImage.full,
        full: normalizedImage.full || normalizedImage.thumb,
        alt: normalizedImage.alt || `${props.projectName}, view ${index + 1}`,
        aspectRatio: `${width} / ${height}`,
        orientation: ratio > 1.18 ? 'landscape' : ratio < 0.84 ? 'portrait' : 'square'
      }
    })
    .filter(Boolean)
})

const currentImage = computed(() => galleryImages.value[activeIndex.value] || null)

const getSrcset = (image) => {
  if (!image?.thumb || !image?.full || image.thumb === image.full) return undefined

  const fullWidth = Number(image.width) || 1600
  const thumbWidth = Math.min(720, Math.max(320, fullWidth))

  if (fullWidth <= thumbWidth) return undefined
  return `${image.thumb} ${thumbWidth}w, ${image.full} ${fullWidth}w`
}

const getGallerySizes = () => {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw'
}

const openLightbox = (index, event) => {
  activeIndex.value = index
  lastTriggerRef.value = event?.currentTarget || document.activeElement
  isOpen.value = true
}

const closeLightbox = () => {
  isOpen.value = false
}

const showImage = (index) => {
  const count = galleryImages.value.length
  if (!count) return
  activeIndex.value = ((index % count) + count) % count
}

const showPrevious = () => showImage(activeIndex.value - 1)
const showNext = () => showImage(activeIndex.value + 1)

const lockBodyScroll = () => {
  previousBodyStyles = {
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight
  }

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth > 0) {
    const bodyPadding = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0
    document.body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`
  }
  document.body.style.overflow = 'hidden'
}

const restoreBodyScroll = () => {
  if (!previousBodyStyles) return
  document.body.style.overflow = previousBodyStyles.overflow
  document.body.style.paddingRight = previousBodyStyles.paddingRight
  previousBodyStyles = null
}

const isolateBackground = () => {
  const appRoot = document.getElementById('app')
  if (!appRoot || previousAppRootState) return

  previousAppRootState = {
    element: appRoot,
    wasInert: appRoot.hasAttribute('inert')
  }
  appRoot.setAttribute('inert', '')
}

const restoreBackground = () => {
  if (!previousAppRootState) return
  if (!previousAppRootState.wasInert) {
    previousAppRootState.element.removeAttribute('inert')
  }
  previousAppRootState = null
}

const getFocusableElements = () => {
  if (!lightboxRef.value) return []
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',')

  return Array.from(lightboxRef.value.querySelectorAll(selector)).filter((element) => {
    return element.getAttribute('aria-hidden') !== 'true'
  })
}

const handleKeydown = (event) => {
  if (!isOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closeLightbox()
    return
  }

  if (event.key === 'ArrowLeft' && galleryImages.value.length > 1) {
    event.preventDefault()
    showPrevious()
    return
  }

  if (event.key === 'ArrowRight' && galleryImages.value.length > 1) {
    event.preventDefault()
    showNext()
    return
  }

  if (event.key !== 'Tab') return

  const focusableElements = getFocusableElements()
  if (!focusableElements.length) {
    event.preventDefault()
    lightboxRef.value?.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  } else if (!lightboxRef.value?.contains(document.activeElement)) {
    event.preventDefault()
    firstElement.focus()
  }
}

const preloadAdjacentImages = () => {
  if (!isOpen.value || galleryImages.value.length < 2) return

  const adjacentIndexes = [
    (activeIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length,
    (activeIndex.value + 1) % galleryImages.value.length
  ]

  adjacentIndexes.forEach((index) => {
    const source = galleryImages.value[index]?.full
    if (source) {
      const preload = new window.Image()
      preload.src = source
    }
  })
}

watch(isOpen, async (open) => {
  if (open) {
    lockBodyScroll()
    document.addEventListener('keydown', handleKeydown, true)
    await nextTick()
    if (!isOpen.value) return
    closeButtonRef.value?.focus()
    isolateBackground()
    preloadAdjacentImages()
    return
  }

  document.removeEventListener('keydown', handleKeydown, true)
  restoreBackground()
  restoreBodyScroll()
  await nextTick()
  if (lastTriggerRef.value?.isConnected) lastTriggerRef.value.focus()
})

watch(activeIndex, preloadAdjacentImages)

watch(
  () => props.images,
  () => {
    activeIndex.value = 0
    if (isOpen.value) closeLightbox()
  }
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown, true)
  restoreBackground()
  restoreBodyScroll()
})
</script>

<style scoped>
.project-gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: clamp(var(--space-3), 2vw, var(--space-6));
}

.project-gallery__item {
  min-width: 0;
  margin: 0;
}

.project-gallery__trigger {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: var(--gallery-aspect, 4 / 3);
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--accent-dark);
  box-shadow: var(--shadow-sm);
  text-align: left;
  isolation: isolate;
}

.project-gallery__trigger:focus-visible {
  outline: 3px solid var(--primary-lighter);
  outline-offset: 4px;
}

.project-gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slower), filter var(--transition-base);
}

.project-gallery__shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to top, rgba(13, 23, 23, 0.78), transparent 48%);
  opacity: 0.74;
  transition: opacity var(--transition-base);
}

.project-gallery__caption {
  position: absolute;
  right: var(--space-5);
  bottom: var(--space-5);
  left: var(--space-5);
  z-index: 2;
  overflow: hidden;
  color: var(--white);
  font-size: var(--text-sm);
  line-height: var(--leading-snug);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-gallery__number {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 2;
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: var(--radius-full);
  background: rgba(13, 23, 23, 0.34);
  color: var(--white);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  backdrop-filter: blur(6px);
}

.project-gallery__empty {
  margin: 0;
  padding: var(--space-16) var(--space-6);
  border: 1px dashed var(--gray-300);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--text-muted);
  text-align: center;
}

.project-lightbox {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: rgba(13, 23, 23, 0.985);
  color: var(--white);
}

.project-lightbox__header {
  display: flex;
  min-height: 4.5rem;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-3) clamp(var(--space-4), 3vw, var(--space-10));
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.project-lightbox__heading {
  display: flex;
  min-width: 0;
  align-items: baseline;
  gap: var(--space-4);
}

.project-lightbox__project {
  overflow: hidden;
  color: var(--white);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.project-lightbox__position {
  flex: 0 0 auto;
  color: var(--primary-lighter);
  font-size: var(--text-sm);
}

.project-lightbox__control {
  display: grid;
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-full);
  color: var(--white);
  transition: border-color var(--transition-fast), background-color var(--transition-fast),
    transform var(--transition-fast);
}

.project-lightbox__control:hover {
  border-color: var(--primary-lighter);
  background: rgba(122, 157, 156, 0.22);
}

.project-lightbox__control:focus-visible,
.project-lightbox__thumbnail:focus-visible {
  outline: 3px solid var(--primary-lighter);
  outline-offset: 3px;
}

.project-lightbox__close {
  font-size: 2rem;
  line-height: 1;
}

.project-lightbox__stage {
  display: grid;
  min-height: 0;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(var(--space-3), 2vw, var(--space-8));
  padding: clamp(var(--space-3), 2vw, var(--space-6)) clamp(var(--space-4), 3vw, var(--space-10));
}

.project-lightbox__arrow {
  font-size: 2.25rem;
}

.project-lightbox__figure {
  display: flex;
  min-width: 0;
  min-height: 0;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.project-lightbox__image {
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: calc(100dvh - 13rem);
  object-fit: contain;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.28);
}

.project-lightbox__caption {
  max-width: 56rem;
  margin-top: var(--space-3);
  color: rgba(255, 255, 255, 0.78);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  text-align: center;
}

.project-lightbox__filmstrip {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  padding: var(--space-3) max(var(--space-4), env(safe-area-inset-left))
    max(var(--space-3), env(safe-area-inset-bottom));
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  scrollbar-color: var(--primary) transparent;
}

.project-lightbox__thumbnail {
  position: relative;
  flex: 0 0 4rem;
  height: 3rem;
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  opacity: 0.54;
  transition: border-color var(--transition-fast), opacity var(--transition-fast),
    transform var(--transition-fast);
}

.project-lightbox__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-lightbox__thumbnail:hover,
.project-lightbox__thumbnail--active {
  border-color: var(--primary-lighter);
  opacity: 1;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.project-lightbox-enter-active,
.project-lightbox-leave-active {
  transition: opacity var(--transition-base);
}

.project-lightbox-enter-from,
.project-lightbox-leave-to {
  opacity: 0;
}

@media (hover: hover) {
  .project-gallery__caption {
    opacity: 0;
    transform: translateY(var(--space-2));
    transition: opacity var(--transition-base), transform var(--transition-base);
  }

  .project-gallery__trigger:hover .project-gallery__image,
  .project-gallery__trigger:focus-visible .project-gallery__image {
    filter: saturate(1.05);
    transform: scale(1.035);
  }

  .project-gallery__trigger:hover .project-gallery__shade,
  .project-gallery__trigger:focus-visible .project-gallery__shade {
    opacity: 1;
  }

  .project-gallery__trigger:hover .project-gallery__caption,
  .project-gallery__trigger:focus-visible .project-gallery__caption {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .project-gallery__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .project-gallery__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-3);
  }

  .project-lightbox__stage {
    position: relative;
    grid-template-columns: minmax(0, 1fr);
    padding-right: var(--space-3);
    padding-left: var(--space-3);
  }

  .project-lightbox__arrow {
    position: absolute;
    z-index: 2;
    top: 50%;
    width: 2.75rem;
    height: 2.75rem;
    background: rgba(13, 23, 23, 0.6);
    transform: translateY(-50%);
  }

  .project-lightbox__arrow--previous {
    left: var(--space-3);
  }

  .project-lightbox__arrow--next {
    right: var(--space-3);
  }

  .project-lightbox__image {
    max-height: calc(100dvh - 14rem);
  }

  .project-lightbox__caption {
    padding: 0 var(--space-8);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-gallery__image,
  .project-gallery__caption,
  .project-gallery__shade,
  .project-lightbox__control,
  .project-lightbox__thumbnail,
  .project-lightbox-enter-active,
  .project-lightbox-leave-active {
    transition: none;
  }

  .project-gallery__trigger:hover .project-gallery__image,
  .project-gallery__trigger:focus-visible .project-gallery__image {
    transform: none;
  }
}
</style>
