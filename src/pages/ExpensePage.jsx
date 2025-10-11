import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Toast } from "react-bootstrap";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseTable from "../components/Expense/ExpenseTable";
import { expensesActions } from "../store/expensesSlice";

const ExpensePage = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const userId = useSelector((state) => state.auth.uid);
  const idToken = useSelector((state) => state.auth.token);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [loading, setLoading] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch expense list
  const expenseHandler = async () => {
    if (!userId || !idToken) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://expense-tracker-414ee-default-rtdb.firebaseio.com/users/${userId}/expenses.json?auth=${idToken}`
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Something went wrong");
      }
      const data = await response.json();

      // data into array format
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

  // Add or update expense for authenticated user
  const addExpenseHandler = async (newExpense) => {
    if (!userId || !idToken) return;

    setLoading(true);
    try {
      let url = `https://expense-tracker-414ee-default-rtdb.firebaseio.com/users/${userId}/expenses.json?auth=${idToken}`;
      let method = "POST";

      if (editingExpense?.id) {
        url = `https://expense-tracker-414ee-default-rtdb.firebaseio.com/users/${userId}/expenses/${editingExpense.id}.json?auth=${idToken}`;
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

  // Edit an expense locally
  const editExpenseHandler = (id) => {
    const editing = expenses.find((item) => item.id === id);
    if (editing) {
      setEditingExpense(editing);
    }
  };

  // Delete an expense
  const deleteExpenseHandler = async (id) => {
    if (!userId || !idToken) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://expense-tracker-414ee-default-rtdb.firebaseio.com/users/${userId}/expenses/${id}.json?auth=${idToken}`,
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
  }, [userId, idToken]);

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
