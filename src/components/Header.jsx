import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Products</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
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
