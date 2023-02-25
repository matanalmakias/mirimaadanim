import React, { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CateringContext } from "../../context/CateringContext";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import "./caterings.css";
import RemoveProductButton from "./RemoveProductButton";
const Catering = () => {
  const [showPicture, setShowPicture] = useState(false);
  const { categories, caterings } = useContext(CateringContext);
  const { isManager } = useContext(AuthContext);
  const { addToCart, cart, checkout } = useContext(StoreContext);
  if (!caterings) return;
  const imagesUrl = `http://localhost:3001`;
  const toggleSetShowPicture = () => {
    setShowPicture((state) => !state);
  };

  return (
    <>
      <h1 className="h1 text-center">חבילות קייטרינג</h1>
      <hr />
      {categories.map((category) => (
        <div className="container-fluid" key={category._id}>
          <h2 className="h2 text-center">{category.name}</h2>
          {caterings
            .filter((catering) => catering.category === category._id)
            .map((catering, index) => (
              <div className=" card p-3 text-center" key={catering._id}>
                <Row>
                  <Col className="card p-2">שם פריט:{catering.title}</Col>
                </Row>
                <Row>
                  <Col className="card p-2">מחיר:{catering.price}</Col>
                </Row>
                <Row>
                  <Col className="card p-2">תיאור:{catering.description}</Col>
                </Row>
                <Row>
                  <Col className="card p-2">
                    <Button onClick={toggleSetShowPicture}>
                      {showPicture ? "סגור תמונה" : "פתח תמונה"}
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className={showPicture ? "card p-2" : "hide_class"}>
                    <img
                      src={`${imagesUrl}/${catering.image}`}
                      alt={catering.name}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="card p-2">
                    <Button onClick={() => addToCart(catering)}>
                      הוסף לסל
                    </Button>
                  </Col>
                </Row>
                {isManager && (
                  <Row>
                    <Col className="card p-2">
                      <RemoveProductButton productId={catering._id} />
                    </Col>
                  </Row>
                )}
              </div>
            ))}
        </div>
      ))}

      <hr />
      {/* {cart.length > 0 && (
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
      )} */}
    </>
  );
};

export default Catering;
