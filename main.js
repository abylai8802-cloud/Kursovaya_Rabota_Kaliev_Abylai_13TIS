let movies = [];

function loadMovies() {
    movies = getMovies();

    if (movies.length === 0) {
        movies = [
            {
                id: Date.now() - 100000,
                title: "Интерстеллар",
                year: 2014,
                genre: "Sci-Fi",
                director: "Кристофер Нолан",
                actors: "Мэттью МакКонахи, Энн Хэтэуэй, Джессика Честейн",
                watched: true,
            },
            {
                id: Date.now() - 50000,
                title: "Дюна: Часть вторая",
                year: 2024,
                genre: "Sci-Fi",
                director: "Дени Вильнёв",
                actors: "Тимоти Шаламе, Зендея, Ребекка Фергюсон",
                watched: false,
            }
        ];
        saveMovies(movies);
    }

    movies = movies.map(movie => ({
        ...movie,
        director: movie.director || '',
        actors: movie.actors || '',
        notes: movie.notes || '',
        poster: movie.poster || null
    }));

    saveMovies(movies);
    renderMovies();
}

function renderMovies() {
    const grid = document.getElementById('movies-grid');
    if (!grid) return;

    grid.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div class="movie-card-content">
                ${movie.poster
                ? `<img src="${movie.poster}" alt="Постер ${movie.title}" class="movie-poster">`
                : `<div class="no-poster">Нет постера</div>`
            }
                <h3>${movie.title}</h3>
                <p>${movie.year} • ${movie.genre}</p>
                <p><strong>Режиссёр:</strong> ${(movie.director || '').trim() || 'Не указан'}</p>
                <p><strong>Актёры:</strong> ${(movie.actors || '').trim() || 'Не указаны'}</p>
                
                <p style="margin-top: 12px; color: #ccc; font-style: italic;">
                    ${(movie.notes || '').trim() || 'Заметок нет'}
                </p>
                
                <div class="status">
                    <input type="checkbox" ${movie.watched ? 'checked' : ''} data-id="${movie.id}">
                    <label>Просмотрено</label>
                </div>
                <button class="delete-btn" data-id="${movie.id}">Удалить</button>
            </div>
        `;
        grid.appendChild(card);
    });

    updateCount();
    addEventListeners();
}

function updateCount() {
    const countEl = document.getElementById('total-count');
    if (countEl) {
        countEl.textContent = movies.length;
    }
}

function addEventListeners() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const id = Number(this.dataset.id);
            const movie = movies.find(m => m.id === id);
            if (movie) {
                movie.watched = this.checked;
                saveMovies(movies);
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Удалить этот фильм из коллекции?')) {
                const id = Number(this.dataset.id);
                movies = movies.filter(m => m.id !== id);
                saveMovies(movies);
                renderMovies();
            }
        });
    });
}

window.onload = loadMovies;