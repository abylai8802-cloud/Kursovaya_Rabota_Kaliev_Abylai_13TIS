const STORAGE_KEY = "movieCollection";

function getMovies() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveMovies(movies) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}
