import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./../../context/ProductContext";
import cartService from "../../services/cart.service";
import { toast } from "react-toastify";
import "./cart.css";
import { CateringContext, SocketContext } from "../../context/CateringContext";
import AuthContext from "../../context/AuthContext";
const CartItem = ({ item }) => {
  const { socketUpdate } = useContext(AuthContext);

  const incrementQuantity = async () => {
    await cartService.incQuantity(item.product).then((res) => {
      toast(res.data.message);
      socketUpdate();
    });
  };
  const decrementQuantity = async () => {
    await cartService.decQuantity(item.product).then((res) => {
      toast(res.data.message);
      socketUpdate();
    });
  };
  const removeFromCart = async () => {
    await cartService.removeBusinessMealFromCart(item._id).then((res) => {
      toast(res.data.message);
      socketUpdate();
    });
  };
  return (
    <div className="flex-column my_background w-100 p-1 d-flex rounded shadow border">
      <p className="meat_text shadow mb-1  p-1 shadow rounded mb-1">
        מנה עיקרית:
      </p>
      <p className="p-1 meat_background mb-1  meat_text text-white  rounded">
        {item?.meat}
      </p>
      <p className="meat_text mb-1 shadow p-1 shadow rounded mb-1">תוספת:</p>
      <p className="p-1 meat_background  mb-1 meat_text text-white  rounded">
        {item?.additional}
      </p>
      <p className="meat_text mb-1 shadow p-1 shadow rounded mb-1">סוג לחם:</p>
      <p className="p-1 meat_background  mb-1 meat_text text-white  rounded">
        {item?.bread}
      </p>
      <p className="meat_text mb-1 shadow p-1 shadow rounded mb-1">שתייה:</p>
      <p className="p-1 meat_background meat_text text-white  rounded">
        {item?.drink}
      </p>

      <div className="d-flex gap-1 flex-row p-2">
        <p
          onClick={() => removeFromCart()}
          className="btn w-100 text-light p-1 bg-danger"
        >
          הסר מהסל
        </p>
      </div>
    </div>
  );
};

export default CartItem;
