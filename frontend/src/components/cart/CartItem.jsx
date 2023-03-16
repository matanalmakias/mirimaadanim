import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./../../context/ProductContext";
import cartService from "../../services/cart.service";
import { toast } from "react-toastify";
import "./cart.css";
import { CateringContext, SocketContext } from "../../context/CateringContext";
import AuthContext from "../../context/AuthContext";
const CartItem = ({ item }) => {
  const [product, setProduct] = useState(null);
  const { allProducts } = useContext(ProductContext);
  const { socketUpdate } = useContext(AuthContext);
  useEffect(() => {
    setProduct(allProducts?.find((product) => product._id === item.product));
  }, [allProducts, item.product]);
  if (!allProducts) {
    return <div className="bg-dark text-info">Product loading ......</div>;
  }

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
    await cartService.removeFromCart(item.product).then((res) => {
      toast(res.data.message);
      socketUpdate();
    });
  };
  return (
    <div className="flex-column bg-info w-100 p-1 d-flex rounded shadow border">
      <p className="text-white shadow p-1 btn shadow rounded mb-1">שם:</p>
      <p className="p-1 bg-white   text-info  rounded">{product?.title}</p>
      <div className="d-flex flex-row gap-1">
        <p className="text-light shadow w-50 shadow rounded ">כמות:</p>

        <p className="bg-white w-50   text-info  rounded">{item?.quantity}</p>
      </div>
      <div className="d-flex flex-row gap-1">
        <p
          onClick={() => incrementQuantity()}
          className="bg-success w-50 text-white btn plus p-1 "
        >
          +
        </p>
        <p
          onClick={() => decrementQuantity()}
          className="bg-danger w-50 text-white btn minus p-1 "
        >
          -
        </p>
      </div>
      <div className="d-flex flex-row gap-1">
        <p className="text-light shadow w-50 shadow rounded">מחיר:</p>
        <p className="bg-white w-50   text-info  rounded">{item.totalPrice}</p>
      </div>
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
