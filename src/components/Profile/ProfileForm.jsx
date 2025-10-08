import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    photoUrl: "",
  });

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
        alert("wrong email and password");
        throw new Error(data.error.message || "Something went wrong");
      }

      setSuccess("update profile!");
      setError("");
      setFormData({ fullName: "", photoUrl: "" });
      console.log("update profile");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="photoUrl">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter photo URL"
            name="photoUrl"
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
