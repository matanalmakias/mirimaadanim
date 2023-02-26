import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RemoveProductButton from "../manager/RemoveProductButton";
import cateringService from "../../services/catering.service";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001", {
  withCredentials: true,
});
const ProductItem = ({ product, index }) => {
  const [showPicture, setShowPicture] = useState(false);
  const [res, setRes] = useState();
  const [isProductAlreadyInCart, setIsProductAlreadyInCart] = useState(null);
  const { isManager, isLoggedIn } = useContext(AuthContext);
  const { removeFromCart, addToCart } = useContext(StoreContext);
  const nav = useNavigate();
  const imagesUrl = `http://localhost:3001`;

  useEffect(() => {
    if (isLoggedIn === true) {
      cateringService
        .getSingleProduct(product._id)
        .then((res) => setIsProductAlreadyInCart(res.data.isProductInCart));
    }
  }, [isLoggedIn, product._id]);
  useEffect(() => {
    if (isLoggedIn === true) {
      cateringService
        .getSingleProduct(product._id)
        .then((res) => setIsProductAlreadyInCart(res.data.isProductInCart));
    }
    socket.on("update", () => {
      if (isLoggedIn === true) {
        cateringService
          .getSingleProduct(product._id)
          .then((res) => setIsProductAlreadyInCart(res.data.isProductInCart));
      }
    });
    return () => {
      socket.off("update");
    };
  }, [isLoggedIn, product._id]);
  const toggleSetShowPicture = () => {
    setShowPicture((state) => !state);
  };
  return (
    <div key={index}>
      <div className="card p-3 text-center" key={product._id}>
        <Row>
          <Col className="border ">
            <p className=""> {product.title}</p>
          </Col>

          <Col className="border ">מחיר:{product.price}</Col>
        </Row>
        <Row>
          <Col className="border ">{product.description}</Col>
        </Row>
        <Row>
          <Col className="p-1 ">
            <Button onClick={toggleSetShowPicture}>
              {showPicture ? "סגור תמונה" : "פתח תמונה"}
            </Button>
          </Col>

          <Col className={showPicture ? "card p-2" : "hide_class"}>
            <img src={`${imagesUrl}/${product.image}`} alt={product.name} />
          </Col>
        </Row>
        <Row>
          <Col className="">
            {isProductAlreadyInCart === false ? (
              <Button onClick={() => addToCart(product, product._id, setRes)}>
                הוסף מוצר לסל
              </Button>
            ) : (
              <Button onClick={() => removeFromCart(product._id)}>
                הסר מוצר מהסל
              </Button>
            )}
          </Col>
        </Row>
        {isManager && (
          <>
            <Row className="p-1 mt-1 ">
              <Col className="">
                <Button
                  onClick={() => {
                    nav(`/manager/editProduct/${product._id}`);
                  }}
                  className=""
                >
                  עריכת מוצר
                </Button>
              </Col>
              <Col>
                <RemoveProductButton productId={product._id} />
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
