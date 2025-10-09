import { useContext, useRef, useState } from "react";
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Spinner,
  NavLink,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const forgetPasswordHandler = () => {
    history.push("/forgetForm");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const apiKey = "AIzaSyDpWVsvC9evJbXOQnZHUyAxGQIOfLTaZOs";

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("wrong email and password");
        throw new Error(data.error.message || "Something went wrong");
      }

      setSuccess("Login successful!");
      setError("");
      authCtx.login(data.idToken, data.email);
      localStorage.setItem("token", data.idToken);

      history.push("/profile");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    } finally {
      setLoading(false);
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "400px" }}>
      <Card style={{ width: "20rem" }} className="py-3 mb-3">
        <Card.Body>
          <Card.Title className="text-center py-4">Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel label="Email address" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
              />
            </FloatingLabel>

            <FloatingLabel label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </FloatingLabel>
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}

            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                style={{ borderRadius: "20px" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Logging...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <NavLink
                className="text-center text-primary text-decoration-underline"
                onClick={forgetPasswordHandler}
              >
                Forget Password
              </NavLink>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Card
        style={{ width: "20rem", backgroundColor: "#c3dbcf" }}
        className="py-2"
      >
        <Card.Body className="text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "blue",
            }}
          >
            Sign up
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
