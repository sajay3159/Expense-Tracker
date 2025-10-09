import { Spinner, Table } from "react-bootstrap";

const ExpenseTable = ({ expenses, loading }) => {
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
          <th>Amount (₹)</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp, idx) => (
          <tr key={exp.id}>
            <td>{idx + 1}</td>
            <td>{exp.expense}</td>
            <td>{exp.description}</td>
            <td>{exp.category}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpenseTable;
