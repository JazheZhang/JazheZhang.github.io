// ============================================
// main.js — Jack Zhang Portfolio
// ============================================

// --- 1. DARK MODE TOGGLE ---
var darkToggle = document.getElementById('darkToggle');

// Remember dark mode preference using localStorage
if (localStorage.getItem('darkMode') === 'on') {
  document.body.classList.add('dark');
  if (darkToggle) darkToggle.textContent = '☀️ Light';
}

if (darkToggle) {
  darkToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    var isDark = document.body.classList.contains('dark');
    darkToggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    localStorage.setItem('darkMode', isDark ? 'on' : 'off');
  });
}


// --- 2. HAMBURGER MENU ---
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  var links = navLinks.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  }
}


// --- 3. SMOOTH SCROLL ---
var anchorLinks = document.querySelectorAll('a[href^="#"]');
for (var j = 0; j < anchorLinks.length; j++) {
  anchorLinks[j].addEventListener('click', function (e) {
    var target = this.getAttribute('href');
    if (target.length > 1) {
      var el = document.querySelector(target);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}


// --- 4. ACTIVE NAV LINK ---
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


// --- 5. CONTACT FORM FEEDBACK ---
var contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#16a34a';
    btn.style.borderColor = '#16a34a';
    setTimeout(function () {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.borderColor = '';
      contactForm.reset();
    }, 3000);
  });
}
