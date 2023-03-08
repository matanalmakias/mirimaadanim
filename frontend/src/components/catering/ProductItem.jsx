import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RemoveProductButton from "../manager/RemoveProductButton";
import cateringService from "../../services/catering.service";
import { SocketContext } from "../../context/CateringContext";
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
    <div
      className="d-flex flex-column"
      dir="rtl
  
  
  
  "
    ></div>
  );
};

export default ProductItem;
