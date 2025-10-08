import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import ProfileForm from "./components/Profile/ProfileForm";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={SignupForm} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/profile-form" component={ProfileForm} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </>
  );
}

export default App;
