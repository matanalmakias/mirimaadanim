import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import cartService from "../../../services/cart.service";
import { toast } from "react-toastify";
import { ProductContext } from "./../../../context/ProductContext";
import AuthContext from "./../../../context/AuthContext";
import { isProductInCart } from "../../../services/catering.service";
import { useNavigate } from "react-router-dom";
const ProductItem = ({ product }) => {
  const [isProductInCartState, setIsProductInCartState] = useState();
  const { socketUpdate } = useContext(AuthContext);
  const { selfUser } = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(() => {
    // update isProductInCartState
    isProductInCart()
      ? setIsProductInCartState(true)
      : setIsProductInCartState(false);
    //-------------------------
  }, [selfUser, product._id]);
  const isProductInCart = () => {
    const cart = selfUser?.cart;
    const result = cart?.some((cartItem) => cartItem.product === product._id);
    return result;
  };
  const removeFromCart = async () => {
    await cartService.removeFromCart(product._id).then((res) => {
      toast(res.data.message);
      setIsProductInCartState(false);
      socketUpdate();
    });
  };
  const addToCart = async () => {
    await cartService.addToCart(product._id).then((res) => {
      toast(res.data.message);
      setIsProductInCartState(true);
      socketUpdate();
    });
  };

  return (
    <div className="d-flex flex-column shadow gap-1">
      <p className="my_text mb-1 mt-1">קטגוריה:{product.category}</p>
      <p className="mb-1 bg-dark text-light">שם</p>
      <span className="shadow bg-light p-1 mb-1 text-primary  rounded product-title">
        {product.title}
      </span>
      <p className="mb-1 bg-dark text-light">מחיר</p>
      <span className="shadow  bg-light p-1 text-primary  rounded product-title">
        {product.price}
      </span>
      {product?.additional?.length > 0 && (
        <p className="btn p-1 ">
          ישנם תוספות במוצר זה, הוסף ועבור לסל כדי להשתמש
        </p>
      )}

      {isProductInCartState === true ? (
        <>
          <div className="d-flex flex-row gap-1">
            <p
              className=" width_33 addToCart btn mt-1 p-1 bg-danger text-white shadow"
              onClick={() => removeFromCart()}
            >
              <i class="p-1 ri-shopping-cart-2-line"></i>
              מחק מהסל
            </p>
            <p
              className=" width_33 addToCart btn mt-1 p-1 bg-success  text-white shadow"
              onClick={() => nav("/user/cart")}
            >
              <i class="p-1 ri-shopping-cart-2-line"></i>
              עבור לסל
            </p>
            <p
              className=" width_33 addToCart btn mt-1 p-1 bg-info  text-white shadow"
              onClick={() => nav(`/product/${product._id}`)}
            >
              <i class="p-1 ri-shopping-cart-2-line"></i>
              לפרטים
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex flex-row gap-1">
            <p
              className="addToCart width_50 btn mt-1 p-1 bg-success text-white shadow"
              onClick={() => addToCart()}
            >
              <i class="p-1 ri-shopping-cart-2-line"></i>
              הוסף לסל
            </p>
            <p
              className="addToCart width_50 btn w-33 mt-1 p-1 bg-info text-white shadow"
              onClick={() => nav(`/product/${product._id}`)}
            >
              <i class="p-1 ri-shopping-cart-2-line"></i>
              לפרטים
            </p>
          </div>
        </>
      )}

      <hr />
    </div>
  );
};

export default ProductItem;
