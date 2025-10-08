import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import Header from "./components/Header";

function App() {
  const Welcome = () => (
    <h2 className="text-center">Welcome to Expense tracker</h2>
  );
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </>
  );
}

export default App;
