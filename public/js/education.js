// Futuristic Education Section JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize education particles
  initEducationParticles();
  
  // Initialize timeline items
  initTimelineItems();
  
  // Initialize achievement cards
  initAchievementCards();
  
  // Initialize goal cards
  initGoalCards();
  
  // Initialize hover effects
  initHoverEffects();
});

// Create education particles
function initEducationParticles() {
  const particlesContainer = document.getElementById('education-particles');
  if (!particlesContainer) return;
  
  // Create particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'education-particle';
    
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

// Initialize timeline items with scroll animations
function initTimelineItems() {
  const timelineItems = document.querySelectorAll('.education-timeline-item');
  
  if (!timelineItems.length) return;
  
  // Create observer for timeline items
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Add staggered animation to children
        const children = entry.target.querySelectorAll('.stagger-animation');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('active');
          }, 100 * index);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });
  
  // Observe each timeline item
  timelineItems.forEach(item => {
    observer.observe(item);
    
    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'education-shine';
    item.querySelector('.education-timeline-card').appendChild(shine);
    
    // Add hover interaction
    const interaction = document.createElement('div');
    interaction.className = 'education-hover-interaction';
    item.querySelector('.education-timeline-card').appendChild(interaction);
  });
}

// Initialize achievement cards with scroll animations
function initAchievementCards() {
  const achievementCards = document.querySelectorAll('.education-achievement-card');
  
  if (!achievementCards.length) return;
  
  // Create observer for achievement cards
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
  
  // Observe each achievement card with staggered delay
  achievementCards.forEach((card, index) => {
    setTimeout(() => {
      observer.observe(card);
    }, 100 * index);
    
    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'education-shine';
    card.appendChild(shine);
    
    // Add hover interaction
    const interaction = document.createElement('div');
    interaction.className = 'education-hover-interaction';
    card.appendChild(interaction);
  });
}

// Initialize goal cards with scroll animations
function initGoalCards() {
  const goalCards = document.querySelectorAll('.education-goal-card');
  
  if (!goalCards.length) return;
  
  // Create observer for goal cards
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
  
  // Observe each goal card with staggered delay
  goalCards.forEach((card, index) => {
    setTimeout(() => {
      observer.observe(card);
    }, 200 * index);
    
    // Add shine effect
    const shine = document.createElement('div');
    shine.className = 'education-shine';
    card.appendChild(shine);
    
    // Add hover interaction
    const interaction = document.createElement('div');
    interaction.className = 'education-hover-interaction';
    card.appendChild(interaction);
  });
}

// Initialize hover effects
function initHoverEffects() {
  // Timeline cards hover effect
  const timelineCards = document.querySelectorAll('.education-timeline-card');
  
  timelineCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      playHoverSound(200, 400);
    });
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const interaction = card.querySelector('.education-hover-interaction');
      if (interaction) {
        interaction.style.left = `${x}px`;
        interaction.style.top = `${y}px`;
        interaction.style.transform = 'translate(-50%, -50%) scale(1)';
        interaction.style.opacity = '0.5';
        
        // Timeout to hide the interaction effect if mouse stops moving
        setTimeout(() => {
          interaction.style.opacity = '0';
        }, 300);
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const interaction = card.querySelector('.education-hover-interaction');
      if (interaction) {
        interaction.style.opacity = '0';
      }
    });
  });
  
  // Achievement cards hover effect
  const achievementCards = document.querySelectorAll('.education-achievement-card');
  
  achievementCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      playHoverSound(300, 500);
    });
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const interaction = card.querySelector('.education-hover-interaction');
      if (interaction) {
        interaction.style.left = `${x}px`;
        interaction.style.top = `${y}px`;
        interaction.style.transform = 'translate(-50%, -50%) scale(1)';
        interaction.style.opacity = '0.5';
        
        // Timeout to hide the interaction effect if mouse stops moving
        setTimeout(() => {
          interaction.style.opacity = '0';
        }, 300);
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const interaction = card.querySelector('.education-hover-interaction');
      if (interaction) {
        interaction.style.opacity = '0';
      }
    });
  });
  
  // Goal cards hover effect
  const goalCards = document.querySelectorAll('.education-goal-card');
  
  goalCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      playHoverSound(400, 600);
    });
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const interaction = card.querySelector('.education-hover-interaction');
      if (interaction) {
        interaction.style.left = `${x}px`;
        interaction.style.top = `${y}px`;
        interaction.style.transform = 'translate(-50%, -50%) scale(1)';
        interaction.style.opacity = '0.5';
        
        // Timeout to hide the interaction effect if mouse stops moving
        setTimeout(() => {
          interaction.style.opacity = '0';
        }, 300);
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const interaction = card.querySelector('.education-hover-interaction');
      if (interaction) {
        interaction.style.opacity = '0';
      }
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
