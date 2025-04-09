/**
 * Main JavaScript file for Prusotam's Portfolio
 * Features advanced animations, interactions, and effects
 */

// Register GSAP plugins with ScrollTrigger
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Splitting.js for text animations
  const splittingElements = Splitting();

  // Initialize Locomotive Scroll with advanced options
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.05, // Linear interpolation, lower = smoother
    smartphone: {
      smooth: true,
      multiplier: 0.8,
      lerp: 0.07
    },
    tablet: {
      smooth: true,
      multiplier: 0.9,
      lerp: 0.07
    },
    class: 'is-inview',
  });

  // Update ScrollTrigger when Locomotive Scroll updates
  scroll.on('scroll', ScrollTrigger.update);

  // Tell ScrollTrigger to use these proxy methods for the '[data-scroll-container]' element
  ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
  });

  // Update scroll on window resize with debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      scroll.update();
      ScrollTrigger.refresh();
    }, 250);
  });

  // Initialize VanillaTilt for card elements
  VanillaTilt.init(document.querySelectorAll('.tilt'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.2,
    gyroscope: true
  });

  // Initialize Swiper for project sliders if they exist
  if (document.querySelector('.swiper')) {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }

  // Initialize Barba.js for page transitions
  barba.init({
    transitions: [{
      name: 'opacity-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5
        });
      }
    }]
  });

  // Create a timeline for initial page load animations
  const tl = gsap.timeline();

  // Animate the preloader
  tl.to('.preloader', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      document.querySelector('.preloader').classList.add('hidden');
    }
  });

  // Hero section animations with staggered text reveal
  if (document.querySelector('.hero-section')) {
    // Animate hero image or element
    tl.from('.hero-image', {
      scale: 1.2,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.4');

    // Animate hero heading with character split
    document.querySelectorAll('.hero-heading .word').forEach((word, index) => {
      const chars = word.querySelectorAll('.char');
      tl.from(chars, {
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.03,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, index === 0 ? '-=0.8' : '-=0.6');
    });

    // Animate hero description
    tl.from('.hero-description', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4');

    // Animate hero buttons
    tl.from('.hero-buttons .btn', {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.6');

    // Animate floating elements
    gsap.to('.floating-element', {
      y: -20,
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });
  }

  // Create scroll-triggered animations
  function createScrollAnimations() {
    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
      const highlight = title.querySelector('.highlight');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          scroller: '[data-scroll-container]',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.from(title, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      });

      if (highlight) {
        tl.from(highlight, {
          width: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        }, '-=0.4');
      }
    });

    // About section animations
    if (document.querySelector('.about-section')) {
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-section',
          scroller: '[data-scroll-container]',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      aboutTl.from('.about-image', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      aboutTl.from('.about-content', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8');
    }

    // Skills section animations with progress bars
    if (document.querySelector('.skills-section')) {
      const skillItems = document.querySelectorAll('.skill-item');

      skillItems.forEach((item, index) => {
        const progressBar = item.querySelector('.progress-bar');
        const percentage = item.querySelector('.percentage');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            scroller: '[data-scroll-container]',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

        tl.from(item, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: index * 0.1
        });

        if (progressBar) {
          const percentValue = progressBar.getAttribute('data-percent') || '80';

          tl.to(progressBar, {
            width: `${percentValue}%`,
            duration: 1.5,
            ease: 'power3.inOut'
          }, '-=0.3');

          if (percentage) {
            tl.to(percentage, {
              textContent: `${percentValue}%`,
              duration: 1.5,
              ease: 'power3.inOut',
              onUpdate: function() {
                percentage.textContent = Math.round(this.targets()[0]._gsap.textContent) + '%';
              }
            }, '-=1.5');
          }
        }
      });
    }

    // Projects section animations
    if (document.querySelector('.projects-section')) {
      const projectItems = document.querySelectorAll('.project-card');

      gsap.from(projectItems, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-section',
          scroller: '[data-scroll-container]',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // Project card hover effects
      projectItems.forEach(card => {
        const image = card.querySelector('img');
        const content = card.querySelector('.project-content');
        const title = card.querySelector('h3');

        card.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out'
          });

          if (content) {
            gsap.to(content, {
              y: -10,
              duration: 0.4,
              ease: 'power2.out'
            });
          }

          if (title) {
            gsap.to(title, {
              color: 'var(--color-primary)',
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });

          if (content) {
            gsap.to(content, {
              y: 0,
              duration: 0.4,
              ease: 'power2.out'
            });
          }

          if (title) {
            gsap.to(title, {
              color: '',
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      });
    }

    // Contact section animations
    if (document.querySelector('.contact-section')) {
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-section',
          scroller: '[data-scroll-container]',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      contactTl.from('.contact-info', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      contactTl.from('.contact-form', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');

      // Form input animations
      const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

      formInputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            borderColor: 'var(--color-primary)',
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.2)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            borderColor: '',
            boxShadow: '',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }

    // Parallax effects for background elements
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
      gsap.to(bg, {
        y: () => -100,
        ease: 'none',
        scrollTrigger: {
          trigger: bg.parentElement,
          scroller: '[data-scroll-container]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Counter animations
    gsap.utils.toArray('.counter').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);

      gsap.to(counter, {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: counter,
          scroller: '[data-scroll-container]',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        onUpdate: function() {
          counter.textContent = Math.round(this.targets()[0]._gsap.textContent);
        }
      });
    });
  }

  // Initialize scroll animations
  createScrollAnimations();

  // Each time Locomotive Scroll updates, tell ScrollTrigger to update too
  ScrollTrigger.addEventListener('refresh', () => scroll.update());

  // After everything is set up, refresh ScrollTrigger
  ScrollTrigger.refresh();

  // Initialize magnetic buttons if they exist
  const magneticButtons = document.querySelectorAll('.magnetic-btn');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out'
      });

      const btnContent = btn.querySelector('.btn-content');
      if (btnContent) {
        gsap.to(btnContent, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });

      const btnContent = btn.querySelector('.btn-content');
      if (btnContent) {
        gsap.to(btnContent, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    });
  });

  // Create a noise texture for the background if it doesn't exist
  if (!document.querySelector('.noise-bg img')) {
    const createNoiseTexture = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = 200;
      const height = 200;

      canvas.width = width;
      canvas.height = height;

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 255);
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = Math.random() * 25; // Opacity
      }

      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL('image/png');
    };

    const noiseTexture = createNoiseTexture();
    const noiseImg = document.createElement('img');
    noiseImg.src = noiseTexture;
    noiseImg.style.opacity = '0.05';
    noiseImg.style.width = '100%';
    noiseImg.style.height = '100%';

    const noiseContainer = document.querySelector('.noise-bg');
    if (noiseContainer) {
      noiseContainer.appendChild(noiseImg);
    }
  }
});
