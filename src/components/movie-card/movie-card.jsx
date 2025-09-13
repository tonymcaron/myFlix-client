import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, addFavorite, removeFavorite }) => {

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Director: {movie.director}</Card.Text>
        <Link to={`/movies/${movie.id}`}>
          <Button className="m-2" variant="link">View Details</Button>
        </Link>
        <Button className="m-2" variant="primary" onClick={() => addFavorite(movie.id)}>
          Add To Favorites
        </Button>
        <Button className="m-2" variant="secondary" onClick={() => removeFavorite(movie.id)}>
          Remove From Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired,
      death: PropTypes.string
    })
  }).isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};