import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store.jsx";
import ProfilePage from "./ProfilePage";

global.alert = vi.fn();

describe("ProfilePage button clicks", () => {
  test("clicking 'Verify Email ID' triggers handleVerifyEmail", async () => {
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );

    const verifyBtn = screen.getByText(/Verify Email ID/i);
    fireEvent.click(verifyBtn);

    expect(global.alert).toHaveBeenCalled();
  });
});
