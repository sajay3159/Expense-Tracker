import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Toast } from "react-bootstrap";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseTable from "../components/Expense/ExpenseTable";
import { expensesActions } from "../store/expensesSlice";

const ExpensePage = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);

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
      const loadedExpenses = Object.entries(data || {}).map(
        ([id, expense]) => ({
          id,
          ...expense,
        })
      );
      dispatch(expensesActions.setExpenses(loadedExpenses));
    } catch (err) {
      console.error("Server error:", err);
    }
    setLoading(false);
  };

  // Add expense in a list
  const addExpenseHandler = async (newExpense) => {
    setLoading(true);
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

      if (editingExpense?.id) {
        dispatch(
          expensesActions.updateExpense({
            id: editingExpense.id,
            ...newExpense,
          })
        );
      } else {
        const newItem = { id: data.name, ...newExpense };
        dispatch(expensesActions.addExpense(newItem));
      }

      setEditingExpense(null);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
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
    setLoading(true);
    try {
      const response = await fetch(
        `https://expense-tracker-414ee-default-rtdb.firebaseio.com/expenses/${id}.json`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete expense");

      dispatch(expensesActions.deleteExpense(id));

      setToast({
        show: true,
        message: "Expense deleted successfully",
        variant: "danger",
      });
    } catch (err) {
      console.error("Delete error:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    expenseHandler();
  }, []);

  return (
    <Container className="my-4">
      <ExpenseForm
        onAddExpense={addExpenseHandler}
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
