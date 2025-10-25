import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { themeActions } from "../store/themeSlice";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(themeActions.setLightMode());
    history.replace("/login");
  };
  return (
    <>
      <Navbar
        bg={isDarkMode ? "dark" : "light"}
        variant={isDarkMode ? "dark" : "light"}
      >
        <Container>
          <Navbar.Brand href="#home" className="fs-3">
            MyWebLinks
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="#home"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="#products"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Products
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="#about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Us
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link
                as={NavLink}
                to="/expense"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Expense
              </Nav.Link>
            )}
          </Nav>
          {isLoggedIn && (
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
