/**
 * Main JavaScript file for Prusotam's Portfolio
 * Features advanced animations, interactions, and effects
 */

// Register GSAP plugins with ScrollTrigger
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Splitting.js for text animations if available
  if (typeof Splitting !== 'undefined') {
    Splitting();
  }

  // Initialize Lenis for smooth scrolling
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Get scroll value for ScrollTrigger
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Tell ScrollTrigger to use these proxy methods
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Setup ScrollTrigger
    ScrollTrigger.defaults({
      scroller: document.body
    });

    // Update scroll on window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 250);
    });
  } catch (error) {
    console.error('Lenis initialization error:', error);
  }

  // Initialize VanillaTilt for card elements if available
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      gyroscope: true
    });
  }

  // Create a timeline for initial page load animations
  const tl = gsap.timeline();

  // Animate the preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    tl.to(preloader, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.classList.add('hidden');
      }
    });
  }

  // Hero section animations
  if (document.querySelector('#hero')) {
    // Animate floating elements
    gsap.to('.floating', {
      y: -20,
      duration: 6,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });
  }

  // Create scroll-triggered animations
  function createScrollAnimations() {
    try {
      // Set all progress bars to their data-percent width immediately
      document.querySelectorAll('.progress-bar').forEach(bar => {
        const percent = bar.getAttribute('data-percent') || '0';
        bar.style.width = `${percent}%`;
      });

      // Set all counters to their target value immediately
      document.querySelectorAll('.counter').forEach(counter => {
        const target = counter.getAttribute('data-target') || '0';
        counter.innerText = target;
      });

      // Only set up ScrollTrigger animations if ScrollTrigger is available
      if (typeof ScrollTrigger !== 'undefined') {
        // Progress bar animations in Skills section
        if (document.querySelector('#skills')) {
          const progressBars = document.querySelectorAll('.progress-bar');

          progressBars.forEach(bar => {
            // Bar is already at full width from earlier code
            // This is just for the animation effect if ScrollTrigger works
            const percent = bar.getAttribute('data-percent') || '0';
            bar.style.width = '0%'; // Reset for animation

            gsap.to(bar, {
              width: `${percent}%`,
              duration: 1.5,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
              }
            });
          });
        }

        // Parallax effects for background elements
        gsap.utils.toArray('.parallax-bg').forEach(bg => {
          gsap.to(bg, {
            y: -100,
            ease: 'none',
            scrollTrigger: {
              trigger: bg.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      }
    } catch (error) {
      console.error('Error in createScrollAnimations:', error);
    }
  }

  // Initialize scroll animations
  createScrollAnimations();

  // After everything is set up, refresh ScrollTrigger
  try {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  } catch (error) {
    console.error('Error refreshing ScrollTrigger:', error);
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');

        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
          mobileMenuButton.classList.remove('active');
          document.body.style.overflow = '';
        }

        // Scroll to the target element with Lenis
        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: -80, // Adjust for header height
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          // Fallback to standard scrolling if Lenis isn't available
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Contact form submission via AJAX
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show success message (in a real app, you would send the data to the server)
      const successMessage = document.getElementById('success-message');

      if (successMessage) {
        successMessage.classList.remove('hidden');
        contactForm.reset();

        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 5000);
      }
    });
  }

  // Initialize typewriter effect
  if (document.getElementById('typewriter')) {
    const typewriterElement = document.getElementById('typewriter');
    const words = ['websites.', 'experiences.', 'interfaces.', 'applications.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at the end of the word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing the next word
      }

      setTimeout(type, typeSpeed);
    }

    // Start the typewriter effect
    setTimeout(type, 1000);
  }
});
