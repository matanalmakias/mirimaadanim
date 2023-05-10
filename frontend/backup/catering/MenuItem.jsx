import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ item, index, catering }) => {
  const [showItem, setShowItem] = useState(false);
  const [qty, setQty] = useState();
  const navigate = useNavigate();
  console.log(`item`, item);
  const formSubmit = (e) => {
    e.preventDefault();
    const quantity = e.target.elements.quantity.value;
    if (quantity) {
      navigate(`/catering-menu/${catering._id}/${index}?quantity=${quantity}`);
      setShowItem(false);
    }
  };

  return (
    <div className="col text-center gap-1 d-flex flex-column align-items-center justify-content-center">
      <button
        className="card col btn btn-light"
        onClick={() => setShowItem(!showItem)}
      >
        {item.name}
      </button>
      {showItem && (
        <Form
          className="d-flex gap-1 flex-column justify-content-center align-items-center text-center"
          onSubmit={formSubmit}
        >
          <input
            type="number"
            className="form-control"
            id="quantity"
            onChange={(e) => setQty(e.target.value)}
            placeholder="הכנס כמות סועדים"
            required
          />
          <button type="submit" className="card w-100">
            עבור
          </button>
        </Form>
      )}
    </div>
  );
};

export default MenuItem;
