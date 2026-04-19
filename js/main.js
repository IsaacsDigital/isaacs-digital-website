(function () {
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var closeMenu = document.getElementById('closeMenu');
  if (hamburgerBtn) hamburgerBtn.addEventListener('click', function () { mobileMenu.classList.add('open'); });
  if (closeMenu) closeMenu.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
  window.closeMobile = function () { if (mobileMenu) mobileMenu.classList.remove('open'); };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });
}());
