// ============================================
// script.js — Jack Zhang Portfolio
// ============================================


// --- 1. DARK MODE TOGGLE ---
var darkToggle = document.getElementById('darkToggle');
var toggleIcon = darkToggle.querySelector('.toggle-icon');
var toggleText = darkToggle.querySelector('.toggle-text');

// Check if user previously set dark mode
if (localStorage.getItem('darkMode') === 'on') {
  document.body.classList.add('dark');
  toggleIcon.innerHTML = '&#9788;'; // sun icon
  if (toggleText) toggleText.textContent = 'Light';
}

darkToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark');

  var isDark = document.body.classList.contains('dark');

  if (isDark) {
    toggleIcon.innerHTML = '&#9788;'; // sun
    if (toggleText) toggleText.textContent = 'Light';
    localStorage.setItem('darkMode', 'on');
  } else {
    toggleIcon.innerHTML = '&#9790;'; // moon
    if (toggleText) toggleText.textContent = 'Dark';
    localStorage.setItem('darkMode', 'off');
  }
});


// --- 2. HAMBURGER MENU ---
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
var allNavLinks = navLinks.querySelectorAll('a');
for (var i = 0; i < allNavLinks.length; i++) {
  allNavLinks[i].addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
}


// --- 3. SMOOTH SCROLL FOR ANCHOR LINKS ---
var anchorLinks = document.querySelectorAll('a[href^="#"]');

for (var j = 0; j < anchorLinks.length; j++) {
  anchorLinks[j].addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');

    // Only handle actual section links (not just "#")
    if (targetId.length > 1) {
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    if (navAnchors[m].getAttribute('href') === '#' + current) {
      navAnchors[m].classList.add('active');
    }
  }
});


// --- 5. FADE IN SECTIONS ON SCROLL ---
var fadeEls = document.querySelectorAll('.skill-card, .project-card, .fact-card, .hero-card');

// Add base style for animation
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

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);
