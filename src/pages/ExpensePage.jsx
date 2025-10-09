import { useState } from "react";
import { Container } from "react-bootstrap";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseTable from "../components/Expense/ExpenseTable";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenses((prevState) => {
      return [...prevState, newExpense];
    });
  };
  return (
    <Container className="my-4">
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseTable expenses={expenses} />
    </Container>
  );
};

export default ExpensePage;
