// Futuristic Projects Section JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize projects particles
  initProjectsParticles();

  // Initialize project cards
  initProjectCards();

  // Initialize project filters
  initProjectFilters();

  // Initialize 3D tilt effect
  initTiltEffect();
});

// Create projects particles
function initProjectsParticles() {
  const particlesContainer = document.getElementById('projects-particles');
  if (!particlesContainer) return;

  // Create particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'projects-particle';

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

// Initialize project cards with hover effects
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    // Create shine effect
    const shine = document.createElement('div');
    shine.className = 'project-card-shine';
    card.appendChild(shine);

    // Create interaction effect
    const interaction = document.createElement('div');
    interaction.className = 'project-card-interaction';
    card.appendChild(interaction);

    // Create corner effects
    const corners = ['tl', 'tr', 'bl', 'br'];
    corners.forEach(corner => {
      const cornerElement = document.createElement('div');
      cornerElement.className = `project-card-corner project-card-corner-${corner}`;
      card.appendChild(cornerElement);
    });

    // Add hover sound effect
    card.addEventListener('mouseenter', () => {
      playHoverSound(200, 400);
    });

    // Add mouse move effect for interaction
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
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
    card.addEventListener('mouseleave', () => {
      interaction.style.opacity = '0';
    });
  });
}

// Initialize project filters
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.projects-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Get filter value
      const filter = button.getAttribute('data-filter');

      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          // Show card with simple animation
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          // Hide card with simple animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });

      // Play filter sound
      playFilterSound();
    });
  });
}

// Initialize 3D tilt effect for project cards
function initTiltEffect() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    let isHovering = false;

    card.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    card.addEventListener('mousemove', (e) => {
      if (!isHovering) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate rotation values based on mouse position (reduced intensity)
      const xRotation = ((y - rect.height / 2) / rect.height) * 5; // reduced from 8
      const yRotation = ((x - rect.width / 2) / rect.width) * -5; // reduced from 8

      // Apply transform with requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      // Reset transform with transition
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';

      // Remove transition after animation completes
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    });
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

// Play filter sound
function playFilterSound() {
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
      oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.3);

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

// Create particle burst effect
function createBurstEffect(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Create particles
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'projects-burst-particle';

    // Random angle and distance
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 20;

    // Calculate position
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    // Random size
    const size = Math.random() * 6 + 2;

    // Random color
    const colors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Apply styles
    particle.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(particle);

    // Animate particle
    const keyframes = [
      {
        transform: 'translate(-50%, -50%) scale(0)',
        opacity: 1
      },
      {
        transform: `translate(calc(${x - centerX}px - 50%), calc(${y - centerY}px - 50%)) scale(1)`,
        opacity: 0.8
      },
      {
        transform: `translate(calc(${x - centerX}px - 50%), calc(${y - centerY}px - 50%)) scale(0)`,
        opacity: 0
      }
    ];

    const timing = {
      duration: Math.random() * 1000 + 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    };

    const animation = particle.animate(keyframes, timing);

    animation.onfinish = () => {
      particle.remove();
    };
  }
}
