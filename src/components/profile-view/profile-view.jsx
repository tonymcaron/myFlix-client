import { useState } from "react";
import { Button, Form, Card, Row, Col, Figure } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { normalizeUser } from "../../utils/normalizeUser";

import "./profile-view.scss";

export const ProfileView = ({ movies, removeFavorite, onLoggedOut }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser);
  const [token] = useState(storedToken);

  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");
  const navigate = useNavigate();

  if (!Array.isArray(movies)) {
    return <div>No movies loaded yet.</div>;
  }

  if (!user) {
    return (
      <>
        <h4>
          Please <Link as={Link} to="/login">
            <strong>log in</strong>
          </Link> or <Link as={Link} to="/signup">
            <strong>create a profile</strong></Link>
        </h4>
      </>
    )
  }

  const favoriteMovies = movies.filter(m => user.FavoriteMovies?.includes(m.id)
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        const normalizedUser = normalizeUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        setUser(normalizedUser);
        window.location.reload();
      });
  };

  const deleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?  This action cannot be undone.")) {
      const token = localStorage.getItem("token");

      fetch(`https://tonys-flix-9de78e076f9d.herokuapp.com/users/${user.username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong.  Failed to delete account");
          }
          if (response.status === 204) {
            return null;
          }
          return response.text();
        })
        .then(() => {
          alert("Account deleted");
          onLoggedOut();
          navigate("/signup");
        })
        .catch((err) => console.error("Error deleting account:", err));
    }

  };

  return (
    <>
      <Row className="profile-container">
        <Card>
          <Card.Body>
            <h4>{user.username}'s Profile</h4>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Birthday</strong>: {new Date(user.birthday).toUTCString()}
            </p>
            <Button variant="danger"
              onClick={deleteAccount}>
              DELETE ACCOUNT
            </Button>
          </Card.Body>
        </Card>
      </Row>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h5><strong>Update Your Info</strong></h5>
            <p>All fields required.  Reenter current info to keep the same</p>

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
              Save Changes
            </Button>
          </Form >
        </Card.Body>
      </Card>



      <Card>
        <Card.Body>
          <Row>
            <h5><strong>Your Favorite Movies List</strong></h5>
            <Link to="/" className="mb-2">
              Browse movies
            </Link>
            {favoriteMovies.length === 0 ? (
              <Col>
                <p>
                  No movies in your list. <br />
                </p>
              </Col>
            ) : (
              // favoriteMovies.length > 0 ? (
              favoriteMovies.map((movie) => (
                <Col key={movie.id} className="mb-3, fav-movie" xs={12} sm={6} lg={3}>
                  <Figure>
                    <Link to={`/movies/${movie.id}`}>
                      <Figure.Image
                        src={movie.image}
                        alt={movie.title}
                      />
                      <Figure.Caption>
                        {movie.title}
                      </Figure.Caption>
                    </Link>
                  </Figure>
                  <Button
                    variant="secondary"
                    onClick={() => removeFavorite(movie.id)}
                  >
                    Remove From Favorites
                  </Button>
                </Col>
              ))
            )}
          </Row >
        </Card.Body>
      </Card>
    </>
  );
};