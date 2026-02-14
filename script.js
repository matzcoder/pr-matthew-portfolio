// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active state to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    link.style.borderColor = 'rgba(102, 126, 234, 0.5)';
  }
});

// Parallax effect for header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    const scrolled = window.pageYOffset;
    header.style.transform = `translateY(${scrolled * 0.3}px)`;
    header.style.opacity = 1 - scrolled / 600;
  }
});

// Add typing effect to headers (optional)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
  observer.observe(card);
});

// Add hover effect for skill cards
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Form validation and enhancement
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const inputs = contactForm.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.01)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
    
    // Real-time validation
    input.addEventListener('input', function() {
      if (this.validity.valid) {
        this.style.borderColor = 'rgba(0, 242, 254, 0.5)';
      } else {
        this.style.borderColor = 'rgba(245, 87, 108, 0.5)';
      }
    });
  });
}

// Add cursor effect (optional - creates a trailing cursor effect)
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Create custom cursor trail effect
function createCursorTrail() {
  const trail = document.createElement('div');
  trail.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 242, 254, 0.6) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
  `;
  document.body.appendChild(trail);
  
  function animate() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    trail.style.left = cursorX + 'px';
    trail.style.top = cursorY + 'px';
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Only activate cursor trail on desktop devices
if (window.innerWidth > 768) {
  createCursorTrail();
}

// Add scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #00f2fe 100%);
    z-index: 10000;
    transition: width 0.2s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

createScrollProgress();

// Add fade-in animation on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      document.body.style.animation = 'rainbow 2s linear infinite';
      setTimeout(() => {
        document.body.style.animation = 'none';
        konamiIndex = 0;
      }, 5000);
    }
  } else {
    konamiIndex = 0;
  }
});

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

console.log('%c👋 Hey there! Thanks for checking out the code!', 'font-size: 20px; color: #00f2fe; font-weight: bold;');
console.log('%c🚀 Built with passion by Matthew', 'font-size: 14px; color: #667eea;');
console.log('%c💡 Want to collaborate? Reach out at prmatthew2005@gmail.com', 'font-size: 12px; color: #b4b4b4;');
