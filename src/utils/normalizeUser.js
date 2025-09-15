// export const normalizeUser = (user) => ({
//   id: user._id || user.id,
//   username: user.Username || user.username,
//   email: user.Email || user.email,
//   birthday: user.Birthday || user.birthday,
//   favoriteMovies: user.FavoriteMovies || user.favoriteMovies || [],
// });

export const normalizeUser = (user) => ({
  username: user.Username,
  email: user.Email,
  birthday: user.Birthday,
  FavoriteMovies: user.FavoriteMovies?.map(id => id.toString()) || []
});