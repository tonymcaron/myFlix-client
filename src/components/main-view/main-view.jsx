import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { normalizeMovie } from "../../utils/normalizeMovie";
import { normalizeUser } from "../../utils/normalizeUser";

const normalizeMovie = (movie) => ({
  id: movie._id,
  title: movie.Title,
  description: movie.Description,
  genre: {
    name: movie.Genre?.Name,
    description: movie.Genre?.Description
  },
  director: {
    name: movie.Director?.Name,
    bio: movie.Director?.Bio,
    birth: movie.Director?.Birth,
    death: movie.Director?.Death
  },
  image: movie.ImagePath
});

const normalizeUser = (user) => ({
  username: user.Username,
  email: user.Email,
  birthday: user.Birthday,
  FavoriteMovies: user.FavoriteMovies?.map((id) => id.toString()) || []
});

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered with token:", token);

    if (!token) return;

    fetch("https://tonys-flix-9de78e076f9d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Raw movies from API:", data);
        const moviesFromApi = data.map(normalizeMovie);
        console.log("Normalized movies:", moviesFromApi);
        setMovies(moviesFromApi);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, [token]);

  const addFavorite = (movieId) => {
    fetch(
      `https://tonys-flix-9de78e076f9d.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser) {
          const normalizedUser = normalizeUser(updatedUser);
          setUser(normalizedUser);
          localStorage.setItem("user", JSON.stringify(normalizedUser));
          alert("Movie added to favorites!");
        }
      })
      .catch((err) => console.error("Error adding favorite:", err));
  };

  const removeFavorite = (movieId) => {
    fetch(
      `https://tonys-flix-9de78e076f9d.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser) {
          const normalizedUser = normalizeUser(updatedUser);
          setUser(normalizedUser);
          localStorage.setItem("user", JSON.stringify(normalizedUser));
          alert("Movie removed from favorites!");
        }
      })
      .catch((err) => console.error("Error removing favorite:", err));
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null)
          setToken(null)
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          {/* signup */}
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          {/* login */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      const normalizedUser = normalizeUser(user);
                      setUser(normalizedUser);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(normalizedUser));
                      localStorage.setItem("token", token);
                    }}
                    />
                  </Col>
                )}
              </>
            }
          />
          {/* single movie view */}
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} addFavorite={addFavorite} removeFavorite={removeFavorite} />
                  </Col>
                )}
              </>
            }
          />
          {/* all movies */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} xs={12} sm={6} md={3}>
                        <MovieCard movie={movie} addFavorite={addFavorite} removeFavorite={removeFavorite} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          {/* profile */}
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView user={user} movies={movies} removeFavorite={removeFavorite} />
                </Col>
              )
            }
          />
        </Routes>
      </Row >
    </BrowserRouter >
  );
};
