
// heroAnimations.js
const initHeroAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.classList.add('in-view');
        
        // Add staggered animation for hero children
        const heroElements = element.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta, .hero-image');
        heroElements.forEach((el, index) => {
          // Skip if already animated
          if (!el.classList.contains('staggered-in-view')) {
            const delay = index * 150; // 150ms between each element
            setTimeout(() => {
              el.classList.add('staggered-in-view');
            }, delay);
          }
        });
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe the entire hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    observer.observe(heroSection);
  }
};

export default initHeroAnimations;