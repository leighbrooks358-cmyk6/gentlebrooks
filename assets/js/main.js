function showFormLoadFallback() {
  ['booking-form', 'contact-form'].forEach(function (id) {
    var form = document.getElementById(id);
    if (!form || form.querySelector('.form-status')) return;
    var status = document.createElement('p');
    status.className = 'form-status form-note';
    status.setAttribute('role', 'status');
    status.style.color = '#B3261E';
    status.style.fontWeight = '600';
    status.textContent = 'Online submission is temporarily unavailable — please call us at (253) 465-6704 instead.';
    form.appendChild(status);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scroll state
  if (header) {
    var setScrolled = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  // Full-screen mobile nav
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll-reveal
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }
});
