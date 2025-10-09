import { useRef, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";

const ExpenseForm = ({ onAddExpense }) => {
  const [loading, setLoading] = useState(false);

  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const expenseData = {
      expense: expenseRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };

    onAddExpense(expenseData);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    expenseRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };
  return (
    <Container className="my-5" style={{ maxWidth: "400px" }}>
      <Card style={{ width: "22rem" }} className="py-3">
        <Card.Body>
          <Card.Title className="text-center mb-3">Expense Entry</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Expense</Form.Label>
              <Form.Control
                type="number"
                placeholder="Expense"
                ref={expenseRef}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                ref={descriptionRef}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Select Category"
                ref={categoryRef}
                required
              >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="shopping">Shopping</option>
                <option value="utilities">Utilities</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                style={{ borderRadius: "20px" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Adding...
                  </>
                ) : (
                  "Add Expense"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExpenseForm;
