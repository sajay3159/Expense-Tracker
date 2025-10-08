import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ProfileForm from "../components/Profile/ProfileForm";

const ProfilePage = () => {
  const history = useHistory();

  const handleCompleteProfile = () => {
    history.push("/profile-form");
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Welcome to Expense Tracker</h2>

      <div className="d-flex justify-content-between align-items-center">
        <span></span>
        <p className="text-end mb-0">
          Your profile is incomplete.
          <Button variant="link" onClick={handleCompleteProfile}>
            Complete Now
          </Button>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
