// Theme toggle functionality
function toggleNightMode() {
    const htmlElement = document.documentElement;
    const modeSwitcher = document.getElementById('mode-switcher');
    
    const isCurrentlyDark = htmlElement.getAttribute('data-theme') === 'dark';
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    
    if (modeSwitcher) {
        modeSwitcher.classList.toggle('active');
        // Update aria-pressed for accessibility
        modeSwitcher.setAttribute('aria-pressed', newTheme === 'dark');
    }
    
    localStorage.setItem('theme', newTheme === 'dark' ? 'dark' : '');
}

// Keyboard support for theme toggle
document.addEventListener('DOMContentLoaded', function() {
    const modeSwitcher = document.getElementById('mode-switcher');
    
    if (modeSwitcher) {
        modeSwitcher.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleNightMode();
            }
        });
        
        // Set initial aria-pressed state
        const isDark = localStorage.theme === 'dark' || 
                      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        modeSwitcher.setAttribute('aria-pressed', isDark);
    }
    
    // Lazy load images if supported
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Track page performance (optional, for analytics)
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        // Can be sent to analytics if needed
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'value': pageLoadTime,
                'event_category': 'performance'
            });
        }
    }
});

// Add smooth scroll support for anchor links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Prefetch DNS for external resources
function prefetchDNS(urls) {
    urls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Initialize DNS prefetch for common external services
prefetchDNS([
    '//fonts.googleapis.com',
    '//fonts.gstatic.com',
    '//www.googletagmanager.com',
    '//www.google-analytics.com'
]);