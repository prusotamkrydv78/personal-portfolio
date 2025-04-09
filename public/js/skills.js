// Futuristic Skills Section JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize tech particles
  initTechParticles();
  
  // Initialize skill progress bars
  initSkillProgressBars();
  
  // Initialize tech icon cards
  initTechIconCards();
  
  // Initialize tech learning badges
  initTechLearningBadges();
});

// Create tech particles
function initTechParticles() {
  const particlesContainer = document.getElementById('tech-particles');
  if (!particlesContainer) return;
  
  // Create particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'tech-particle';
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 3 + 1;
    
    // Random opacity
    const opacity = Math.random() * 0.3 + 0.1;
    
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

// Initialize skill progress bars with animation
function initSkillProgressBars() {
  const skillItems = document.querySelectorAll('.tech-skill-item');
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.tech-skill-progress-bar');
        const progressGlow = entry.target.querySelector('.tech-skill-progress-glow');
        const percent = entry.target.dataset.percent;
        
        if (progressBar && progressGlow) {
          progressBar.style.width = percent;
          progressGlow.style.width = percent;
        }
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Observe each skill item
  skillItems.forEach(item => {
    observer.observe(item);
  });
}

// Initialize tech icon cards with hover effects
function initTechIconCards() {
  const techCards = document.querySelectorAll('.tech-icon-card');
  
  techCards.forEach(card => {
    // Add hover sound effect
    card.addEventListener('mouseenter', () => {
      playHoverSound(200, 400);
      createBurstEffect(card);
    });
  });
}

// Initialize tech learning badges
function initTechLearningBadges() {
  const learningBadges = document.querySelectorAll('.tech-learning-badge');
  
  learningBadges.forEach(badge => {
    // Add hover sound effect
    badge.addEventListener('mouseenter', () => {
      playHoverSound(300, 600);
      createBurstEffect(badge);
    });
  });
}

// Create particle burst effect
function createBurstEffect(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Create particles
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'tech-burst-particle';
    
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
