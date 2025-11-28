document.addEventListener('DOMContentLoaded', async () => {
  // Load films for browse page
  if (document.getElementById('filmsGrid')) {
    try {
      const res = await fetch('assets/films.json');
      const films = await res.json();
      const grid = document.getElementById('filmsGrid');
      films.forEach(film => {
        const card = document.createElement('div');
        card.className = 'film-card glass';
        card.innerHTML = `
          <img src="${film.thumbnail}" alt="${film.title}" loading="lazy">
          <div class="info">
            <h3>${film.title}</h3>
            <p>${film.duration} • ${film.country} • ${film.genre}</p>
            <span class="badge ${film.badge}">${film.badge === 'ai' ? 'AI Enhanced' : 'Human Crafted'}</span>
          </div>
        `;
        card.onclick = () => window.location.href = `watch.html?id=${film.id}`;
        grid.appendChild(card);
      });
    } catch (e) {
      console.log('Films loading...');
    }
  }

  // Load film on watch page
  if (window.location.pathname.includes('watch.html')) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      try {
        const res = await fetch('assets/films.json');
        const films = await res.json();
        const film = films.find(f => f.id === id);
        if (film) {
          document.title = `${film.title} - TauFlix`;
          document.querySelector('h1').textContent = film.title;
          const video = document.querySelector('video');
          video.src = film.video;
          video.poster = film.thumbnail;
          document.querySelector('.film-desc').textContent = film.desc;
          document.querySelector('.film-meta').innerHTML = `
            <span>${film.duration}</span> • <span>${film.country}</span> • <span>${film.genre}</span>
          `;
        }
      } catch (e) { }
    }
  }
});