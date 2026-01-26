// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
link.addEventListener('click', () => {
navMenu.classList.remove('active');
});
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
contactForm.addEventListener('submit', function(e) {
e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // For now, just show an alert (you can integrate with a backend later)
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        contactForm.reset();
    });

}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
const navbar = document.querySelector('.navbar');
if (window.scrollY > 50) {
navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
} else {
navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
}
});

// Lazy loading for images (optional enhancement)
if ('IntersectionObserver' in window) {
const imageObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersected) {
const img = entry.target;
if (img.dataset.src) {
img.src = img.dataset.src;
img.removeAttribute('data-src');
observer.unobserve(img);
}
}
});
});

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

}
