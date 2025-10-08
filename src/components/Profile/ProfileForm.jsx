import { useContext, useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    photoUrl: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const apiKey = "AIzaSyDpWVsvC9evJbXOQnZHUyAxGQIOfLTaZOs";
  const token = localStorage.getItem("token");

  // ---- Step 1: Fetch user profile on mount ----
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify({ idToken: token }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || "Failed to fetch profile");
        }
        console.log("data", data);
        const user = data.users[0];
        setFormData({
          fullName: user.displayName || "",
          photoUrl: user.photoUrl || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      }
    };

    fetchProfile();
  }, [token]);

  // ---- Step 2: Handle input change ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ---- Step 3: Submit updated profile ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: formData.fullName,
            photoUrl: formData.photoUrl,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to update profile");
      }

      authCtx.markProfileCompleted();

      setSuccess("Profile updated successfully!");
      setError("");
      history.push("/profile");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <Container className="mt-4">
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullName" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="photoUrl" className="mb-3">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control
            type="url"
            name="photoUrl"
            placeholder="Enter photo URL"
            value={formData.photoUrl}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileForm;
