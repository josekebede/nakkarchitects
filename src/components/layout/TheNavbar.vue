<template>
  <nav
    class="navbar"
    aria-label="Primary navigation"
    :class="{
      'navbar--scrolled': isScrolled,
      'navbar--transparent': isTransparent && !isScrolled,
      'navbar--open': isMobileMenuOpen
    }"
  >
    <div class="navbar__container container">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="navbar__brand"
        aria-label="NAKK Architecture home"
        @click="closeMobileMenu()"
      >
        <img
          class="navbar__brand-logo"
          src="/brand/nakk-logo-lockup-white.png"
          alt=""
          width="1200"
          height="384"
          decoding="async"
        />
      </RouterLink>

      <!-- Desktop Navigation -->
      <ul class="navbar__menu">
        <li v-for="link in navLinks" :key="link.path">
          <RouterLink
            :to="link.path"
            class="navbar__link"
            :class="{ 'navbar__link--active': isActive(link.path) }"
            :aria-current="isActive(link.path) ? 'page' : undefined"
          >
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>

      <!-- Mobile Menu Toggle -->
      <button
        ref="menuToggleRef"
        class="navbar__toggle"
        :class="{ 'navbar__toggle--active': isMobileMenuOpen }"
        type="button"
        @click="toggleMobileMenu"
        :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-navigation"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

  </nav>

  <!--
    Teleport keeps the fixed overlay tied to the viewport. In particular, it
    prevents Safari's backdrop-filter containing block from constraining the
    menu to the navbar's height.
  -->
  <Teleport to="body">
    <Transition name="mobile-menu">
      <nav
        v-if="isMobileMenuOpen"
        id="mobile-navigation"
        ref="mobileMenuRef"
        class="navbar__mobile"
        aria-label="Mobile navigation"
      >
        <ul class="navbar__mobile-menu">
          <li v-for="link in navLinks" :key="link.path">
            <RouterLink
              :to="link.path"
              class="navbar__mobile-link"
              :aria-current="isActive(link.path) ? 'page' : undefined"
              @click="closeMobileMenu()"
            >
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const menuToggleRef = ref(null)
const mobileMenuRef = ref(null)
let desktopMediaQuery
let savedScrollY = 0
let hasScrollLock = false
let bodyStylesBeforeMenu
let htmlStylesBeforeMenu

const isTransparent = computed(() => {
  return route.path === '/'
})

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const setBodyScrollLocked = (isLocked) => {
  if (isLocked) {
    if (hasScrollLock) return

    savedScrollY = window.scrollY
    bodyStylesBeforeMenu = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width
    }
    htmlStylesBeforeMenu = {
      overflow: document.documentElement.style.overflow,
      overscrollBehavior: document.documentElement.style.overscrollBehavior
    }

    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    hasScrollLock = true
    return
  }

  if (!hasScrollLock) return

  Object.assign(document.body.style, bodyStylesBeforeMenu)
  Object.assign(document.documentElement.style, htmlStylesBeforeMenu)
  hasScrollLock = false
  window.scrollTo(0, savedScrollY)
}

const toggleMobileMenu = () => {
  const shouldOpen = !isMobileMenuOpen.value
  isMobileMenuOpen.value = shouldOpen
  setBodyScrollLocked(shouldOpen)
}

const closeMobileMenu = (restoreToggleFocus = false) => {
  if (!isMobileMenuOpen.value) {
    setBodyScrollLocked(false)
    return
  }

  isMobileMenuOpen.value = false
  setBodyScrollLocked(false)

  if (restoreToggleFocus) {
    nextTick(() => menuToggleRef.value?.focus())
  }
}

const handleKeydown = (event) => {
  if (!isMobileMenuOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closeMobileMenu(true)
    return
  }

  if (event.key !== 'Tab') return

  const menuLinks = Array.from(mobileMenuRef.value?.querySelectorAll('a[href]') || [])
  const focusableElements = [menuToggleRef.value, ...menuLinks].filter(Boolean)
  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]
  const activeElementIsTrapped = focusableElements.includes(document.activeElement)

  if (!activeElementIsTrapped) {
    event.preventDefault()
    const focusTarget = event.shiftKey ? lastFocusable : firstFocusable
    focusTarget?.focus()
  } else if (event.shiftKey && document.activeElement === firstFocusable) {
    event.preventDefault()
    lastFocusable?.focus()
  } else if (!event.shiftKey && document.activeElement === lastFocusable) {
    event.preventDefault()
    firstFocusable?.focus()
  }
}

const handleDesktopViewport = (event) => {
  if (event.matches) closeMobileMenu()
}

watch(() => route.fullPath, () => closeMobileMenu())

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
  desktopMediaQuery = window.matchMedia('(min-width: 769px)')
  desktopMediaQuery.addEventListener('change', handleDesktopViewport)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  desktopMediaQuery?.removeEventListener('change', handleDesktopViewport)
  closeMobileMenu()
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  height: var(--navbar-height);
  background-color: var(--white);
  transition:
    background-color var(--transition-base),
    box-shadow var(--transition-base),
    color var(--transition-base);
}

.navbar--transparent {
  background-color: rgba(26, 42, 42, 0.9);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  backdrop-filter: blur(12px) saturate(120%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.12);
}

.navbar--scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-md);
}

.navbar--open {
  background-color: var(--white);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: var(--shadow-sm);
}

.navbar__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* Brand / Logo */
.navbar__brand {
  display: flex;
  align-items: center;
  min-height: 44px;
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.navbar__brand:hover {
  opacity: 0.82;
}

.navbar__brand-logo {
  display: block;
  width: clamp(9.25rem, 15vw, 11.5rem);
  height: auto;
  filter: brightness(0) saturate(100%) invert(14%) sepia(12%) saturate(1048%) hue-rotate(132deg) brightness(91%) contrast(88%);
  transition: filter var(--transition-fast);
}

.navbar--transparent:not(.navbar--open) .navbar__brand-logo {
  filter: none;
}

.navbar--open .navbar__brand-logo,
.navbar--scrolled .navbar__brand-logo {
  filter: brightness(0) saturate(100%) invert(14%) sepia(12%) saturate(1048%) hue-rotate(132deg) brightness(91%) contrast(88%);
}

/* Desktop Menu */
.navbar__menu {
  display: flex;
  align-items: center;
  gap: var(--space-10);
  list-style: none;
}

.navbar__link {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
  text-decoration: none;
  position: relative;
  padding: var(--space-2) 0;
  transition: color var(--transition-fast);
}

.navbar--transparent .navbar__link {
  color: var(--white);
}

.navbar--scrolled .navbar__link {
  color: var(--text-primary);
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width var(--transition-base);
}

.navbar--transparent .navbar__link::after {
  background-color: var(--white);
}

.navbar__link:hover::after,
.navbar__link--active::after {
  width: 100%;
}

.navbar__link:hover {
  color: var(--primary);
}

.navbar--transparent .navbar__link:hover {
  color: var(--white);
}

.navbar__brand:focus-visible,
.navbar__link:focus-visible,
.navbar__toggle:focus-visible {
  outline-offset: 4px;
}

.navbar--transparent .navbar__brand:focus-visible,
.navbar--transparent .navbar__link:focus-visible,
.navbar--transparent .navbar__toggle:focus-visible {
  outline-color: var(--white);
}

.navbar--open .navbar__toggle:focus-visible {
  outline-color: var(--primary-dark);
}

/* Mobile Toggle */
.navbar__toggle {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  z-index: calc(var(--z-fixed) + 1);
}

.navbar__toggle span {
  display: block;
  width: 30px;
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-base);
}

.navbar--transparent .navbar__toggle span {
  background-color: var(--white);
}

.navbar--scrolled .navbar__toggle span,
.navbar--open .navbar__toggle span {
  background-color: var(--text-primary);
}

.navbar__toggle--active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__toggle--active span:nth-child(2) {
  opacity: 0;
}

.navbar__toggle--active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu */
.navbar__mobile {
  position: fixed;
  top: calc(var(--navbar-height-mobile) + env(safe-area-inset-top, 0px));
  left: 0;
  right: 0;
  height: calc(100vh - var(--navbar-height-mobile) - env(safe-area-inset-top, 0px));
  height: calc(100dvh - var(--navbar-height-mobile) - env(safe-area-inset-top, 0px));
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding:
    var(--space-6)
    max(var(--space-6), env(safe-area-inset-right, 0px))
    max(var(--space-6), env(safe-area-inset-bottom, 0px))
    max(var(--space-6), env(safe-area-inset-left, 0px));
  z-index: calc(var(--z-fixed) - 1);
  isolation: isolate;
}

.navbar__mobile-menu {
  display: grid;
  gap: var(--space-2);
  width: min(100%, 32rem);
  margin: auto;
  list-style: none;
  text-align: center;
  transition: transform var(--transition-base);
}

.navbar__mobile-link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3.5rem;
  font-family: var(--font-heading);
  font-size: clamp(var(--text-2xl), 6vw, var(--text-4xl));
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
  color: var(--text-primary);
  text-decoration: none;
  padding: var(--space-3) var(--space-4);
  transition: color var(--transition-fast);
}

.navbar__mobile-link:hover {
  color: var(--primary);
}

.navbar__mobile-link[aria-current='page'] {
  color: var(--primary-dark);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.3em;
}

.navbar__mobile-link:focus-visible {
  outline-offset: 6px;
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity var(--transition-base);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .navbar__mobile-menu,
.mobile-menu-leave-to .navbar__mobile-menu {
  transform: translateY(-0.75rem);
}

.mobile-menu-leave-active {
  pointer-events: none;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    height: calc(var(--navbar-height-mobile) + env(safe-area-inset-top, 0px));
  }

  .navbar__container {
    padding-top: env(safe-area-inset-top, 0px);
  }

  .navbar__menu {
    display: none;
  }

  .navbar__toggle {
    display: flex;
  }

  .navbar__brand-logo {
    width: 10.25rem;
  }
}

@media (min-width: 769px) {
  .navbar__mobile {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active,
  .navbar__mobile-menu {
    transition: none;
  }
}
</style>
