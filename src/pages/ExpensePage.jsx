import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseTable from "../components/Expense/ExpenseTable";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const expenseHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://expense-tracker-414ee-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Something went wrong");
      }
      const data = await response.json();
      const loadedExpenses = Object.entries(data).map(([id, expense]) => ({
        id,
        ...expense,
      }));
      setExpenses(loadedExpenses);
    } catch (err) {
      console.error("something went wrong server side:" + err);
    }
    setLoading(false);
  };

  const onAddExpense = async (newExpense) => {
    try {
      const response = await fetch(
        "https://expense-tracker-414ee-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newExpense),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Failed to add expense");
      }

      await expenseHandler();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    expenseHandler();
  }, []);
  return (
    <Container className="my-4">
      <ExpenseForm onAddExpense={onAddExpense} />
      <ExpenseTable expenses={expenses} loading={loading} />
    </Container>
  );
};

export default ExpensePage;
