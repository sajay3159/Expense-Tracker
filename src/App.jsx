import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import ProfileForm from "./components/Profile/ProfileForm";
import NotFound from "./components/NotFound";
import ForgetForm from "./components/Auth/ForgetForm";
import ExpensePage from "./pages/ExpensePage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>

        <Route path="/login">
          {isLoggedIn ? <Redirect to="/expense" /> : <LoginForm />}
        </Route>

        <Route path="/signup">
          {isLoggedIn ? <Redirect to="/expense" /> : <SignupForm />}
        </Route>

        <Route path="/forgetForm" component={ForgetForm} />

        <Route path="/profile">
          {isLoggedIn ? <ProfilePage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/profile-form">
          {isLoggedIn ? <ProfileForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/expense">
          {isLoggedIn ? <ExpensePage /> : <Redirect to="/login" />}
        </Route>

        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
