import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const ProfilePage = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const handleCompleteProfile = () => {
    history.push("/profile-form");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Welcome to Expense Tracker</h2>

      <div className="d-flex justify-content-between align-items-center">
        <span></span>
        {authCtx.profileCompleted ? (
          <p className="text-success mb-0">Your Profile is completed.</p>
        ) : (
          <p className="text-end mb-0">
            Your profile is incomplete.
            <Button variant="link" onClick={handleCompleteProfile}>
              Complete Now
            </Button>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
