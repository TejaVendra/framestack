export default function initPortfolioAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe portfolio cards
  document.querySelectorAll(".portfolio-card-item").forEach((el) => {
    observer.observe(el);
  });

  // ✅ Observe both heading lines
  document.querySelectorAll(".heading-line").forEach((el) => {
    observer.observe(el);
  });
}
