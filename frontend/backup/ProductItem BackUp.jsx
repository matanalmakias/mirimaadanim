import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { StoreContext } from "../src/context/StoreContext";
import AuthContext from "../src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import RemoveProductButton from "../src/components/manager/RemoveProductButton";
import cateringService from "../src/services/catering.service";
import { SocketContext } from "../src/context/CateringContext";
const ProductItem = ({ product, index }) => {
  const [showPicture, setShowPicture] = useState(false);
  const [res, setRes] = useState();
  const [isProductAlreadyInCart, setIsProductAlreadyInCart] = useState(null);
  const { isManager, isLoggedIn } = useContext(AuthContext);
  const { removeFromCart, addToCart } = useContext(StoreContext);
  const socket = useContext(SocketContext);

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
  }, [isLoggedIn, product._id, socket]);
  const toggleSetShowPicture = () => {
    setShowPicture((state) => !state);
  };
  return (
    <div className="d-flex flex-column" key={index}>
      <div dir="rtl" className="border p-3 text-center" key={product._id}>
        <div className="product-row row">
          <div className="border col ">
            <p className=""> {product.title}</p>
          </div>

          <div className="border col">מחיר:{product.price}</div>
        </div>
        <div className="row product-row">
          <Col className="border ">{product.description}</Col>
        </div>
        <div className="d-flex row flex-row">
          {imagesUrl !== `http://localhost:3001` && (
            <>
              <div className="col p-1">
                <Button onClick={toggleSetShowPicture}>
                  {showPicture ? "סגור תמונה" : "פתח תמונה"}
                </Button>
              </div>

              <div className={showPicture ? "col border p-2" : "hide_class"}>
                <img src={`${imagesUrl}/${product.image}`} alt={product.name} />
              </div>
            </>
          )}
          <div className="col">
            {isProductAlreadyInCart === false ? (
              <Button
                className="my_btn"
                onClick={() => addToCart(product, product._id, setRes)}
              >
                הוסף מוצר לסל
              </Button>
            ) : (
              <Button
                className="my_btn"
                onClick={() => removeFromCart(product._id)}
              >
                הסר מוצר מהסל
              </Button>
            )}
          </div>
        </div>
        {isManager && (
          <>
            <div className="p-1 row mt-1 ">
              <div className="col">
                <Button
                  onClick={() => {
                    nav(`/manager/editProduct/${product._id}`);
                  }}
                  className=""
                >
                  עריכת מוצר
                </Button>
              </div>
              <div className="col">
                <RemoveProductButton productId={product._id} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
