import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const ProfilePage = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const apiKey = "AIzaSyDpWVsvC9evJbXOQnZHUyAxGQIOfLTaZOs";

  // Navigate to complete profile form
  const handleCompleteProfile = () => {
    history.push("/profile-form");
  };

  // Send verification email
  const handleVerifyEmail = async () => {
    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requestType: "VERIFY_EMAIL", idToken: token }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.error?.message || "Verification email failed");
        return;
      }
      alert("Verification email sent. Please check your inbox.");
    } catch (error) {
      alert("Error sending verification email: " + error.message);
    }
  };

  //   after verification refresh the page
  const refreshUserProfile = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: token }),
        }
      );

      const data = await response.json();
      if (response.ok && data.users && data.users.length > 0) {
        const emailVerified = data.users[0].emailVerified;
        authCtx.setEmailVerified(emailVerified);
      } else {
        console.error("Failed to fetch user info", data);
      }
    } catch (error) {
      console.error("Error refreshing profile:", error.message);
    }
  };

  useEffect(() => {
    refreshUserProfile();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Welcome to Expense Tracker</h2>
      <div className="d-flex justify-content-between align-items-center">
        <span></span>
        <div className="text-end">
          {!authCtx.emailVerified ? (
            <>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleVerifyEmail}
                className="me-2"
              >
                Verify Email ID
              </Button>
            </>
          ) : (
            <>
              {authCtx.profileCompleted ? (
                <p className="text-success mb-0">Your Profile is completed.</p>
              ) : (
                <p className="mb-1">
                  Your profile is incomplete.
                  <Button variant="link" onClick={handleCompleteProfile}>
                    Complete Now
                  </Button>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
