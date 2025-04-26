// Intersection Observer for scroll animations with smoother transitions
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add stagger effect for benefits and cards
            if (entry.target.classList.contains('benefit') || entry.target.classList.contains('card2')) {
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.15}s`;
            }
            // Add stagger effect for footer sections
            if (entry.target.parentElement.classList.contains('footer')) {
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add visible class to header content immediately
    document.querySelector('.header').classList.add('visible');
    
    // Observe elements for scroll animations
    const elementsToAnimate = [
        ...document.querySelectorAll('.benefit'),
        ...document.querySelectorAll('.card2'),
        ...document.querySelectorAll('.footer > div'),
        ...document.querySelectorAll('.fade-in'),
        ...document.querySelectorAll('.benefitsa')
    ];

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Add hover animations for buttons
    const buttons = document.querySelectorAll('.primary-button, .secondary-button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });

    // Add smooth scroll behavior for anchor links
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

    // Add parallax effect for background sections
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const sections = document.querySelectorAll('.container, .cherry-blossoms');
                sections.forEach(section => {
                    const speed = 0.5;
                    const yPos = -(lastScrollY * speed);
                    section.style.backgroundPosition = `50% ${yPos}px`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add input field animation
    const emailInput = document.querySelector('.footer input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('focus', () => {
            emailInput.style.transform = 'scale(1.02)';
            emailInput.style.boxShadow = '0 0 10px rgba(216,27,96,0.2)';
        });

        emailInput.addEventListener('blur', () => {
            emailInput.style.transform = 'scale(1)';
            emailInput.style.boxShadow = 'none';
        });
    }

    // Add badge animation
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.style.animation = 'scaleIn 0.5s ease-out forwards';
    });
});

// Initial animation for body fade-in
document.body.classList.add('visible');
