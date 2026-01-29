// Détection mobile et redirection
(function() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    
    // Redirection vers mobile si smartphone (pas tablette)
    if (isMobile && !isTablet && !window.location.pathname.includes('mobile.html')) {
        window.location.href = 'mobile.html';
    }
    
    // Redirection vers desktop si écran large depuis mobile
    if (!isMobile && window.location.pathname.includes('mobile.html')) {
        window.location.href = 'index.html';
    }
})();

// Navigation smooth scroll (page principale)
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header && window.scrollY > 100) {
        header.style.background = 'rgba(232, 244, 248, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    } else if (header) {
        header.style.background = 'rgba(232, 244, 248, 0.95)';
        header.style.backdropFilter = 'none';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .qare-widget, .contact-info, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// QARE integration tracking
document.querySelector('.btn-qare')?.addEventListener('click', () => {
    console.log('QARE appointment button clicked');
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #2c5aa0;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);