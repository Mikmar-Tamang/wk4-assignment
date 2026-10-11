const initSlider = (selector) => {
  const slider = document.querySelector(selector);
  if (!slider) return;
  const track = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  const dotsContainer = slider.querySelector('.slider-dots');

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create dots dynamically
  const createDots = () => {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  };

  // Update slide position
  const updatePosition = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  // Update active dot
  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  };

  // Next slide (with infinite loop)
  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updatePosition();
    updateDots();
  };

  // Previous slide (with infinite loop)
  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updatePosition();
    updateDots();
  };

  // Go to specific slide (dot click)
  const goToSlide = (index) => {
    currentIndex = index;
    updatePosition();
    updateDots();
  };

  // Bind events
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Initialize
  createDots();
  updatePosition();
};

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initSlider('.slider');
});