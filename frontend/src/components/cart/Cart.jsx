import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { selfUser } = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(() => {
    setCart(selfUser?.businessMeals);
  }, [selfUser]);

  if (cart === null || cart === undefined) {
    return (
      <div className="bg-dark text-center text-primary ">Loading.......</div>
    );
  } else if (cart?.length === 0) {
    return (
      <div className="bg-dark text-center text-primary ">הסל ריק.....</div>
    );
  }
  return (
    <div className="text-center bg-white shadow w-100">
      <div className="text-center w-100 align-items-center justify-content-center bg-light mt-1 mb-1">
        {cart?.map((item, index) => (
          <div className="" key={index}>
            {index + 1}
            <CartItem item={item} />
          </div>
        ))}
      </div>
      <p className="btn bg-info fs-6 p-2 text-light" onClick={() => nav(-1)}>
        חזור
      </p>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Cart;
