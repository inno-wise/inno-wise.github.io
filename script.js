// Particles.js - Background Animation (unchanged)
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ff6347"  // Tomato color
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#ff6347"
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 5,
        "size_min": 0.1
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ff6347",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    }
  },
  "retina_detect": true
});

// Typing Animation - Hero Section (using Web Worker for threading)
const typingElement = document.getElementById('typingEffect');
let typingSpeed = 100;
const text = "Welcome to madeoftech! Let’s learn and innovate";

// Create the worker script as a Blob
const typingWorkerScript = `
  onmessage = function(e) {
    const { text, typingSpeed } = e.data;
    let i = 0;
    let result = '';
    function typeWriter() {
      if (i < text.length) {
        result += text.charAt(i);
        postMessage(result);
        i++;
        setTimeout(typeWriter, typingSpeed);
      }
    }
    typeWriter();
  }
`;

// Create Blob for the worker and initialize it
const blob = new Blob([typingWorkerScript], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

worker.onmessage = function(e) {
  typingElement.innerHTML = e.data;
};

// Start the worker
worker.postMessage({ text, typingSpeed });

// Smooth Scrolling (unchanged)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Sticky Navigation Bar (unchanged)
const navbar = document.querySelector('nav');
const navbarOffsetTop = navbar.offsetTop;

window.addEventListener('scroll', () => {
    if (window.scrollY > navbarOffsetTop) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Scroll to Top Button (unchanged)
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopButton);

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

// Enhanced Form Validation with Dynamic Error Messages (unchanged)
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    let isValid = true;

    const nameField = form.querySelector('input[name="name"]');
    const emailField = form.querySelector('input[name="email"]');
    const messageField = form.querySelector('textarea[name="message"]');

    // Name validation
    if (!nameField.value.trim()) {
        isValid = false;
        displayError(nameField, 'Please enter your name.');
    } else {
        clearError(nameField);
    }

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(emailField.value.trim())) {
        isValid = false;
        displayError(emailField, 'Please enter a valid email address.');
    } else {
        clearError(emailField);
    }

    // Message validation
    if (!messageField.value.trim()) {
        isValid = false;
        displayError(messageField, 'Please enter your message.');
    } else {
        clearError(messageField);
    }

    if (!isValid) {
        e.preventDefault();
    }
});

function displayError(field, message) {
    const error = field.parentElement.querySelector('.error');
    if (!error) {
        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error');
        errorMsg.textContent = message;
        field.parentElement.appendChild(errorMsg);
    }
}

function clearError(field) {
    const error = field.parentElement.querySelector('.error');
    if (error) {
        error.remove();
    }
}

// Carousel Slider (unchanged)
const carousel = document.querySelector('.carousel');
let currentSlide = 0;

function changeSlide() {
    const slides = carousel.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    currentSlide = (currentSlide + 1) % slides.length;
}

setInterval(changeSlide, 3000); // Slide every 3 seconds

// Parallax Effect (unchanged)
document.querySelectorAll('.parallax').forEach(element => {
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        element.style.backgroundPosition = `0 ${offset * 0.5}px`;
    });
});

// Dynamic Content Loading (Lazy Loading) (unchanged)
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyLoad = () => {
    lazyImages.forEach(img => {
        if (img.getBoundingClientRect().top < window.innerHeight) {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        }
    });
};

window.addEventListener('scroll', lazyLoad);

// Tooltip on hover (unchanged)
const tooltipElems = document.querySelectorAll('.tooltip-element');
tooltipElems.forEach(element => {
    element.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip-box');
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX + 10}px`;
        tooltip.style.top = `${rect.top + window.scrollY + 10}px`;
    });

    element.addEventListener('mouseleave', () => {
        document.querySelectorAll('.tooltip-box').forEach(tooltip => tooltip.remove());
    });
});

// Add New UX/UI Features

// 1. Modal Popup with Animations
function createModal(title, content, animation = 'fade') {
    const modal = document.createElement('div');
    modal.classList.add('modal', animation);
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>${title}</h2>
            <p>${content}</p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    });
}

// 2. Toggle Switch for Dark/Light Mode with Transition
const modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    document.body.classList.add('transition');
    setTimeout(() => document.body.classList.remove('transition'), 500);
});

// 3. Dropdown Navigation Menu with Slide Animation
const dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
    document.querySelector('.dropdown-menu').classList.toggle('slide');
});

// 4. Custom Scrollbar
document.body.style.setProperty('--scrollbar-color', '#ff6347');

// 5. Expandable FAQ Section
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
        question.nextElementSibling.classList.toggle('active');
    });
});

// 6. Smooth Page Transitions
const transitionPage = () => {
    document.body.classList.add('page-transition');
    setTimeout(() => {
        document.body.classList.remove('page-transition');
    }, 300);
};

window.addEventListener('beforeunload', transitionPage);

// 7. Image Hover Zoom Effect
const zoomImages = document.querySelectorAll('.zoom-img');
zoomImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.classList.add('zoom-in');
    });
    image.addEventListener('mouseleave', () => {
        image.classList.remove('zoom-in');
    });
});

// 8. Countdown Timer
const countdownElement = document.getElementById('countdown');
const targetDate = new Date('2025-01-01').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);

// 9. Accordion Menu
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;
    });
});

// 10. Floating Action Button (FAB)
const fabButton = document.createElement('button');
fabButton.innerHTML = '⚙️';
fabButton.classList.add('fab');
document.body.appendChild(fabButton);

fabButton.addEventListener('click', () => {
    alert('Floating Action Button Clicked');
});

// 11-40 Additional Features...

// Optional: Pause the marquee on hover
const marquee = document.querySelector('.marquee ul');
marquee.addEventListener('mouseover', () => {
  marquee.style.animationPlayState = 'paused';
});
marquee.addEventListener('mouseout', () => {
  marquee.style.animationPlayState = 'running';
});

