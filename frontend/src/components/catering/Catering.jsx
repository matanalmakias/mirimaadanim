import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CateringContext } from "../../context/CateringContext";
import { StoreContext } from "../../context/StoreContext";
const categories = [
  "סלטים",
  "בשרים",
  "שתייה",
  "לחם",
  "דגים",
  "עופות",
  "על האש",
  "צמחוני",
  "טבעוני",
  "פשטידות",
  "מטוגנים",
  "תוספות",
];
const Catering = () => {
  const { caterings } = useContext(CateringContext);
  const { addToCart, cart, checkout } = useContext(StoreContext);

  if (!caterings) return;
  console.log(cart);
  return (
    <>
      <h1 className="h1 text-center">חבילות קייטרינג </h1>
      <hr />
      {categories.map((category) => (
        <div className="m-2 container" key={category}>
          <h2>{category}</h2>
          {caterings
            .filter((catering) => catering.category === category)
            .map((catering) => (
              <div key={catering._id}>
                {catering.ingredients.map((item, index) => (
                  <Row key={index}>
                    <Col>מחיר:{item.price}</Col>
                    <Col>תיאור:{item.description}</Col>
                    <Col>פריט:{item.name}</Col>
                    <Col>
                      <Button onClick={() => addToCart(item)}>הוסף לסל</Button>
                    </Col>
                  </Row>
                ))}
              </div>
            ))}
        </div>
      ))}

      <hr />
      {cart.length > 0 && (
        <div className="container">
          <h4 className="text-center">סל קניות:</h4>

          {cart.map((item, index) => (
            <Row className="m-3" key={index}>
              <Col>מחיר: {item.price}</Col>
              <Col>פריט: {item.name}</Col>
            </Row>
          ))}
          <Button onClick={checkout}>השלם הזמנה</Button>
        </div>
      )}
    </>
  );
};

export default Catering;
