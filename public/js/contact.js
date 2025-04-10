// Futuristic Contact Section JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize contact particles
  initContactParticles();

  // Initialize contact form
  initContactForm();

  // Initialize hover effects
  initHoverEffects();

  // Initialize reveal animations
  initRevealAnimations();

  // Force activate all reveal elements after a short delay
  setTimeout(() => {
    document.querySelectorAll('.contact-reveal').forEach(element => {
      element.classList.add('active');
    });
  }, 500);
});

// Create contact particles
function initContactParticles() {
  const particlesContainer = document.getElementById('contact-particles');
  if (!particlesContainer) return;

  // Create particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'contact-particle';

    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    // Random size
    const size = Math.random() * 3 + 1;

    // Random opacity
    const opacity = Math.random() * 0.2 + 0.1;

    // Random animation duration
    const duration = Math.random() * 20 + 10;

    // Apply styles
    particle.style.cssText = `
      left: ${posX}%;
      top: ${posY}%;
      width: ${size}px;
      height: ${size}px;
      opacity: ${opacity};
      animation-duration: ${duration}s;
      animation-delay: ${Math.random() * 5}s;
    `;

    particlesContainer.appendChild(particle);
  }
}

// Initialize contact form with advanced effects
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('contact-success-message');

  if (!contactForm) return;

  // Add form submission handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show loading state
    const submitButton = contactForm.querySelector('.contact-form-submit');
    const submitText = submitButton.querySelector('.contact-form-submit-text');
    const originalText = submitText.innerHTML;

    submitButton.disabled = true;
    submitText.innerHTML = `
      <span class="animate-pulse">Sending...</span>
      <i class="fas fa-circle-notch fa-spin"></i>
    `;

    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
      // Reset button
      submitButton.disabled = false;
      submitText.innerHTML = originalText;

      // Show success message
      if (successMessage) {
        successMessage.classList.remove('hidden');

        // Add success animation
        successMessage.style.animation = 'fadeInDown 0.5s ease forwards';

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.animation = 'fadeOutUp 0.5s ease forwards';

          setTimeout(() => {
            successMessage.classList.add('hidden');
          }, 500);
        }, 5000);
      }

      // Reset form
      contactForm.reset();

      // Play success sound
      playSuccessSound();
    }, 1500);
  });

  // Add focus effects to form inputs
  const formInputs = contactForm.querySelectorAll('.contact-form-input, .contact-form-textarea');

  formInputs.forEach(input => {
    // Create focus effect element if it doesn't exist
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('contact-form-focus-effect')) {
      const focusEffect = document.createElement('div');
      focusEffect.className = 'contact-form-focus-effect';
      input.parentNode.appendChild(focusEffect);
    }

    // Add focus event
    input.addEventListener('focus', () => {
      playInputSound();
    });

    // Add input event for real-time validation
    input.addEventListener('input', () => {
      validateInput(input);
    });
  });
}

// Validate form input
function validateInput(input) {
  const isValid = input.checkValidity();

  if (isValid) {
    input.classList.remove('border-red-500');
    input.classList.add('border-green-500');
  } else {
    input.classList.remove('border-green-500');
    input.classList.add('border-red-500');
  }
}

// Initialize hover effects
function initHoverEffects() {
  // Contact detail items hover effect
  const detailItems = document.querySelectorAll('.contact-detail-item');

  detailItems.forEach(item => {
    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'contact-shine';
    item.appendChild(shine);

    // Add hover interaction
    const interaction = document.createElement('div');
    interaction.className = 'contact-hover-interaction';
    item.appendChild(interaction);

    // Add hover sound
    item.addEventListener('mouseenter', () => {
      playHoverSound(200, 400);
    });

    // Add mouse move effect
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      interaction.style.left = `${x}px`;
      interaction.style.top = `${y}px`;
      interaction.style.transform = 'translate(-50%, -50%) scale(1)';
      interaction.style.opacity = '0.5';

      // Timeout to hide the interaction effect if mouse stops moving
      setTimeout(() => {
        interaction.style.opacity = '0';
      }, 300);
    });

    // Reset interaction on mouse leave
    item.addEventListener('mouseleave', () => {
      interaction.style.opacity = '0';
    });
  });

  // Social icons hover effect
  const socialIcons = document.querySelectorAll('.contact-social-icon');

  socialIcons.forEach(icon => {
    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'contact-shine';
    icon.appendChild(shine);

    // Add hover sound
    icon.addEventListener('mouseenter', () => {
      playHoverSound(300, 500);
    });
  });

  // Availability status hover effect
  const availabilityStatus = document.querySelector('.contact-availability');

  if (availabilityStatus) {
    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'contact-shine';
    availabilityStatus.appendChild(shine);

    // Add hover sound
    availabilityStatus.addEventListener('mouseenter', () => {
      playHoverSound(400, 600);
    });
  }

  // Form container hover effect
  const formContainer = document.querySelector('.contact-form-container');

  if (formContainer) {
    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'contact-shine';
    formContainer.appendChild(shine);
  }
}

// Initialize reveal animations
function initRevealAnimations() {
  // Create observer for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Element is intersecting:', entry.target);
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });

  // Observe elements with staggered delay
  const revealElements = document.querySelectorAll('.contact-reveal');
  console.log('Found reveal elements:', revealElements.length);

  revealElements.forEach((element, index) => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

    // Force reflow to ensure styles are applied
    void element.offsetWidth;

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
        console.log('Element already in viewport:', element);
        element.classList.add('active');
      }
    }, 100);
  });
}

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

// Play input focus sound
function playInputSound() {
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
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);

      // Set volume (very quiet)
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
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

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOutUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;
document.head.appendChild(style);
