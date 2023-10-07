
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
const favoriteArray = [];
let currentPage = 1;

main.addEventListener('click', function (e) {
  if (e.target.classList.contains('likeBtn')) {
    const movieId = e.target.dataset.movieId;
    const likedMovie = favoriteArray.find(movie => movie.id == movieId);
    if (likedMovie) {
      // Remove the liked movie from favorites
      const index = favoriteArray.indexOf(likedMovie);
      if (index > -1) {
        favoriteArray.splice(index, 1);
      }
    } else {
      // Find the movie in the displayed list
      const movie = displayedMovies.find(movie => movie.id == movieId);
      if (movie) {
        favoriteArray.push(movie);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(favoriteArray));
  }
});

let displayedMovies = []; // Store the currently displayed movies

function updateAPIURL(page) {
  return `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}&page=${page}`;
}

function getMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      displayedMovies = data.results;
      showMovies(displayedMovies);
    });
}

function getToday() {
  fetch(TRENDING_DAY)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      displayedMovies = data.results;
      showMovies(displayedMovies);
    });
}

function getThisWeek() {
  fetch(TRENDING_WEEK)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      displayedMovies = data.results;
      showMovies(displayedMovies);
    });
}

function nextPage() {
  currentPage++;
  const url = updateAPIURL(currentPage);
  getMovies(url);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    const url = updateAPIURL(currentPage);
    getMovies(url);
  }
}

function showMovies(data) {
  main.innerHTML = '';
  data.forEach((movie) => {
    const { id, title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    const isLiked = favoriteArray.find(favorite => favorite.id === id);
    movieEl.innerHTML = `<img src="${IMG_URL + poster_path}" alt="${title} Poster">
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>Overview</h3>
        ${overview}
        <span class="like"><button class="likeBtn" data-movie-id="${id}">${isLiked ? 'Unlike' : 'Like'}</button></span>
    </div>`;
    main.appendChild(movieEl);
  });
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

// Initial load of movies
getMovies(updateAPIURL(currentPage));

dayBtn.addEventListener('click', getToday);
weekBtn.addEventListener('click', getThisWeek);
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);
























