import { render, screen } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";
import { Provider } from "react-redux";
import store from "../../store/store.jsx";

test("renders Expense Entry title", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText(/expense entry/i)).toBeInTheDocument();
});

test("renders Expense label", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText("Expense")).toBeInTheDocument();
});

test("renders Description label", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText("Description")).toBeInTheDocument();
});

test("renders Category label", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText("Category")).toBeInTheDocument();
});

test("renders Add Expense button", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText("Add Expense")).toBeInTheDocument();
});

test("renders Select Category option", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText("Select Category")).toBeInTheDocument();
});

test("renders Food option", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText("Food")).toBeInTheDocument();
});

test("renders Transport option", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText("Transport")).toBeInTheDocument();
});

test("renders Shopping option", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText("Shopping")).toBeInTheDocument();
});

test("renders Utilities option", () => {
  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  expect(screen.getByText("Utilities")).toBeInTheDocument();
});
