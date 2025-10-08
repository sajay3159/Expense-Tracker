import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    photoUrl: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = "AIzaSyDpWVsvC9evJbXOQnZHUyAxGQIOfLTaZOs";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: formData.fullName,
            photoUrl: formData.photoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error?.message || "Failed to update profile");
        setSuccess("");
        return;
      }

      setSuccess("Profile updated successfully!");
      setError("");
      setFormData({ fullName: "", photoUrl: "" });
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
