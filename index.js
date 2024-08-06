// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: 'новая задача',
//         completed: false
//     }),
//     headers:{
//         'Content-Type': 'application/json'
//     }
// })
//     .then(response => response.json())
//     .then(json => console.log(json))

// const params = new URLSearchParams(location.search);

// const id = params.get('id');

// console.log(id);

// fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//     .then(response => response.json())
//     .then(json => console.log(json))


// Обработчик событий для кнопки поиска
document.getElementById('search-button').addEventListener('click', function() {
    let query = document.getElementById('search-input').value;
    fetchMovie(query);
});

// Для поиска фильма по названию
function fetchMovie(query) {
    fetch(`https://www.omdbapi.com/?t=${query}&apikey=e2372dbd`)
        .then(response => response.json())
        .then(data => displayMovie(data))
    }

// Функция для отображения информации о фильме
function displayMovie(movie) {
    let movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = ''; // очистка контейнера перед добавлением нового фильма

    let movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.setAttribute('data-id', movie.imdbID);

    movieElement.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div class="movie-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <p>${movie.Genre}</p>
        </div>
    `;

    movieElement.addEventListener('click', function() {
        fetchMovieDetails(movie.imdbID);
    });

    movieContainer.appendChild(movieElement);
    movieElement.style.display = 'block'; // показываем элемент
}

// Функция для получения подробной информации о фильме
function fetchMovieDetails(movieId) {
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=e2372dbd`)
        .then(response => response.json())
        .then(data => displayMovieDetails(data))
    }

//  Функция для отображения подробной информации о фильме
function displayMovieDetails(movie) {
    let movieDetails = document.getElementById('movie-details');
    if (!movieDetails) {
        movieDetails = document.createElement('div');
        movieDetails.id = 'movie-details';

        document.body.appendChild(movieDetails);
    }

    movieDetails.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div>
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Runtime:</strong> ${movie.Runtime}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Country:</strong> ${movie.Country}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
        </div>
        <button id="close-button">Close</button>
    `;

    movieDetails.style.display = 'block';

    document.getElementById('close-button').addEventListener('click', function() {
        movieDetails.style.display = 'none';
    });
}