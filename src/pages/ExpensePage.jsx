import { useEffect, useState } from "react";
import { Container, Toast } from "react-bootstrap";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseTable from "../components/Expense/ExpenseTable";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [loading, setLoading] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch expense list
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

  // Add expense in a list
  const onAddExpense = async (newExpense) => {
    try {
      let url =
        "https://expense-tracker-414ee-default-rtdb.firebaseio.com/expenses.json";
      let method = "POST";

      if (editingExpense?.id) {
        url = `https://expense-tracker-414ee-default-rtdb.firebaseio.com/expenses/${editingExpense.id}.json`;
        method = "PUT";
      }
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to add expense");
      }
      setToast({
        show: true,
        message: editingExpense
          ? "Expense updated successfully"
          : "Expense added successfully",
        variant: "success",
      });
      await expenseHandler();
      setEditingExpense(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Edit an expense
  const editExpenseHandler = async (id) => {
    const editing = expenses.find((item) => item.id === id);
    if (editing) {
      setEditingExpense(editing);
    }
  };

  // Delete an expense from list
  const deleteExpenseHandler = async (id) => {
    try {
      const response = await fetch(
        `https://expense-tracker-414ee-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
      //   console.log("Expense deleted successfully");
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
      setToast({
        show: true,
        message: "Expense deleted successfully",
        variant: "danger",
      });
    } catch (err) {
      console.error("Error deleting expense:", err.message);
    }
  };

  useEffect(() => {
    expenseHandler();
  }, []);
  return (
    <Container className="my-4">
      <ExpenseForm
        onAddExpense={onAddExpense}
        editingExpense={editingExpense}
      />
      <ExpenseTable
        expenses={expenses}
        loading={loading}
        onDeleteExpense={deleteExpenseHandler}
        onEditExpense={editExpenseHandler}
      />
      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        delay={4000}
        autohide
        bg={toast.variant}
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default ExpensePage;
