// ============================================
// script.js — Jack Zhang Portfolio
// ============================================

// --- 1. HAMBURGER MENU ---
// Get the hamburger button and nav links
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');

// When the hamburger button is clicked, toggle the 'open' class
hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// Close the menu when a nav link is clicked
var links = navLinks.querySelectorAll('a');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
}


// --- 2. DARK MODE TOGGLE ---
// Get the dark mode button
var darkToggle = document.getElementById('darkToggle');

// When the button is clicked, toggle dark mode on the body
darkToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark');

  // Update the button text depending on which mode is active
  if (document.body.classList.contains('dark')) {
    darkToggle.textContent = 'Light Mode';
  } else {
    darkToggle.textContent = 'Dark Mode';
  }
});


// --- 3. ACTIVE NAV LINK ON SCROLL ---
// Highlight the correct nav link based on which section is visible

// Get all sections that have an id
var sections = document.querySelectorAll('section[id]');
var navAnchors = document.querySelectorAll('.nav-links a');

// Listen for scroll events
window.addEventListener('scroll', function () {
  var scrollPosition = window.scrollY + 100;
  var currentSection = '';

  // Loop through each section and check if we've scrolled to it
  for (var j = 0; j < sections.length; j++) {
    var section = sections[j];
    if (section.offsetTop <= scrollPosition) {
      currentSection = section.getAttribute('id');
    }
  }

  // Add 'active' class to the matching nav link
  for (var k = 0; k < navAnchors.length; k++) {
    navAnchors[k].classList.remove('active');
    if (navAnchors[k].getAttribute('href') === '#' + currentSection) {
      navAnchors[k].classList.add('active');
    }
  }
});


// --- 4. SMOOTH SCROLL FOR ANCHOR LINKS ---
// Make all # links scroll smoothly instead of jumping

var anchorLinks = document.querySelectorAll('a[href^="#"]');

for (var m = 0; m < anchorLinks.length; m++) {
  anchorLinks[m].addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');
    var targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}
