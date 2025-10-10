import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/themeSlice";
import { Button } from "react-bootstrap";

function ThemeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const toggleHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  return (
    <Button variant={darkMode ? "dark" : "light"} onClick={toggleHandler}>
      {darkMode ? "Dark Mode" : "Light Mode"}
    </Button>
  );
}

export default ThemeToggle;
