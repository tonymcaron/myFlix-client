import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, addFavorite, removeFavorite }) => {
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id === movieId);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div>
      <div className="mb-3">
        <img className="w-100" src={movie.image} />
      </div>
      <div>
        {movie.featured && <h5><strong>FEATURED MOVIE</strong></h5>}
      </div>
      <div>
        <span><strong>Title: </strong></span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span><strong>Description: </strong></span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span><strong>Genre: </strong></span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span><strong>Genre Description: </strong></span>
        <span>{movie.genreDesc}</span>
      </div>
      <div>
        <span><strong>Director: </strong></span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span><strong>Director bio: </strong></span>
        <span>{movie.directorBio}</span>
      </div>
      <div>
        <span><strong>Director Birth Year: </strong></span>
        <span>{movie.directorBirth}</span>
      </div>
      <div>
        <span><strong>Director Death Year: </strong></span>
        <span>{movie.directorDeath}</span>
      </div>
      <Link to="/" className="m-2">
        <Button
          className="back-button"
          variant="link"
          style={{ cursor: "pointer" }}>
          Browse Movies
        </Button>
      </Link>
      <Button className="m-2" variant="primary" onClick={() => addFavorite(movie.id)}>
        Add To Favorites
      </Button>
      <Button className="m-2" variant="secondary" onClick={() => removeFavorite(movie.id)}>
        Remove From Favorites
      </Button>
    </div>
  );
};