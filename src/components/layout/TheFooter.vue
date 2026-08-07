<template>
  <footer class="footer">
    <div class="footer__container container">
      <div class="footer__grid">
        <!-- Brand Column -->
        <div class="footer__brand">
          <RouterLink to="/" class="footer__logo" aria-label="NAKK Architecture home">
            <img
              src="/brand/nakk-logo-lockup-white.png"
              alt=""
              width="1200"
              height="384"
              loading="lazy"
              decoding="async"
            />
          </RouterLink>
          <p class="footer__description">
            Where heritage meets innovation. Creating architectural solutions that honor cultural context while embracing bold contemporary design.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer__links">
          <h4 class="footer__heading">Quick Links</h4>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/projects">Projects</RouterLink></li>
            <li><RouterLink to="/about">About Us</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer__links">
          <h4 class="footer__heading">Services</h4>
          <ul>
            <li><span>Architectural Design</span></li>
            <li><span>Interior Design</span></li>
            <li><span>Project Management</span></li>
            <li><span>Consultation</span></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer__contact">
          <h4 class="footer__heading">Contact</h4>
          <div class="footer__contact-item">
            <span class="footer__contact-label">Address</span>
            <span>Mina Building, Wolo Sefer<br>Ethio China St, Addis Ababa</span>
          </div>
          <div class="footer__contact-item">
            <span class="footer__contact-label">Email</span>
            <a href="mailto:yosephktamene@gmail.com">yosephktamene@gmail.com</a>
          </div>
          <div class="footer__contact-item">
            <span class="footer__contact-label">Phone</span>
            <a href="tel:+251911728807">+251 911 728 807</a>
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div class="footer__social">
        <a href="https://www.instagram.com/nkarchitects__" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="17.5" cy="6.5" r="1.5"/>
          </svg>
        </a>
      </div>

      <!-- Copyright -->
      <div class="footer__bottom">
        <p>&copy; {{ currentYear }} NAKK Architecture. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: var(--gray-900);
  color: var(--gray-300);
  padding: var(--space-16) 0 var(--space-8);
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: var(--space-12);
  margin-bottom: var(--space-12);
}

/* Brand */
.footer__brand {
  max-width: 300px;
}

.footer__logo {
  display: inline-flex;
  width: min(12rem, 100%);
  min-height: 44px;
  align-items: center;
  text-decoration: none;
  margin-bottom: var(--space-6);
  transition: opacity var(--transition-fast);
}

.footer__logo:hover {
  opacity: 0.82;
}

.footer__logo img {
  display: block;
  width: 100%;
  height: auto;
}

.footer__description {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* Links */
.footer__heading {
  color: var(--white);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  margin-bottom: var(--space-6);
}

.footer__links ul {
  list-style: none;
}

.footer__links li {
  margin-bottom: var(--space-3);
}

.footer__links a,
.footer__links span {
  color: var(--gray-400);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}

.footer__links a:hover {
  color: var(--white);
}

/* Contact */
.footer__contact-item {
  margin-bottom: var(--space-4);
}

.footer__contact-label {
  display: block;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--gray-500);
  margin-bottom: var(--space-1);
}

.footer__contact-item span:not(.footer__contact-label),
.footer__contact-item a {
  color: var(--gray-300);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__contact-item a:hover {
  color: var(--white);
}

/* Social */
.footer__social {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-8) 0;
  border-top: 1px solid var(--gray-800);
  border-bottom: 1px solid var(--gray-800);
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--gray-800);
  color: var(--gray-400);
  transition: all var(--transition-fast);
}

.footer__social-link:hover {
  background-color: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
}

.footer__social-link svg {
  width: 18px;
  height: 18px;
}

/* Bottom */
.footer__bottom {
  text-align: center;
  padding-top: var(--space-8);
}

.footer__bottom p {
  font-size: var(--text-sm);
  color: var(--gray-500);
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }

  .footer__brand {
    grid-column: span 2;
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }

  .footer__brand {
    grid-column: span 1;
  }

  .footer {
    padding: var(--space-12) 0 var(--space-6);
  }
}
</style>
