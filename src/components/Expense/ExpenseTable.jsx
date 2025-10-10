import { Button, Spinner, Table } from "react-bootstrap";

const ExpenseTable = ({
  expenses,
  loading,
  onDeleteExpense,
  onEditExpense,
}) => {
  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.expense || 0),
    0
  );

  const activatePremiumHandler = () => {
    alert("Premium activated");
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
    <Table striped bordered hover responsive>
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
            <td>
              {exp.expense}{" "}
              {exp.expense > 10000 && (
                <Button
                  variant="warning"
                  className="ms-3"
                  size="sm"
                  style={{ borderRadius: "20px" }}
                  onClick={activatePremiumHandler}
                >
                  Activate Premium
                </Button>
              )}
            </td>
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
              <Button variant="danger" onClick={() => onDeleteExpense(exp.id)}>
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
  );
};

export default ExpenseTable;
