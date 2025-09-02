import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Button, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { normalizeMovie } from "../../utils/normalizeMovie";
import { normalizeUser } from "../../utils/normalizeUser";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://tonys-flix-9de78e076f9d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const normalizedMovies = data.map(normalizeMovie);
        setMovies(normalizedMovies);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, [token]);

  const addFavorite = (movieId) => {
    fetch(
      `https://tonys-flix-9de78e076f9d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
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
          localStorage.setItem("user", JSON.stringify(normalizeduser));
          alert("Movie added to favorites!");
        }
      })
      .catch((err) => console.error("Error adding favorite:", err));
  };

  const removeFavorite = (movieId) => {
    fetch(
      `https://tonys-flix-9de78e076f9d.herokuapp.com/user/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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
      .catch((e) => console.error("Error removing favorite", e));
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
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      const normalizedUser = normalizeUser(user);
                      setUser(normalizedUser);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(normalizedUser));
                    }} />
                  </Col>
                )}
              </>
            }
          />
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
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} addFavorite={addFavorite} removeFavorite={removeFavorite} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
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


// PREVIOUS EXERCISE CODE:
// return (
// <Row className="justify-content-md-center">
// {!user ? (
// <Col md={5}>
//     < LoginView
//   onLoggedIn = {(user, token) => {
//   setUser(user);
//   setToken(token);
// }}
//           />
// or
//   < SignupView />
//         </Col >
//       ) : selectedMovie ? (
//   <Col md={8}>
//     <MovieView
//       movie={selectedMovie}
//       onBackClick={() => setSelectedMovie(null)}
//     />
//   </Col>
// ) : movies.length === 0 ? (
//   <>
//     <Button className="my-4"
//       onClick={() => {
//         setUser(null);
//         setToken(null);
//         localStorage.clear();
//       }}
//     >
//       Logout
//     </Button>
//     <div>The list is empty!</div>
//   </>
// ) : (
//   <>
//     <Button className="my-4"
//       variant="primary"
//       onClick={() => {
//         setUser(null);
//         setToken(null);
//         localStorage.clear();
//       }}
//     >
//       Logout
//     </Button>
//     {movies.map((movie) => (
//       <Col className="mb-4" key={movie.id} md={3}>
//         <MovieCard
//           movie={movie}
//           onMovieClick={(newSelectedMovie) => {
//             setSelectedMovie(newSelectedMovie);
//           }}
//         />
//       </Col>
//     ))}
//   </>
// )}
//     </Row >
//   );
// };




// PREVIOUS EXERCISE CODE:
// //   if (!user) {
// //     return (
// //       <>
// //         <LoginView
// //           onLoggedIn={(user, token) => {
// //             setUser(user);
// //             setToken(token);
// //           }}
// //         />
// //         or
// //         <SignupView />
// //       </>
// //     );
// //   }

// //   if (selectedMovie) {
// //     return (
// //       <MovieView
// //         movie={selectedMovie}
// //         onBackClick={() => setSelectedMovie(null)}
// //       />
// //     );
// //   }

// //   if (movies.length === 0) {
// //     return (
// //       <>
// //         <button
// //           onClick={() => {
// //             setUser(null);
// //             setToken(null);
// //             localStorage.clear();
// //           }}
// //         >
// //           Logout
// //         </button>
// //         <div>The list is empty!</div>;
// //       </>
// //     );
// //   }

// //   return (
// //     <div>
// //       <button
// //         onClick={() => {
// //           setUser(null);
// //           setToken(null);
// //           localStorage.clear();
// //         }}
// //       >
// //         Logout
// //       </button>
// //       {movies.map((movie) => (
// //         <MovieCard
// //           key={movie.id}
// //           movie={movie}
// //           onMovieClick={(newSelectedMovie) => {
// //             setSelectedMovie(newSelectedMovie);
// //           }}
// //         />
// //       ))}
// //     </div>
// //   );
// // };