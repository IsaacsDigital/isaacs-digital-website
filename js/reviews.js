(function () {
  var SUPABASE_URL =  + supabase_url + ;
  var SUPABASE_ANON_KEY =  + anon_key + ;

  function renderStars(rating) {
    var n = Math.round(Math.max(1, Math.min(5, rating || 5)));
    return String.fromCodePoint(0x2605).repeat(n) + String.fromCodePoint(0x2606).repeat(5 - n);
  }

  function getInitials(name) {
    return (name || '?').split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function renderCard(review) {
    var card = document.createElement('div');
    card.className = 'testimonial-card fade-in';

    var stars = document.createElement('div');
    stars.className = 'stars';
    stars.textContent = renderStars(review.rating);

    var text = document.createElement('p');
    text.className = 'testimonial-text';
    text.textContent = String.fromCodePoint(0x201C) + (review.review_text || review.text || review.body || '') + String.fromCodePoint(0x201D);

    var author = document.createElement('div');
    author.className = 'testimonial-author';

    var avatar = document.createElement('div');
    avatar.className = 'author-avatar';
    avatar.textContent = getInitials(review.client_name || review.name || '?');

    var nameWrap = document.createElement('div');
    var nameEl = document.createElement('div');
    nameEl.className = 'author-name';
    nameEl.textContent = review.client_name || review.name || 'Client';
    nameWrap.appendChild(nameEl);

    author.appendChild(avatar);
    author.appendChild(nameWrap);
    card.appendChild(stars);
    card.appendChild(text);
    card.appendChild(author);
    return card;
  }

  fetch(SUPABASE_URL + '/rest/v1/reviews?approved=eq.true&select=*&order=created_at.desc', {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
    }
  })
  .then(function (res) { return res.json(); })
  .then(function (data) {
    if (!Array.isArray(data) || data.length === 0) return;
    var section = document.getElementById('reviews-section');
    var grid = document.getElementById('reviews-grid');
    data.forEach(function (review) { grid.appendChild(renderCard(review)); });
    section.style.display = '';
    var revObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    grid.querySelectorAll('.fade-in').forEach(function (el) { revObserver.observe(el); });
    revObserver.observe(section.querySelector('.section-header'));
  })
  .catch(function () {});
}());
