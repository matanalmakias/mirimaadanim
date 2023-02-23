import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Button, Row, Col } from "react-bootstrap";

const Cart = () => {
  const { checkout, cart } = useContext(StoreContext);
  return (
    <>
      {cart.map((item, index) => (
        <Row key={index}>
          <span className="fw-bolder p-2">
            מחיר: {"   "}
            {item.price}
          </span>
          <span className="fw-bolder p-2">
            תיאור: {"   "}
            {item.description}{" "}
          </span>
          <Col>
            <span className="fw-bolder p-2">
              כמות: {"   "}
              {item.quantity}{" "}
            </span>
          </Col>
        </Row>
      ))}
      <Button onClick={checkout}>Checkout</Button>
    </>
  );
};

export default Cart;
