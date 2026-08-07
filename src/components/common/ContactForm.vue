<template>
  <form
    class="contact-form"
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    :aria-busy="isSubmitting"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" value="contact" />
    <p class="hidden">
      <label>Don't fill this out: <input name="bot-field" /></label>
    </p>
    <div class="contact-form__group">
      <label for="name" class="contact-form__label">Your Name *</label>
      <input
        id="name"
        name="name"
        v-model="form.name"
        type="text"
        class="contact-form__input"
        :class="{ 'contact-form__input--error': errors.name }"
        placeholder="John Doe"
        required
        autocomplete="name"
        :aria-invalid="Boolean(errors.name)"
        :aria-describedby="errors.name ? 'name-error' : undefined"
      />
      <span v-if="errors.name" id="name-error" class="contact-form__error" role="alert">{{ errors.name }}</span>
    </div>

    <div class="contact-form__group">
      <label for="email" class="contact-form__label">Email Address *</label>
      <input
        id="email"
        name="email"
        v-model="form.email"
        type="email"
        class="contact-form__input"
        :class="{ 'contact-form__input--error': errors.email }"
        placeholder="john@example.com"
        required
        autocomplete="email"
        :aria-invalid="Boolean(errors.email)"
        :aria-describedby="errors.email ? 'email-error' : undefined"
      />
      <span v-if="errors.email" id="email-error" class="contact-form__error" role="alert">{{ errors.email }}</span>
    </div>

    <div class="contact-form__group">
      <label for="phone" class="contact-form__label">Phone Number</label>
      <input
        id="phone"
        name="phone"
        v-model="form.phone"
        type="tel"
        class="contact-form__input"
        placeholder="+251 XX XXX XXXX"
        autocomplete="tel"
      />
    </div>

    <div class="contact-form__group">
      <label for="subject" class="contact-form__label">Subject *</label>
      <select
        id="subject"
        name="subject"
        v-model="form.subject"
        class="contact-form__input contact-form__select"
        :class="{ 'contact-form__input--error': errors.subject }"
        required
        :aria-invalid="Boolean(errors.subject)"
        :aria-describedby="errors.subject ? 'subject-error' : undefined"
      >
        <option value="">Select a subject</option>
        <option value="new-project">New Project Inquiry</option>
        <option value="consultation">Consultation Request</option>
        <option value="partnership">Partnership Opportunity</option>
        <option value="general">General Question</option>
        <option value="other">Other</option>
      </select>
      <span v-if="errors.subject" id="subject-error" class="contact-form__error" role="alert">{{ errors.subject }}</span>
    </div>

    <div class="contact-form__group contact-form__group--full">
      <label for="message" class="contact-form__label">Your Message *</label>
      <textarea
        id="message"
        name="message"
        v-model="form.message"
        class="contact-form__input contact-form__textarea"
        :class="{ 'contact-form__input--error': errors.message }"
        placeholder="Tell us about your project..."
        rows="5"
        required
        :aria-invalid="Boolean(errors.message)"
        :aria-describedby="errors.message ? 'message-error' : undefined"
      />
      <span v-if="errors.message" id="message-error" class="contact-form__error" role="alert">{{ errors.message }}</span>
    </div>

    <div class="contact-form__group contact-form__group--full">
      <button
        type="submit"
        class="btn btn-primary btn-lg contact-form__submit"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">Send Message</span>
        <span v-else class="contact-form__loading">
          <svg class="contact-form__spinner" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" />
          </svg>
          Sending...
        </span>
      </button>
    </div>

    <!-- Success Message -->
    <Transition name="fade">
      <div v-if="isSuccess" class="contact-form__success" role="status" aria-live="polite">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span>Thank you! Your message has been sent. We'll get back to you soon.</span>
      </div>
    </Transition>

    <p v-if="submitError" class="contact-form__submit-error" role="alert">
      {{ submitError }}
    </p>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const submitError = ref('')

const validateForm = () => {
  let isValid = true

  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }

  if (!form.subject) {
    errors.subject = 'Please select a subject'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  isSuccess.value = false
  submitError.value = ''

  try {
    // Submit to Netlify Forms
    const formData = new FormData()
    formData.append('form-name', 'contact')
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    formData.append('subject', form.subject)
    formData.append('message', form.message)

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })

    if (!response.ok) {
      throw new Error(`Form submission failed with status ${response.status}`)
    }

    isSuccess.value = true

    // Reset form
    Object.keys(form).forEach(key => {
      form[key] = ''
    })

    // Hide success message after 5 seconds
    setTimeout(() => {
      isSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Form submission error:', error)
    submitError.value = 'We could not send your message. Please try again or email us directly.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.contact-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.contact-form__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.contact-form__group--full {
  grid-column: span 2;
}

.contact-form__label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.contact-form__input {
  padding: var(--space-4);
  font-size: var(--text-base);
  color: var(--text-primary);
  background-color: var(--white);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.contact-form__input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(90, 125, 124, 0.1);
}

.contact-form__input::placeholder {
  color: var(--gray-400);
}

.contact-form__input--error {
  border-color: #e53e3e;
}

.contact-form__select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235a6b6a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  background-size: 20px;
  padding-right: var(--space-12);
}

.contact-form__textarea {
  resize: vertical;
  min-height: 150px;
}

.contact-form__error {
  font-size: var(--text-sm);
  color: #e53e3e;
}

.contact-form__submit {
  width: 100%;
}

.contact-form__loading {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.contact-form__spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.contact-form__spinner circle {
  stroke-dasharray: 31.4;
  stroke-dashoffset: 10;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.contact-form__success {
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: var(--radius-md);
  color: #166534;
  font-size: var(--text-sm);
}

.contact-form__success svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: #22c55e;
}

.contact-form__submit-error {
  grid-column: span 2;
  margin: 0;
  padding: var(--space-4);
  color: #8f1d1d;
  background: #fff5f5;
  border: 1px solid #f3b7b7;
  font-size: var(--text-sm);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .contact-form {
    grid-template-columns: 1fr;
  }

  .contact-form__group--full {
    grid-column: span 1;
  }

  .contact-form__success {
    grid-column: span 1;
  }

  .contact-form__submit-error {
    grid-column: span 1;
  }
}
</style>
