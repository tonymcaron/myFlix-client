import React, { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { normalizeMovie } from "../../utils/normalizeMovie";
import { normalizeUser } from "../../utils/normalizeUser";

export const ProfileView = ({ movies }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser);
  const [token] = useState(storedToken);

  const [username, setUsername] = useState(user?.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday || "");

  if (!Array.isArray(movies)) {
    return <div>No movies loaded yet.</div>;
  }

  if (!user) {
    return (
      <p>
        Please log in to view your profile.
      </p>
    )
  }

  const favoriteMovies = movies.filter(m => user.FavoriteMovies?.includes(movies.id)
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      ...(password && { Password: password }),
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://tonys-flix-9de78e076f9d.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${"token"}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        const normalizedUser = normalizeUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        setUser(normalizedUser);
      });
  };

  return (
    <div className="profile-container">
      <Card className="mb-4">
        <Card.Body>
          <h4>{user.username}'s Profile</h4>
          <p>Email: {user.email}</p>
          <p className="mb-0">Birthday (correct this format): {user.birthday}</p>
        </Card.Body>
      </Card>

      <Form className="mb-4" onSubmit={handleSubmit}>
        <h3>Update your info</h3>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            style={{ borderColor: "OrangeRed" }}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            placeholder="Enter a new username"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            style={{ borderColor: "OrangeRed" }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter a new password"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            style={{ borderColor: "OrangeRed" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ex: address@email.com"
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            style={{ borderColor: "OrangeRed" }}
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Save changes
        </Button>
      </Form>

      <div>
        <h3>Your favorite movies list</h3>
        {favoriteMovies.length === 0 ? (
          <p>No movies in your list. <br />
            <Link to="/">Browse movies</Link>
          </p>
        ) : (
          favoriteMovies.map((movies) => (
            <div key={movies.id}>
              <img src={movies.image} alt={movie.title} />
              <Link to={`/movies/${movies.id}`}>
                <h4>{movies.title}</h4>
              </Link>
              <Button
                variant="secondary"
                onClick={() => removeFav(movies.id)}>
                Remove from favorites
              </Button>
            </div>
          ))
        )}
      </div>

    </div>
  );


}