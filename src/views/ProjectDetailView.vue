<template>
  <div class="project-detail">
    <template v-if="project">
      <header class="project-intro">
        <div class="project-intro__container container">
          <nav class="project-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><RouterLink to="/">Home</RouterLink></li>
              <li><RouterLink to="/projects">Projects</RouterLink></li>
              <li aria-current="page">{{ project.name }}</li>
            </ol>
          </nav>

          <div class="project-intro__grid">
            <div class="project-intro__copy">
              <RouterLink class="project-intro__back" to="/projects">
                <span aria-hidden="true">&larr;</span>
                All projects
              </RouterLink>
              <p class="project-intro__eyebrow">{{ categoryLabel }}</p>
              <h1 ref="pageHeadingRef" tabindex="-1">{{ project.name }}</h1>
              <p v-if="projectSummary" class="project-intro__summary">
                {{ projectSummary }}
              </p>

              <dl class="project-intro__facts">
                <div>
                  <dt>Category</dt>
                  <dd>{{ categoryLabel }}</dd>
                </div>
                <div>
                  <dt>Gallery</dt>
                  <dd>{{ imageCount }} {{ imageCount === 1 ? 'image' : 'images' }}</dd>
                </div>
              </dl>
            </div>

            <figure v-if="coverImage" class="project-intro__cover">
              <img
                :src="coverImage.thumb || coverImage.full"
                :srcset="coverSrcset"
                sizes="(max-width: 900px) 100vw, 48vw"
                :alt="coverImage.alt"
                :width="coverImage.width || undefined"
                :height="coverImage.height || undefined"
                fetchpriority="high"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </header>

      <section class="project-gallery-section" aria-labelledby="project-gallery-heading">
        <div class="container">
          <div class="project-gallery-section__heading">
            <div>
              <p class="project-gallery-section__eyebrow">Project photography</p>
              <h2 id="project-gallery-heading">Explore the work</h2>
            </div>
            <p>
              Select an image to open the full-screen gallery.
            </p>
          </div>

          <ProjectGallery :images="project.images" :project-name="project.name" />
        </div>
      </section>

      <nav
        v-if="previousProject || nextProject"
        class="project-neighbors"
        aria-label="Adjacent projects"
      >
        <div class="project-neighbors__container container">
          <RouterLink
            v-if="previousProject"
            class="project-neighbors__link project-neighbors__link--previous"
            :to="projectPath(previousProject)"
          >
            <span class="project-neighbors__direction">
              <span aria-hidden="true">&larr;</span> Previous project
            </span>
            <strong>{{ previousProject.name }}</strong>
            <span>{{ getCategoryLabel(previousProject) }}</span>
          </RouterLink>

          <RouterLink
            v-if="nextProject"
            class="project-neighbors__link project-neighbors__link--next"
            :to="projectPath(nextProject)"
          >
            <span class="project-neighbors__direction">
              Next project <span aria-hidden="true">&rarr;</span>
            </span>
            <strong>{{ nextProject.name }}</strong>
            <span>{{ getCategoryLabel(nextProject) }}</span>
          </RouterLink>
        </div>
      </nav>
    </template>

    <section v-else class="project-not-found">
      <div class="container project-not-found__content">
        <p class="project-not-found__code">404</p>
        <h1 ref="pageHeadingRef" tabindex="-1">Project not found</h1>
        <p>The project may have moved, or the address may be incomplete.</p>
        <RouterLink to="/projects" class="btn btn-primary">Browse all projects</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProjectGallery from '@/components/projects/ProjectGallery.vue'
import { useProjectsStore } from '@/stores/projects'

const route = useRoute()
const store = useProjectsStore()
const pageHeadingRef = ref(null)

const project = computed(() => {
  if (typeof store.getProjectBySlug !== 'function') return null
  return store.getProjectBySlug(String(route.params.slug || '')) || null
})

const allProjects = computed(() => (Array.isArray(store.projects) ? store.projects : []))

const projectIndex = computed(() => {
  if (!project.value) return -1
  return allProjects.value.findIndex((item) => item.slug === project.value.slug)
})

const previousProject = computed(() => {
  if (projectIndex.value <= 0) return null
  return allProjects.value[projectIndex.value - 1]
})

const nextProject = computed(() => {
  if (projectIndex.value < 0 || projectIndex.value >= allProjects.value.length - 1) return null
  return allProjects.value[projectIndex.value + 1]
})

const formatCategory = (category = '') => {
  return category
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getCategoryLabel = (item) => item?.categoryLabel || formatCategory(item?.category)

const categoryLabel = computed(() => getCategoryLabel(project.value))
const projectSummary = computed(() => project.value?.summary || project.value?.description || '')
const imageCount = computed(() => project.value?.imageCount ?? project.value?.images?.length ?? 0)

const normalizeImage = (image, fallbackAlt) => {
  if (!image) return null
  if (typeof image === 'string') {
    return { thumb: image, full: image, alt: fallbackAlt }
  }

  const thumb = image.thumb || image.full
  const full = image.full || image.thumb
  if (!thumb || !full) return null

  return {
    ...image,
    thumb,
    full,
    alt: image.alt || fallbackAlt
  }
}

const coverImage = computed(() => {
  if (!project.value) return null
  const cover = project.value.cover
  const fallbackAlt = `${project.value.name} featured view`

  if (cover && typeof cover === 'object') return normalizeImage(cover, fallbackAlt)

  if (cover) {
    const matchingImage = project.value.images?.find((image) => {
      return image?.thumb === cover || image?.full === cover
    })

    if (matchingImage) return normalizeImage(matchingImage, fallbackAlt)
    return normalizeImage(cover, fallbackAlt)
  }

  return normalizeImage(project.value.images?.[0], fallbackAlt)
})

const coverSrcset = computed(() => {
  const image = coverImage.value
  if (!image?.thumb || !image?.full || image.thumb === image.full) return undefined

  const fullWidth = Number(image.width) || 1600
  const thumbWidth = Number(image.thumbWidth) || Math.min(720, Math.max(320, fullWidth))
  if (fullWidth <= thumbWidth) return undefined
  return `${image.thumb} ${thumbWidth}w, ${image.full} ${fullWidth}w`
})

const projectPath = (item) => `/projects/${encodeURIComponent(item.slug)}`

watch(
  project,
  async (currentProject) => {
    const title = currentProject
      ? `${currentProject.name} | NAKK Architecture`
      : 'Project Not Found | NAKK Architecture'
    const description = currentProject?.summary || 'Explore a project by NAKK Architecture in Addis Ababa.'
    const canonicalUrl = new URL(route.path, 'https://nakkarchitecture.com').href
    const imageUrl = coverImage.value?.full
      ? new URL(coverImage.value.full, 'https://nakkarchitecture.com').href
      : 'https://nakkarchitecture.com/projects/residence-01/full/009.webp'

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', currentProject ? 'article' : 'website')
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', imageUrl)
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', coverImage.value?.alt || 'NAKK Architecture project')
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
    await nextTick()
    pageHeadingRef.value?.focus({ preventScroll: true })
  },
  { immediate: true, flush: 'post' }
)
</script>

<style scoped>
.project-detail {
  padding-top: var(--navbar-height);
  background: var(--bg-primary);
}

.project-intro {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--accent) 0%, var(--off-white) 65%, var(--white) 100%);
}

.project-intro::before {
  position: absolute;
  top: -14rem;
  right: -10rem;
  width: 34rem;
  height: 34rem;
  border: 1px solid rgba(90, 125, 124, 0.16);
  border-radius: var(--radius-full);
  content: '';
}

.project-intro__container {
  position: relative;
  padding-top: var(--space-8);
  padding-bottom: clamp(var(--space-16), 9vw, var(--space-24));
}

.project-breadcrumbs {
  margin-bottom: clamp(var(--space-10), 7vw, var(--space-20));
}

.project-breadcrumbs ol {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  overflow: hidden;
  color: var(--text-muted);
  font-size: var(--text-sm);
  white-space: nowrap;
}

.project-breadcrumbs li {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-breadcrumbs li:not(:last-child)::after {
  margin-left: var(--space-2);
  color: var(--primary-lighter);
  content: '/';
}

.project-breadcrumbs a {
  color: var(--text-secondary);
}

.project-breadcrumbs a:hover {
  color: var(--primary-dark);
}

.project-intro__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(24rem, 1.1fr);
  align-items: center;
  gap: clamp(var(--space-10), 7vw, var(--space-24));
}

.project-intro__copy {
  max-width: 42rem;
}

.project-intro__back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
  color: var(--primary-dark);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.project-intro__back span {
  transition: transform var(--transition-fast);
}

.project-intro__back:hover span {
  transform: translateX(-0.25rem);
}

.project-intro__eyebrow,
.project-gallery-section__eyebrow {
  margin-bottom: var(--space-4);
  color: var(--primary);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

.project-intro h1 {
  max-width: 13ch;
  margin-bottom: var(--space-6);
  color: var(--primary-darker);
  font-size: clamp(var(--text-4xl), 5vw, var(--text-7xl));
  line-height: 1.04;
}

.project-intro__summary {
  max-width: 38rem;
  margin-bottom: var(--space-10);
  color: var(--text-secondary);
  font-size: clamp(var(--text-base), 1.8vw, var(--text-xl));
  line-height: var(--leading-relaxed);
}

.project-intro__facts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--gray-200);
}

.project-intro__facts div {
  min-width: 8rem;
}

.project-intro__facts dt {
  margin-bottom: var(--space-1);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.project-intro__facts dd {
  color: var(--primary-darker);
  font-weight: var(--font-medium);
}

.project-intro__cover {
  position: relative;
  margin: 0;
}

.project-intro__cover::before {
  position: absolute;
  inset: var(--space-6) calc(0px - var(--space-6)) calc(0px - var(--space-6)) var(--space-6);
  z-index: 0;
  border-radius: var(--radius-lg);
  background: var(--primary);
  content: '';
}

.project-intro__cover img {
  position: relative;
  z-index: 1;
  width: 100%;
  max-height: 38rem;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  object-fit: cover;
}

.project-gallery-section {
  padding: clamp(var(--space-16), 9vw, var(--space-24)) 0;
}

.project-gallery-section__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: var(--space-8);
  margin-bottom: clamp(var(--space-10), 6vw, var(--space-16));
}

.project-gallery-section__heading h2 {
  color: var(--primary-darker);
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
}

.project-gallery-section__heading > p {
  max-width: 24rem;
  margin: 0;
  color: var(--text-muted);
  text-align: right;
}

.project-neighbors {
  border-top: 1px solid var(--gray-200);
  background: var(--bg-secondary);
}

.project-neighbors__container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding-top: var(--space-16);
  padding-bottom: var(--space-16);
}

.project-neighbors__link {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4) clamp(var(--space-4), 4vw, var(--space-12));
  color: var(--text-secondary);
}

.project-neighbors__link--previous {
  grid-column: 1;
  padding-left: 0;
}

.project-neighbors__link--next {
  grid-column: 2;
  align-items: flex-end;
  padding-right: 0;
  border-left: 1px solid var(--gray-200);
  text-align: right;
}

.project-neighbors__direction {
  color: var(--primary);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

.project-neighbors__link strong {
  overflow: hidden;
  color: var(--primary-darker);
  font-family: var(--font-heading);
  font-size: clamp(var(--text-lg), 2.5vw, var(--text-2xl));
  text-overflow: ellipsis;
  transition: color var(--transition-fast);
  white-space: nowrap;
}

.project-neighbors__link:hover strong {
  color: var(--primary);
}

.project-neighbors__link > span:last-child {
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.project-not-found {
  display: grid;
  min-height: calc(100vh - var(--navbar-height));
  place-items: center;
  background: var(--accent);
}

.project-not-found__content {
  max-width: 42rem;
  padding-top: var(--space-20);
  padding-bottom: var(--space-20);
  text-align: center;
}

.project-not-found__code {
  margin-bottom: var(--space-3);
  color: var(--primary);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-widest);
}

.project-not-found h1 {
  margin-bottom: var(--space-4);
  color: var(--primary-darker);
}

.project-not-found p:not(.project-not-found__code) {
  margin-bottom: var(--space-8);
}

@media (max-width: 900px) {
  .project-intro__grid {
    grid-template-columns: 1fr;
  }

  .project-intro__copy {
    max-width: 46rem;
  }

  .project-intro__cover {
    width: calc(100% - var(--space-6));
  }
}

@media (max-width: 768px) {
  .project-detail {
    padding-top: var(--navbar-height-mobile);
  }

  .project-intro__container {
    padding-top: var(--space-6);
  }

  .project-gallery-section__heading {
    display: block;
  }

  .project-gallery-section__heading > p {
    margin-top: var(--space-4);
    text-align: left;
  }

  .project-not-found {
    min-height: calc(100vh - var(--navbar-height-mobile));
  }
}

@media (max-width: 560px) {
  .project-intro__facts {
    gap: var(--space-5);
  }

  .project-intro__cover::before {
    inset: var(--space-3) calc(0px - var(--space-3)) calc(0px - var(--space-3)) var(--space-3);
  }

  .project-neighbors__container {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .project-neighbors__link--next {
    grid-column: 1;
    align-items: flex-start;
    padding-top: var(--space-8);
    padding-left: 0;
    border-top: 1px solid var(--gray-200);
    border-left: 0;
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-intro__back span,
  .project-neighbors__link strong {
    transition: none;
  }

  .project-intro__back:hover span {
    transform: none;
  }
}
</style>
