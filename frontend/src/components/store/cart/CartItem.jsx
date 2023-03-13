import React, { useContext } from "react";
import { ProductContext } from "./../../../context/ProductContext";
import cartService from "../../../services/cart.service";
import { toast } from "react-toastify";
import { CateringContext } from "../../../context/CateringContext";

const CartItem = ({ item }) => {
  const { allProducts } = useContext(ProductContext);
  const { socketUpdate } = useContext(CateringContext);
  if (!allProducts) {
    return <div className="bg-dark text-info">All products loading ......</div>;
  }
  const removeFromCart = async () => {
    cartService.removeFromCart(item.product).then((res) => {
      toast(res.data.message);
      socketUpdate();
    });
  };
  const product = allProducts?.find((product) => product._id === item.product);
  return (
    <div className="flex-row d-flex gap-1 p-2 rounded shadow border">
      <p className="text-light bg-dark p-1 shadow rounded">שם:</p>
      <p className="bg-dark p-1  rounded">{product?.title}</p>
      <p className="text-dark bg-light p-1 shadow rounded">|---|</p>
      <p className="text-light bg-dark p-1 shadow rounded">כמות:</p>
      <p className="bg-dark p-1  rounded">{item?.quantity}</p>
      <p className="text-dark p-1 shadow rounded">|---|</p>
      <p className="text-light bg-dark p-1 shadow rounded">מחיר:</p>

      <p className="bg-dark p-1  rounded">{item.totalPrice}</p>
      <div className="d-flex flex-row p-2">
        <p
          onClick={() => removeFromCart()}
          className="btn text-light p-1 bg-danger"
        >
          הסר מהסל
        </p>
      </div>
    </div>
  );
};

export default CartItem;
