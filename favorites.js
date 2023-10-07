const API_KEY = 'api_key=69f72c8a5e68b069f703281b3f8e1151';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'http://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const dayBtn = document.getElementById('dayBtn');
const weekBtn = document.getElementById('weekBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const TRENDING_DAY = BASE_URL + '/trending/movie/day?' + API_KEY;
const TRENDING_WEEK = BASE_URL + '/trending/movie/week?' + API_KEY;
const likeBtn = document.getElementById('likeBtn');


const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to display favorite movies
function showFavoriteMovies() {
  const favoriteMain = document.getElementById('favoriteMain');

  favorites.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `<img src="${IMG_URL + poster_path}" alt="${title} Poster">
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>Overview</h3>
        ${overview}
    </div>`;
    favoriteMain.appendChild(movieEl);
  });
}
showFavoriteMovies();
function getColor(vote) {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 5) {
      return 'orange';
    } else {
      return 'red';
    }
  }
  