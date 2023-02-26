import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Row, Col, Button } from "react-bootstrap";

const Cart = () => {
  const { checkout } = useContext(StoreContext);
  const cart = JSON.parse(localStorage.getItem("cart"));
  return (
    <>
      {cart.length > 0 && (
        <div className="text-center">
          <h1 className="h1">סל הקניות</h1>
          <hr />
          {cart.map((item, index) => (
            <Row className="flex-row-reverse" key={index}>
              <Col className="d-flex justify-content-center ">
                שם פריט
                <br />
                {item.title}
              </Col>
              <Col className="d-flex justify-content-center">
                כמות <br />
                {item.quantity}
              </Col>
              <Col className="d-flex justify-content-center">
                כמות <br />
                {item.quantity}
              </Col>
            </Row>
          ))}
          <hr />
          <Button className="w-100" onClick={checkout}>
            Checkout
          </Button>
        </div>
      )}
    </>
  );
};

export default Cart;
