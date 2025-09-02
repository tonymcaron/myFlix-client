export const normalizeMovie = (movie) => ({
  id: movie._id || movie.id,
  title: movie.Title || movie.title,
  image: movie.ImagePath || movie.image,
  description: movie.Description || movie.description,
  genre: movie.Genre?.Name || movie.genre,
  director: movie.Director?.Name || movie.director,
});