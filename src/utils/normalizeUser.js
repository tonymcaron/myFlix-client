export const normalizeUser = (user) => ({
  id: user._id || user.id,
  username: user.Username || user.username,
  email: user.Email || user.email,
  birthday: user.Birthday || user.birthday,
  favoriteMovies: user.FavoriteMovies || user.favoriteMovies || [],
});