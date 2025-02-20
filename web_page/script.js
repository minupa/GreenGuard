// Navbar scroll effect
const navbar = document.getElementById('navbar');
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
  const currentScrollPos = window.pageYOffset;

  // Show/hide navbar on scroll
  if (prevScrollPos > currentScrollPos) {
    navbar.style.transform = 'translateY(0)';
  } else {
    navbar.style.transform = 'translateY(-100%)';
  }
  prevScrollPos = currentScrollPos;

  // Add/remove background and shadow on scroll
  if (currentScrollPos > 100) {
    navbar.style.background = 'rgb(6, 62, 6)';
    navbar.style.backdropFilter = 'blur(8px)';
    navbar.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
  } else {
    navbar.style.background = 'transparent';
    navbar.style.backdropFilter = 'none';
    navbar.style.boxShadow = 'none';
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').substring(1); // Remove '#'
    const target = document.getElementById(targetID);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero section fade-in
gsap.from('.hero-content', {
  duration: 1,
  y: 50,
  opacity: 0,
  ease: 'power3.out'
});

// Features section - alternating slide-in effect
gsap.utils.toArray('.feature-item').forEach((feature, index) => {
  gsap.from(feature, {
    duration: 1,
    x: index % 2 === 0 ? -100 : 100, // Alternating left and right slide-in
    opacity: 0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: feature,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Team section - fade-in effect
gsap.from('.team-member', {
  duration: 1,
  opacity: 0,
  y: 30,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.team-grid',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});

// Fix external links without http/https prefix
document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("http://") && !href.startsWith("https://") && !href.startsWith("#")) {
      link.href = "https://" + href;
    }
  });
});