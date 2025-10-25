import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/store.jsx";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";

test("Login button exists and can be clicked", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </Provider>
  );

  const loginBtn = screen.getByRole("button", { name: "Login" });
  expect(loginBtn).toBeInTheDocument();

  fireEvent.click(loginBtn); //click test
});
