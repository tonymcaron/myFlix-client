import { React, useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";

export const ProfileView = ({ movies }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser);
  const [token] = useState(storedToken);

  const [username, setUsername] = useState(user?.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday || "01/01/0001");

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

  const favoriteMovies = movies.filter((movie) => user.FavoriteMovies?.includes(movie._id));

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      ...(password && { Password: password }),
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://tonys-flix-9de78e076f9d.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
    ).then((response) => {
      if (response.ok) {
        alert("Profile update successful");
        response.json().then((updatedUser) => {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        });
      } else {
        alert("Profile update failed");
      }
    });
  };

  const removeFav = (movieId) => {
    fetch(`https://tonys-flix-9de78e076f9d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) => {
      if (response.ok) {
        const updatedUser = {
          ...user,
          FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movieId),
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        alert("Failed to remove movie from favorites");
      }
    });
  };

  return (
    <div className="profile-container">
      <Card>
        <Card.Body>
          <h4>{user.Username}'s Profile</h4>
          <p>Email: {user.Email}</p>
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit}>
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
        {favoriteMovies.map((movies) => (
          <div key={movies._id}>
            <img src={movies.ImagePath} alt={movie.Title} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <Button
              variant="secondary"
              onClick={() => removeFav(movies._id)}>
              Remove from favorites
            </Button>
          </div>
        ))}
      </div>

    </div>
  );


}