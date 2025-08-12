import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: '687e7c959tc7839eeeec4ad',
      title: "Knocked Up",
      description: "A one-night stand results in an unexpected pregnancy for a slacker and an up-and-coming media personality.",
      genre: "Comedy",
      director: "Judd Apatow",
      imagePath: "https://upload.wikimedia.org/wikipedia/en/5/51/Knockedupmp.jpg"
    },
    {
      id: '687ac9fde77f2b47adeec4a9',
      title: "Silence of the Lambs",
      description: "A young FBI cadet must recieve the help of an incarcerated and manipulative cannibal killer in order to catch another serial killer.",
      genre: "Thriller",
      director: "Jonathan Demme",
      imagePath: "https://i.postimg.cc/TYsF28dT/The-Silence-of-the-Lambs-poster.jpg"
    },
    {
      id: '687e7c8995fc7839eeeec4ac',
      title: "Rachel Getting Married",
      description: "A young woman is released from rehab to attend her sister’s wedding and brings chaos with her.",
      genre: "Drama",
      director: "Jonathan Demme",
      imagePath: "https://upload.wikimedia.org/wikipedia/en/a/ae/Rachel_getting_married.jpg"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  )
}