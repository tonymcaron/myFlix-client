import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="primary" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/"><strong>
          <h2>myFlix</h2>
        </strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  <strong>Login</strong>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <strong>Signup</strong>
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  <strong>Movies</strong>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  <strong>Profile</strong>
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  <strong>Logout</strong>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};