$(document).ready(function() {
    const API_KEY = '34e37f5a58e47db00f85928579f900f8';
    const API_URL = 'https://api.themoviedb.org/3/search/movie';
    const DETAILS_URL = 'https://api.themoviedb.org/3/movie/';
  
    $('#search-button').click(function() {
      const query = $('#search-input').val();
      searchMovies(query);
    });
  
    function searchMovies(query) {
      const url = `${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  
      $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {
          displayResults(response.results);
        },
        error: function(error) {
          console.log('Erreur de recherche :', error);
        }
      });
    }
  
    function displayResults(results) {
      const resultsContainer = $('#results');
      resultsContainer.empty();
  
      if (results.length === 0) {
        resultsContainer.append('<p>Aucun résultat trouvé.</p>');
      } else {
        results.forEach(function(movie) {
          const movieElement = $('<div class="movie"></div>');
          movieElement.append(`<h2>${movie.title}</h2>`);
          movieElement.append(`<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" data-id="${movie.id}" data-overview="${movie.overview}" data-release="${movie.release_date}">`);
          resultsContainer.append(movieElement);
        });
  
        $('.movie img').click(function() {
          const title = $(this).attr('alt');
          const overview = $(this).data('overview');
          const releaseDate = $(this).data('release');
          const movieId = $(this).data('id');
          getMovieDetails(movieId, title, overview, releaseDate);
        });
      }
    }
  
    function getMovieDetails(movieId, title, overview, releaseDate) {
      const url = `${DETAILS_URL}${movieId}?api_key=${API_KEY}`;
  
      $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {
          const rating = response.vote_average;
          displayMovieDetails(title, overview, releaseDate, rating);
        },
        error: function(error) {
          console.log('Erreur de récupération des détails du film :', error);
        }
      });
    }
  
    function displayMovieDetails(title, overview, releaseDate, rating) {
      const detailsContainer = $('#details');
      detailsContainer.empty();
      detailsContainer.append(`<h2>${title}</h2>`);
      detailsContainer.append(`<p>${overview}</p>`);
      detailsContainer.append(`<p>Date de sortie : ${releaseDate}</p>`);
      detailsContainer.append(`<p>Note : ${rating}/10</p>`);
    }
  });
  