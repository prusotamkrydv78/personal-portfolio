// Futuristic Footer Section JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize footer particles
  initFooterParticles();

  // Initialize hover effects
  initHoverEffects();

  // Initialize back to top button
  initBackToTop();

  // Initialize reveal animations
  initRevealAnimations();

  // Initialize newsletter form
  // initNewsletterForm();

  // Force activate all reveal elements after a short delay
  setTimeout(() => {
    document.querySelectorAll('.footer-reveal').forEach(element => {
      element.classList.add('active');
    });
  }, 500);
});

// Create footer particles
function initFooterParticles() {
  const particlesContainer = document.getElementById('footer-particles');
  if (!particlesContainer) return;

  // Create particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'footer-particle';

    // Random position
    const posX = Math.random() * 100;

    // Random size
    const size = Math.random() * 3 + 1;

    // Random opacity
    const opacity = Math.random() * 0.2 + 0.1;

    // Random animation duration
    const duration = Math.random() * 20 + 10;

    // Apply styles
    particle.style.cssText = `
      left: ${posX}%;
      bottom: -${size}px;
      width: ${size}px;
      height: ${size}px;
      opacity: ${opacity};
      animation-duration: ${duration}s;
      animation-delay: ${Math.random() * 5}s;
    `;

    particlesContainer.appendChild(particle);
  }
}

// Initialize hover effects
function initHoverEffects() {
  // Social icons hover effect
  const socialIcons = document.querySelectorAll('.footer-social-icon');

  socialIcons.forEach(icon => {
    // Add glow effect
    const glow = document.createElement('div');
    glow.className = 'footer-social-icon-glow';
    icon.appendChild(glow);

    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'footer-shine';
    icon.appendChild(shine);

    // Add hover interaction
    const interaction = document.createElement('div');
    interaction.className = 'footer-hover-interaction';
    icon.appendChild(interaction);

    // Add hover sound
    icon.addEventListener('mouseenter', () => {
      playHoverSound(300, 500);
    });
  });

  // Contact items hover effect
  const contactItems = document.querySelectorAll('.footer-contact-item');

  contactItems.forEach(item => {
    // Add glow effect to icon container
    const iconContainer = item.querySelector('.footer-contact-icon-container');
    if (iconContainer) {
      const glow = document.createElement('div');
      glow.className = 'footer-contact-icon-glow';
      iconContainer.appendChild(glow);
    }

    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'footer-shine';
    item.appendChild(shine);

    // Add hover interaction
    const interaction = document.createElement('div');
    interaction.className = 'footer-hover-interaction';
    item.appendChild(interaction);

    // Add hover sound
    item.addEventListener('mouseenter', () => {
      playHoverSound(200, 400);
    });
  });

  // Footer link items hover effect
  const footerLinkItems = document.querySelectorAll('.footer-link-item');

  footerLinkItems.forEach(item => {
    // Add hover sound
    item.addEventListener('mouseenter', () => {
      playHoverSound(400, 600);
    });

    // Add pulse animation to bullet
    const bullet = item.querySelector('.footer-link-bullet');
    if (bullet) {
      // Add glow effect
      const glow = document.createElement('div');
      glow.className = 'footer-link-bullet-glow';
      bullet.appendChild(glow);
    }
  });

  // Newsletter form hover effect
  const newsletterForm = document.querySelector('.footer-newsletter');

  if (newsletterForm) {
    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'footer-shine';
    newsletterForm.appendChild(shine);

    // Add hover sound to button
    const button = newsletterForm.querySelector('.footer-newsletter-button');
    if (button) {
      button.addEventListener('mouseenter', () => {
        playHoverSound(350, 550);
      });
    }
  }

  // Back to top button hover effect
  const backToTopButton = document.getElementById('footer-back-to-top');

  if (backToTopButton) {
    // Add glow effect
    const glow = document.createElement('div');
    glow.className = 'footer-back-to-top-glow';
    backToTopButton.appendChild(glow);

    // Add hover sound
    backToTopButton.addEventListener('mouseenter', () => {
      playHoverSound(450, 650);
    });
  }
}

// Initialize back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById('footer-back-to-top');

  if (!backToTopButton) return;

  // Initially hide the button
  backToTopButton.style.opacity = '0';
  backToTopButton.style.visibility = 'hidden';

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.visibility = 'visible';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.visibility = 'hidden';
    }
  });

  // Scroll to top when clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Play click sound
    playClickSound();
  });
}

// Initialize reveal animations
function initRevealAnimations() {
  // Create observer for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });

  // Observe elements with staggered delay
  const revealElements = document.querySelectorAll('.footer-reveal');

  revealElements.forEach((element, index) => {
    // Set initial state
    element.style.transitionDelay = `${index * 0.1}s`;

    // Add active class when element is in view
    setTimeout(() => {
      observer.observe(element);

      // Fallback: If element is already in viewport but not detected
      const rect = element.getBoundingClientRect();
      const isInViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      if (isInViewport) {
        element.classList.add('active');
      }
    }, 100);
  });
}

// Initialize newsletter form



// Play subtle hover sound
function playHoverSound(minFreq = 200, maxFreq = 400) {
  // Check if Web Audio API is supported
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContextClass();

      // Create oscillator
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // Set oscillator type and frequency
      oscillator.type = 'sine';
      const freq = Math.random() * (maxFreq - minFreq) + minFreq;
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + 0.2);

      // Set volume (very quiet)
      gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Start and stop
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      console.log('Audio context error:', e);
    }
  }
}

// Play click sound
function playClickSound() {
  // Check if Web Audio API is supported
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContextClass();

      // Create oscillator
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // Set oscillator type and frequency
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);

      // Set volume (very quiet)
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Start and stop
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log('Audio context error:', e);
    }
  }
}

// Play success sound
function playSuccessSound() {
  // Check if Web Audio API is supported
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContextClass();

      // Create oscillator
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // Set oscillator type and frequency
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2);

      // Set volume (very quiet)
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Start and stop
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.log('Audio context error:', e);
    }
  }
}
