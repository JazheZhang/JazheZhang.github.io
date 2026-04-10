// ============================================
// script.js — Jack Zhang Portfolio
// WCAG AAA: aria-expanded on hamburger, focus management
// ============================================

// --- 1. DARK MODE TOGGLE ---
var darkToggle = document.getElementById('darkToggle');
var toggleIcon = darkToggle.querySelector('.toggle-icon');
var toggleText = darkToggle.querySelector('.toggle-text');

if (localStorage.getItem('darkMode') === 'on') {
  document.body.classList.add('dark');
  toggleIcon.innerHTML = '&#9788;';
  if (toggleText) toggleText.textContent = 'Light';
}

darkToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark');
  var isDark = document.body.classList.contains('dark');
  if (isDark) {
    toggleIcon.innerHTML = '&#9788;';
    if (toggleText) toggleText.textContent = 'Light';
    localStorage.setItem('darkMode', 'on');
    darkToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    toggleIcon.innerHTML = '&#9790;';
    if (toggleText) toggleText.textContent = 'Dark';
    localStorage.setItem('darkMode', 'off');
    darkToggle.setAttribute('aria-label', 'Switch to dark mode');
  }
});

// --- 2. HAMBURGER MENU ---
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
  var isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

// Close menu when a link is clicked
var allNavLinks = navLinks.querySelectorAll('a');
for (var i = 0; i < allNavLinks.length; i++) {
  allNavLinks[i].addEventListener('click', function () {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  });
}

// Close menu on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    hamburger.focus();
  }
});

// --- 3. SMOOTH SCROLL FOR ANCHOR LINKS ---
var anchorLinks = document.querySelectorAll('a[href^="#"]');
for (var j = 0; j < anchorLinks.length; j++) {
  anchorLinks[j].addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Move focus to target for screen reader announcement
        if (!targetEl.hasAttribute('tabindex')) {
          targetEl.setAttribute('tabindex', '-1');
        }
        targetEl.focus({ preventScroll: true });
      }
    }
  });
}

// --- 4. ACTIVE NAV LINK ON SCROLL ---
var sections = document.querySelectorAll('section[id]');
var navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
  var scrollY = window.scrollY + 100;
  var current = '';
  for (var k = 0; k < sections.length; k++) {
    if (sections[k].offsetTop <= scrollY) {
      current = sections[k].getAttribute('id');
    }
  }
  for (var m = 0; m < navAnchors.length; m++) {
    navAnchors[m].classList.remove('active');
    navAnchors[m].removeAttribute('aria-current');
    if (navAnchors[m].getAttribute('href') === '#' + current) {
      navAnchors[m].classList.add('active');
      navAnchors[m].setAttribute('aria-current', 'true');
    }
  }
});

// --- 5. FADE IN SECTIONS ON SCROLL ---
var fadeEls = document.querySelectorAll('.skill-card, .project-card, .fact-card, .hero-card');

for (var n = 0; n < fadeEls.length; n++) {
  fadeEls[n].style.opacity = '0';
  fadeEls[n].style.transform = 'translateY(20px)';
  fadeEls[n].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
}

function checkFade() {
  for (var p = 0; p < fadeEls.length; p++) {
    var rect = fadeEls[p].getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      fadeEls[p].style.opacity = '1';
      fadeEls[p].style.transform = 'translateY(0)';
    }
  }
}

// Respect reduced motion preference
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  for (var q = 0; q < fadeEls.length; q++) {
    fadeEls[q].style.opacity = '1';
    fadeEls[q].style.transform = 'none';
    fadeEls[q].style.transition = 'none';
  }
} else {
  window.addEventListener('scroll', checkFade);
  window.addEventListener('load', checkFade);
}
