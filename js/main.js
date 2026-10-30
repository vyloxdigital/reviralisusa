'use strict';
/* reviralisusa.vercel.app — main.js */

// ---- Mobile nav toggle ----
(function () {
  var toggle = document.querySelector('.nav-mobile-toggle');
  var nav    = document.querySelector('.mobile-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// ---- FAQ accordion ----
document.querySelectorAll('.faq-q').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    // close all
    document.querySelectorAll('.faq-q').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
      var a = b.nextElementSibling;
      if (a) a.style.maxHeight = '0';
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      var answer = btn.nextElementSibling;
      if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Lazy load images ----
if ('IntersectionObserver' in window) {
  var imgObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('img[data-src]').forEach(function (img) {
    imgObserver.observe(img);
  });
}
