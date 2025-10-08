import { useRef, useState } from "react";
import { Button, Card, Container, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

const SignupForm = () => {
  const emailRef = useRef();
  const history = useHistory();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const apiKey = "AIzaSyDpWVsvC9evJbXOQnZHUyAxGQIOfLTaZOs";

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
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
        throw new Error(data.error.message || "Something went wrong");
      }

      setSuccess("Signup successful!");
      setError("");
      history.push("/login");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <Container className="my-5" style={{ maxWidth: "400px" }}>
      <Card style={{ width: "20rem" }} className="py-3 mb-3">
        <Card.Body>
          <Card.Title className="text-center py-4">Sign Up</Card.Title>
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

            <FloatingLabel label="Confirm Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
              />
            </FloatingLabel>

            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}

            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                style={{ borderRadius: "20px" }}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card
        style={{ width: "20rem", backgroundColor: "#c3dbcf" }}
        className="py-2"
      >
        <Card.Body className="text-center">Have an account? Login</Card.Body>
      </Card>
    </Container>
  );
};

export default SignupForm;
