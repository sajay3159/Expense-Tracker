import { Button, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/themeSlice";

const ExpenseTable = ({
  expenses,
  loading,
  onDeleteExpense,
  onEditExpense,
}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.expense || 0),
    0
  );

  const downloadCSV = () => {
    if (!expenses.length) return;

    const headers = ["S.No", "Expense", "Description", "Category"];

    // CSV rows
    const rows = expenses.map((exp, idx) => [
      idx + 1,
      exp.expense,
      exp.description,
      exp.category,
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Expense_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activatePremiumHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (expenses.length === 0) {
    return <p className="text-center">No expenses added yet.</p>;
  }

  return (
    <>
      <div className="text-end">
        <Button
          variant="success"
          className="rounded-pill px-4 mb-3 shadow-sm"
          onClick={downloadCSV}
        >
          Download Report
        </Button>
      </div>
      <Table
        striped
        bordered
        hover
        responsive
        className={isDarkMode ? "table-dark" : "table-light"}
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Expense (₹)</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, idx) => (
            <tr key={exp.id}>
              <td>{idx + 1}</td>
              <td>{exp.expense}</td>
              <td>{exp.description}</td>
              <td>{exp.category}</td>
              <td>
                <Button
                  variant="info"
                  className="me-3"
                  onClick={() => onEditExpense(exp.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDeleteExpense(exp.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-end fw-bold">
              Total Spent: ₹{totalExpense}
            </td>
          </tr>
        </tbody>
      </Table>
      {totalExpense > 10000 && (
        <div className="text-end">
          <Button
            variant="warning"
            className="rounded-pill px-4 py-2 shadow-sm"
            onClick={activatePremiumHandler}
          >
            Activate Premium
          </Button>
        </div>
      )}
    </>
  );
};

export default ExpenseTable;
