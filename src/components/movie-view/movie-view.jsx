import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
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
        <span><strong>Title: </strong></span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span><strong>Description: </strong></span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span><strong>Genre: </strong></span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span><strong>Director: </strong></span>
        <span>{movie.director.name}</span>
      </div>
      <Link to="/">
        <button
          className="back-button"
          style={{ cursor: "pointer" }}>
          Back
        </button>
      </Link>
    </div>
  );
};