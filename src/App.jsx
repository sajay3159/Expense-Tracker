import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import ProfileForm from "./components/Profile/ProfileForm";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import NotFound from "./components/NotFound";
import ForgetForm from "./components/Auth/ForgetForm";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={SignupForm} />
        {authCtx.isLoggedIn && (
          <>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/profile-form" component={ProfileForm} />
          </>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/profile" render={() => <Redirect to="/login" />} />
        )}
        <Route path="/login" component={LoginForm} />
        <Route path="/ForgetForm" component={ForgetForm} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
