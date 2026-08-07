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
        @click="closeMobileMenu"
      >
        <div class="navbar__logo">
          <svg
            class="navbar__logo-icon"
            viewBox="0 0 60 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <!-- Simplified geometric building icon similar to NAKK logo -->
            <path d="M10 45V15L15 10V45" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <path d="M20 45V12L25 7V45" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <path d="M30 45V8L35 3V45" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <path d="M40 45V12L45 7V45" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <path d="M50 45V15L55 10V45" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <!-- Connecting lines at top -->
            <path d="M10 15L15 10M20 12L25 7M30 8L35 3M40 12L45 7M50 15L55 10" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <div class="navbar__brand-text">
          <span class="navbar__brand-name">NAKK</span>
          <span class="navbar__brand-tagline">ARCHITECTURE</span>
        </div>
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

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-navigation"
        class="navbar__mobile"
      >
        <ul class="navbar__mobile-menu">
          <li v-for="(link, index) in navLinks" :key="link.path" :style="{ transitionDelay: `${index * 0.1}s` }">
            <RouterLink
              :to="link.path"
              class="navbar__mobile-link"
              :aria-current="isActive(link.path) ? 'page' : undefined"
              @click="closeMobileMenu"
            >
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
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
let bodyOverflowBeforeMenu = ''

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
    bodyOverflowBeforeMenu = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return
  }

  document.body.style.overflow = bodyOverflowBeforeMenu
  bodyOverflowBeforeMenu = ''
}

const toggleMobileMenu = () => {
  const shouldOpen = !isMobileMenuOpen.value
  isMobileMenuOpen.value = shouldOpen
  setBodyScrollLocked(shouldOpen)
}

const closeMobileMenu = () => {
  if (!isMobileMenuOpen.value) return
  isMobileMenuOpen.value = false
  setBodyScrollLocked(false)
}

const handleKeydown = (event) => {
  if (!isMobileMenuOpen.value) return

  if (event.key === 'Escape') {
    closeMobileMenu()
    nextTick(() => menuToggleRef.value?.focus())
    return
  }

  if (event.key !== 'Tab') return

  const menuLinks = Array.from(
    document.querySelectorAll('#mobile-navigation a[href]')
  )
  const focusableElements = [menuToggleRef.value, ...menuLinks].filter(Boolean)
  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstFocusable) {
    event.preventDefault()
    lastFocusable?.focus()
  } else if (!event.shiftKey && document.activeElement === lastFocusable) {
    event.preventDefault()
    firstFocusable?.focus()
  }
}

watch(() => route.fullPath, closeMobileMenu)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
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
  gap: var(--space-3);
  text-decoration: none;
  color: var(--primary-dark);
  transition: color var(--transition-fast);
}

.navbar--transparent .navbar__brand {
  color: var(--white);
}

.navbar--scrolled .navbar__brand {
  color: var(--primary-dark);
}

.navbar--open .navbar__brand {
  color: var(--primary-dark);
}

.navbar__logo {
  width: 48px;
  height: 40px;
}

.navbar__logo-icon {
  width: 100%;
  height: 100%;
}

.navbar__brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.navbar__brand-name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wider);
}

.navbar__brand-tagline {
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: var(--font-normal);
  letter-spacing: var(--tracking-widest);
  margin-top: 2px;
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-fixed);
}

.navbar__mobile-menu {
  list-style: none;
  text-align: center;
}

.navbar__mobile-menu li {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.navbar__mobile-link {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  text-decoration: none;
  padding: var(--space-4) 0;
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
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    height: var(--navbar-height-mobile);
  }

  .navbar__menu {
    display: none;
  }

  .navbar__toggle {
    display: flex;
  }

  .navbar__brand-tagline {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar__mobile-menu li {
    opacity: 1;
    transform: none;
    animation: none;
    transition-delay: 0s !important;
  }
}
</style>
