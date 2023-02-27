import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Row, Col, Button } from "react-bootstrap";
import "./cart.css";
import CartItem from "./CartItem";
import OrderPackage from "./OrderPackage";
const Cart = () => {
  const [cartState, setCartState] = useState();
  const [orderPackageData, setOrderPackageData] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const { checkout } = useContext(StoreContext);

  const { cart } = useContext(StoreContext);

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
              checkout(setOrderPackageData);
              setShowOrder(true);
            }}
          >
            Checkout
          </Button>
          <div className={showOrder ? "" : "hide_class"}>
            <OrderPackage data={orderPackageData} />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
