import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/login");
  };

  return (
    <div className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Button variant="primary" onClick={handleGoBack}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
