// Remplacez 'YOUR_API_KEY' par votre propre clé d'API TMDB
const apiKey = '34e37f5a58e47db00f85928579f900f8';

// Récupère les données des dernières sorties de films
fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;

    // Parcourt les films et crée les éléments HTML pour afficher les images
    const movieContainer = document.getElementById('movieContainer');
    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movieCard');

      const movieImage = document.createElement('img');
      movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      movieImage.alt = movie.title;

      movieCard.appendChild(movieImage);
      movieContainer.appendChild(movieCard);
    });
  })
  .catch(error => console.log(error));


// Fonction de recherche de films
function searchMovies(query) {
  // Effectue l'appel à l'API TMDB pour rechercher les films correspondants
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;

      // Efface les films actuellement affichés
      const movieContainer = document.getElementById('movieContainer');
      movieContainer.innerHTML = '';

      // Parcourt les films correspondants et crée les éléments HTML pour afficher les images
      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movieCard');

        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.alt = movie.title;

        movieCard.appendChild(movieImage);
        movieContainer.appendChild(movieCard);
      });
    })
    .catch(error => console.log(error));
}

// Gestionnaire d'événement pour le bouton "Rechercher"
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim();

  if (query !== '') {
    searchMovies(query);
    searchInput.value = '';
  }
});

// Gestionnaire d'événement pour la saisie en temps réel dans la zone de recherche
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', () => {
  const query = searchInput.value.trim();

  if (query !== '') {
    searchMovies(query);
  }
});



