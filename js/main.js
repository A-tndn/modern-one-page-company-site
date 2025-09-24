// ModernTech Solutions - JavaScript
// Optimized for performance and accessibility

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    initMobileMenu();
    initSmoothScrolling();
    initFormHandling();
    initPerformanceOptimizations();
    initAccessibilityFeatures();
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('hidden');

            if (isOpen) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        });

        // Close mobile menu when clicking on links
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('#contact form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validate form
            if (validateForm(data)) {
                handleFormSubmission(data);
            }
        });
    }
}

// Form validation
function validateForm(data) {
    const required = ['name', 'email', 'message'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            showNotification('Please fill in all required fields.', 'error');
            return false;
        }
    }

    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    return true;
}

// Handle form submission
function handleFormSubmission(data) {
    // Simulate form submission
    showNotification('Thank you! Your message has been sent successfully.', 'success');

    // Reset form
    const form = document.querySelector('#contact form');
    if (form) {
        form.reset();
    }

    // In a real application, you would send the data to a server
    console.log('Form data:', data);
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images (if not using native lazy loading)
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Preload critical resources on interaction
    document.addEventListener('mouseover', preloadCriticalResources, { once: true });
    document.addEventListener('touchstart', preloadCriticalResources, { once: true });
}

// Preload critical resources
function preloadCriticalResources() {
    const links = [
        // Add any additional resources that should be preloaded
    ];

    links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Accessibility features
function initAccessibilityFeatures() {
    // Add keyboard navigation for mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // Focus management for modal-like elements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.focus();
                }
            }
        }
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // In production, you might want to send error reports to a logging service
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        // Monitor performance metrics
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;

            if (loadTime > 3000) {
                console.warn('Page load time is high:', loadTime + 'ms');
            }
        }, 0);
    });
}