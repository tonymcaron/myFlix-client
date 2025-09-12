export const normalizeMovie = (movie) => ({
  id: movie._id || movie.id,
  title: movie.Title || movie.title,
  image: movie.ImagePath || movie.image,
  description: movie.Description || movie.description,
  genre: movie.Genre?.Name || movie.genre,
  genreDesc: movie.Genre?.Description,
  director: movie.Director?.Name || movie.director,
  directorBio: movie.Director.Bio,
  directorBirth: movie.Director.Birth,
  directorDeath: movie.Director.Death,
  featured: movie.Featured
});