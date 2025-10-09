import { Table } from "react-bootstrap";

const ExpenseTable = ({ expenses }) => {
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
        {expenses.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">
              No expenses added yet.
            </td>
          </tr>
        ) : (
          expenses.map((exp, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{exp.expense}</td>
              <td>{exp.description}</td>
              <td>{exp.category}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ExpenseTable;
