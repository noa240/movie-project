const API_KEY = 'api_key=69f72c8a5e68b069f703281b3f8e1151';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'http://image.tmdb.org/t/p/w500';
const singleMovieUrl = BASE_URL + '/movie/';
const searchById = document.getElementById('searchMovie');
const movieIdInput = document.getElementById('movieId');
const main = document.getElementById('main');

searchById.addEventListener('submit', (e) => {
    e.preventDefault();
  const movieId = movieIdInput.value;
  if (movieId) {
    getMovieById(movieId);
  }
});
function getMovieById(id) {
  const url = `${singleMovieUrl}${id}?${API_KEY}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        showSingleMovie(data);
        movieIdInput.value = id;
      } else {
        alert('Movie not found');
      }
    })
    .catch(err => console.error(err));
}

function showSingleMovie(movie) {
  main.innerHTML = '';
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
  main.appendChild(movieEl);
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}


