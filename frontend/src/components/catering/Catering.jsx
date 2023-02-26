import React, { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CateringContext } from "../../context/CateringContext";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import "./caterings.css";
import RemoveProductButton from "../manager/RemoveProductButton";
import UpdateProduct from "../manager/UpdateProduct";
import { useNavigate } from "react-router-dom";
const Catering = () => {
  const [showPicture, setShowPicture] = useState(false);
  const { isManager } = useContext(AuthContext);
  const { addToCart, cart, checkout } = useContext(StoreContext);
  const nav = useNavigate();
  const imagesUrl = `http://localhost:3001`;
  const toggleSetShowPicture = () => {
    setShowPicture((state) => !state);
  };
  const productList = JSON.parse(localStorage.getItem("caterings"));
  const categoryList = JSON.parse(localStorage.getItem("categories"));

  return (
    <>
      <h1 className="h1 text-center">חבילות קייטרינג</h1>
      <hr />
      {categoryList.map((category) => (
        <div className="container-fluid" key={category._id}>
          <h2 className="h2 text-center">{category.name}</h2>
          {productList
            .filter((catering) => catering.category === category._id)
            .map((catering, index) => (
              <div className="card p-3 text-center" key={catering._id}>
                <Row>
                  <Col className="card p-1">שם פריט:{catering.title}</Col>

                  <Col className="card p-1">מחיר:{catering.price}</Col>
                </Row>
                <Row>
                  <Col className="card p-1">תיאור:{catering.description}</Col>
                </Row>
                <Row>
                  <Col className="p-1 ">
                    <Button onClick={toggleSetShowPicture}>
                      {showPicture ? "סגור תמונה" : "פתח תמונה"}
                    </Button>
                  </Col>

                  <Col className={showPicture ? "card p-2" : "hide_class"}>
                    <img
                      src={`${imagesUrl}/${catering.image}`}
                      alt={catering.name}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="">
                    <Button onClick={() => addToCart(catering, catering._id)}>
                      הוסף לסל
                    </Button>
                  </Col>
                </Row>
                {isManager && (
                  <>
                    <Row className="p-1 mt-1 ">
                      <Col className="">
                        <Button
                          onClick={() => {
                            nav(`/manager/editProduct/${catering._id}`);
                          }}
                          className=""
                        >
                          עריכת מוצר
                        </Button>
                      </Col>
                      <Col>
                        <RemoveProductButton productId={catering._id} />
                      </Col>
                    </Row>
                  </>
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
