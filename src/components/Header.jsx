import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../store/auth-context";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function Header() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/login");
  };
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home" className="fs-3">
            MyWebLinks
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/home"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/products"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Products
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Us
            </Nav.Link>
            {authCtx.isLoggedIn && (
              <Nav.Link
                as={NavLink}
                to="/expense"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Expense
              </Nav.Link>
            )}
          </Nav>
          {authCtx.isLoggedIn && (
            <Nav>
              <Button
                variant="outline-danger"
                onClick={logoutHandler}
                className="ms-2"
              >
                Logout
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
