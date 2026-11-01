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
                {{ shownIndex + 1 }} / {{ galleryImages.length }}
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

          <div
            class="project-lightbox__stage"
            @click="onStageClick"
            @touchstart.passive="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchCancel"
          >
            <div
              ref="trackRef"
              class="project-lightbox__track"
              @transitionend.self="onTrackTransitionEnd"
            >
              <figure
                v-for="slide in slides"
                :key="slide.key"
                class="project-lightbox__slide"
                :style="{ '--slide-offset': slide.offset }"
                :aria-hidden="slide.offset === 0 ? undefined : 'true'"
              >
                <img
                  class="project-lightbox__image"
                  :src="slide.image.full || slide.image.thumb"
                  :srcset="getSrcset(slide.image)"
                  sizes="100vw"
                  :alt="slide.offset === 0 ? slide.image.alt : ''"
                  :width="slide.image.width || undefined"
                  :height="slide.image.height || undefined"
                  decoding="async"
                  draggable="false"
                />
                <figcaption class="project-lightbox__caption">
                  {{ slide.image.alt }}
                </figcaption>
              </figure>
            </div>

            <button
              v-if="galleryImages.length > 1"
              type="button"
              class="project-lightbox__control project-lightbox__arrow project-lightbox__arrow--previous"
              aria-label="Show previous image"
              aria-keyshortcuts="ArrowLeft"
              @click="showPrevious"
            >
              <span aria-hidden="true" />
            </button>

            <button
              v-if="galleryImages.length > 1"
              type="button"
              class="project-lightbox__control project-lightbox__arrow project-lightbox__arrow--next"
              aria-label="Show next image"
              aria-keyshortcuts="ArrowRight"
              @click="showNext"
            >
              <span aria-hidden="true" />
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
              :class="{ 'project-lightbox__thumbnail--active': index === shownIndex }"
              :aria-label="`Show image ${index + 1}: ${image.alt}`"
              :aria-current="index === shownIndex ? 'true' : undefined"
              @click="goTo(index)"
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
  const thumbWidth = Number(image.thumbWidth) || Math.min(720, Math.max(320, fullWidth))

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

// ---- The sliding strip ----
// Three pictures sit side by side: the previous one (offset -1), the current
// one (0) and the next one (1). Moving the whole strip is what slides them, so
// a finger drag, an arrow tap and the keyboard all move the same way.
const mod = (value, count) => ((value % count) + count) % count
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const trackRef = ref(null)

// Set only while sliding to a picture that is not the direct neighbour
// (tapping a thumbnail far away): that picture takes the neighbour's place.
const slideTarget = ref(null)

// The picture the strip is gliding to. The counter and the thumbnail strip
// follow it straight away instead of waiting for the glide to end.
const pendingIndex = ref(null)
const shownIndex = computed(() => pendingIndex.value ?? activeIndex.value)

const slides = computed(() => {
  const images = galleryImages.value
  const count = images.length
  if (!count) return []
  if (count === 1) return [{ key: 'i0', offset: 0, index: 0, image: images[0] }]

  const here = activeIndex.value
  const override = slideTarget.value
  const previous = override?.direction === -1 ? override.index : mod(here - 1, count)
  const next = override?.direction === 1 ? override.index : mod(here + 1, count)

  return [
    // With only two pictures previous and next are the same one: give it a second key
    { key: previous === next ? `i${previous}-p` : `i${previous}`, offset: -1, index: previous },
    { key: `i${here}`, offset: 0, index: here },
    { key: `i${next}`, offset: 1, index: next }
  ].map((slide) => ({ ...slide, image: images[slide.index] }))
})

const SLIDE_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)' // quick start, long soft landing
const SNAP_SPEED = 0.3 // pixels per millisecond: a flick faster than this always turns the page
const SNAP_MIN_MOVE = 16 // ...as long as the finger moved at least this far
const SLIDE_MIN_MS = 200
const SLIDE_MAX_MS = 440

const prefersReducedMotion = () => {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

let trackX = 0 // where the strip is, in pixels (0 = current picture centred)
let gesture = null // the finger currently on the screen
let settling = null // the strip gliding to rest: { slot, index, timer }
let lastDragEnd = 0

const stageWidth = () => trackRef.value?.parentElement?.clientWidth || window.innerWidth

const setTrack = (x, durationMs = 0) => {
  trackX = x
  const el = trackRef.value
  if (!el) return
  if (durationMs > 0) {
    // Read a layout value first so the browser starts the glide from where the
    // strip really is, even if it was moved a moment ago.
    void el.offsetWidth
    el.style.transition = `transform ${durationMs}ms ${SLIDE_EASING}`
  } else {
    el.style.transition = 'none'
  }
  el.style.transform = `translate3d(${x}px, 0, 0)`
}

const readTrackX = () => {
  const el = trackRef.value
  if (!el) return trackX
  const matrix = new DOMMatrixReadOnly(window.getComputedStyle(el).transform)
  return matrix.m41
}

// The glide is over (or cut short): make the picture that arrived the current
// one and put the strip back to rest, in the same instant so nothing flickers.
// restX is where the strip was if someone grabbed it mid-glide.
const finishSettle = (restX = null) => {
  if (!settling) return
  const { slot, index, timer } = settling
  clearTimeout(timer)
  settling = null

  const width = stageWidth()
  const from = restX === null ? -slot * width : restX
  if (index !== null && index !== activeIndex.value) activeIndex.value = index
  slideTarget.value = null
  pendingIndex.value = null
  setTrack(from + slot * width)
}

const onTrackTransitionEnd = (event) => {
  if (event.propertyName === 'transform') finishSettle()
}

// Glide the strip so that picture number `slot` (-1, 0 or 1) ends up in view.
const settleTo = (slot, { velocity = 0, index = null } = {}) => {
  const width = stageWidth()
  const targetX = -slot * width
  const distance = Math.abs(targetX - trackX)

  let landing = null
  if (slot !== 0) {
    landing = index ?? slides.value.find((slide) => slide.offset === slot)?.index ?? null
  }

  let duration = 0
  if (!prefersReducedMotion() && distance >= 1) {
    duration = Math.abs(velocity) > 0.1
      ? clamp(distance / Math.abs(velocity), SLIDE_MIN_MS, SLIDE_MAX_MS)
      : clamp(SLIDE_MAX_MS * (distance / width), SLIDE_MIN_MS, SLIDE_MAX_MS)
  }

  pendingIndex.value = landing

  settling = {
    slot,
    index: landing,
    // Safety net in case the browser never reports the end of the glide
    timer: setTimeout(() => finishSettle(), duration + 120)
  }

  if (duration === 0) {
    setTrack(targetX)
    finishSettle()
    return
  }
  setTrack(targetX, duration)
}

// A finger lands on a strip that is still gliding: stop it right where it is
// and let the finger carry on from there.
const grabStrip = () => {
  if (!settling) return
  finishSettle(readTrackX())
}

const goTo = (index, direction = 0) => {
  const count = galleryImages.value.length
  if (count < 2) return

  gesture = null
  finishSettle()

  const target = mod(index, count)
  if (target === activeIndex.value) return

  const way = direction || (target > activeIndex.value ? 1 : -1)
  if (target !== mod(activeIndex.value + way, count)) {
    slideTarget.value = { direction: way, index: target }
  }
  settleTo(way, { index: target })
}

// Finish any glide in progress first, so quick repeated taps each move one step
const showPrevious = () => {
  finishSettle()
  goTo(activeIndex.value - 1, -1)
}

const showNext = () => {
  finishSettle()
  goTo(activeIndex.value + 1, 1)
}

const resetStrip = () => {
  if (settling) clearTimeout(settling.timer)
  settling = null
  gesture = null
  slideTarget.value = null
  pendingIndex.value = null
  trackX = 0
  if (trackRef.value) setTrack(0)
}

// ---- Swipe left / right on touch screens ----
// The strip follows the finger one-to-one. On letting go it glides on from the
// finger's speed: a short flick or a drag of a fifth of the screen turns the
// page, anything less settles back.
const onTouchStart = (event) => {
  if (galleryImages.value.length < 2 || event.touches.length !== 1) {
    gesture = null
    return
  }

  grabStrip()

  const touch = event.touches[0]
  gesture = {
    startX: touch.clientX,
    startY: touch.clientY,
    startTrackX: trackX,
    // The picture the strip is resting on (or closest to) when the finger lands
    base: Math.round(-trackX / stageWidth()),
    horizontal: null,
    samples: [{ x: touch.clientX, t: performance.now() }]
  }
}

const onTouchMove = (event) => {
  if (!gesture) return
  if (event.touches.length !== 1) {
    cancelGesture()
    return
  }

  const touch = event.touches[0]

  if (gesture.horizontal === null) {
    const dx = touch.clientX - gesture.startX
    const dy = touch.clientY - gesture.startY
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
    gesture.horizontal = Math.abs(dx) > Math.abs(dy)
    // Start following from here so the strip does not jump by the first few pixels
    gesture.startX = touch.clientX
  }

  if (!gesture.horizontal) return

  if (event.cancelable) event.preventDefault()

  const width = stageWidth()
  setTrack(clamp(gesture.startTrackX + (touch.clientX - gesture.startX), -width, width))

  const now = performance.now()
  gesture.samples.push({ x: touch.clientX, t: now })
  while (gesture.samples.length > 2 && now - gesture.samples[0].t > 100) gesture.samples.shift()
}

// Finger speed in pixels per millisecond over the last moments of the drag
// (0 if the finger rested before lifting).
const fingerSpeed = (samples) => {
  const now = performance.now()
  const last = samples[samples.length - 1]
  const first = samples[0]
  if (!last || samples.length < 2 || now - last.t > 90) return 0
  const elapsed = last.t - first.t
  return elapsed > 0 ? (last.x - first.x) / elapsed : 0
}

// A finger that grabbed a gliding strip and let go without really dragging
// must not leave the strip stuck half way: settle it onto the nearest picture.
const settleIfOffRest = (finished) => {
  if (Math.abs(trackX + finished.base * stageWidth()) >= 1) settleTo(finished.base)
}

const onTouchEnd = () => {
  if (!gesture) return
  const finished = gesture
  gesture = null
  if (finished.horizontal !== true) {
    settleIfOffRest(finished)
    return
  }

  lastDragEnd = Date.now()

  const width = stageWidth()
  const velocity = fingerSpeed(finished.samples)
  const moved = trackX - finished.startTrackX

  let slot = finished.base
  if (Math.abs(velocity) >= SNAP_SPEED && Math.abs(moved) >= SNAP_MIN_MOVE) {
    slot += velocity < 0 ? 1 : -1
  } else if (Math.abs(moved) >= Math.min(width * 0.18, 64)) {
    slot += moved < 0 ? 1 : -1
  }

  settleTo(clamp(slot, -1, 1), { velocity })
}

function cancelGesture() {
  if (!gesture) return
  const cancelled = gesture
  gesture = null
  settleIfOffRest(cancelled)
}

const onTouchCancel = () => cancelGesture()

// A tap on the dark background closes the viewer (but not the end of a swipe).
const onStageClick = (event) => {
  if (Date.now() - lastDragEnd < 350) return
  if (event.target.closest?.('button, img, figcaption')) return
  closeLightbox()
}

// Keep the thumbnail of the current picture in view in the strip below.
const centerActiveThumbnail = () => {
  const strip = lightboxRef.value?.querySelector('.project-lightbox__filmstrip')
  const active = strip?.querySelector('.project-lightbox__thumbnail--active')
  if (!strip || !active) return
  const target = active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2
  strip.scrollTo({ left: Math.max(target, 0), behavior: 'smooth' })
}

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

  // Two pictures each way, so a quick run of swipes never waits on a download
  const count = galleryImages.value.length
  const adjacentIndexes = [-2, -1, 1, 2].map((step) => mod(shownIndex.value + step, count))

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
    resetStrip()
    lockBodyScroll()
    document.addEventListener('keydown', handleKeydown, true)
    await nextTick()
    if (!isOpen.value) return
    // preventScroll: focusing must never slide the viewer sideways
    closeButtonRef.value?.focus({ preventScroll: true })
    isolateBackground()
    preloadAdjacentImages()
    centerActiveThumbnail()
    return
  }

  resetStrip()

  document.removeEventListener('keydown', handleKeydown, true)
  restoreBackground()
  restoreBodyScroll()
  await nextTick()
  if (lastTriggerRef.value?.isConnected) lastTriggerRef.value.focus()
})

watch(shownIndex, async () => {
  preloadAdjacentImages()
  await nextTick()
  centerActiveThumbnail()
})

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
  /* One column that can never grow wider than the screen. Without this, a long
     project title stretched the viewer past the screen edge and it opened
     shifted to the left with the left side cut off. */
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr) auto;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: rgba(13, 23, 23, 0.985);
  color: var(--white);
}

.project-lightbox > * {
  min-width: 0;
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
  min-width: 0;
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
  position: relative;
  min-height: 0;
  /* clip: the off-screen neighbours can never be scrolled into view */
  overflow: hidden;
  overflow: clip;
  /* Up/down stays with the browser, left/right is ours (swipe to change picture) */
  touch-action: pan-y pinch-zoom;
  -webkit-user-select: none;
  user-select: none;
}

.project-lightbox__arrow {
  position: absolute;
  z-index: 2;
  top: 50%;
  font-size: 0;
  background: rgba(13, 23, 23, 0.6);
  transform: translateY(-50%);
}

.project-lightbox__arrow--previous {
  left: clamp(var(--space-3), 2vw, var(--space-8));
}

.project-lightbox__arrow--next {
  right: clamp(var(--space-3), 2vw, var(--space-8));
}

.project-lightbox__arrow span {
  display: block;
  width: 0.65rem;
  height: 0.65rem;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
}

.project-lightbox__arrow--previous span {
  transform: rotate(135deg);
}

.project-lightbox__arrow--next span {
  transform: rotate(-45deg);
}

/* The strip: previous, current and next picture sit side by side. The strip
   itself moves (set from script) so the pictures follow the finger. */
.project-lightbox__track {
  position: absolute;
  inset: 0;
  will-change: transform;
}

.project-lightbox__slide {
  position: absolute;
  inset: 0;
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  /* Side padding keeps the picture clear of the arrow buttons on wide screens */
  padding: clamp(var(--space-3), 2vw, var(--space-6)) clamp(5rem, 9vw, 7.5rem);
  /* -1 = one screen to the left, 0 = in view, 1 = one screen to the right */
  transform: translate3d(calc(var(--slide-offset, 0) * 100%), 0, 0);
  backface-visibility: hidden;
}

.project-lightbox__image {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: calc(100dvh - 13rem);
  object-fit: contain;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.28);
  -webkit-user-drag: none;
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

  .project-lightbox__slide {
    padding-right: var(--space-3);
    padding-left: var(--space-3);
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
