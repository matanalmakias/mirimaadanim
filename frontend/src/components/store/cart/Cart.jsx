import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import { Row, Col, Button } from "react-bootstrap";
import "./cart.css";
import CartItem from "./CartItem";
import OrderPackage from "../order/OrderPackage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../context/CateringContext";
import OrderItem from "../order/OrderItem";
const Cart = () => {
  const [cartState, setCartState] = useState();
  const [orderPackageData, setOrderPackageData] = useState(null);
  const [showOrder, setShowOrder] = useState(false);
  const nav = useNavigate();
  const socket = useContext(SocketContext);
  useEffect(() => {
  }, [orderPackageData]);
  const submitOrderPackage = async () => {
    await axios
      .post(
        "http://localhost:3001/api/cart/createOrderPackage",
        {},
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        setOrderPackageData(res.data);
      })
      .finally(() => {
        setShowOrder(true);
      });
    socket.emit("update");
  };

  const { cart } = useContext(StoreContext);

  // if (orderPackageData !== null) {
  //   nav(`/order/${orderPackageData.order._id}`);
  // }

  if (cart === undefined || !cart) return;
  return (
    <>
      {cart.length > 0 && (
        <div className="text-center">
          <h1 className="h1">סל הקניות</h1>
          <hr />
          {cart.map((item, index) => (
            <CartItem item={item} index={index} />
          ))}
          <hr />
          <Button
            className="w-100"
            onClick={() => {
              submitOrderPackage();
            }}
          >
            Checkout
          </Button>
        </div>
      )}
      <div className={showOrder ? "" : "hide_class"}>
        <OrderItem data={orderPackageData} />
      </div>
    </>
  );
};

export default Cart;
