import React, { useContext } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import cartService from "../../../services/cart/cart.service";
import { toast } from "react-toastify";
import Loader1 from "../../loader/Loader1";

const SaladItem = ({ item }) => {
  const { selfUser } = useContext(AuthContext);
  const nav = useNavigate();
  const checkIfExistInCart = selfUser?.cart?.some(
    (cartItem) => cartItem?._id === item?._id
  );
  const addToCart = async () => {
    cartService.add(item?._id, "salad").then((res) => toast(res.data.message));
  };
  const removeFromCart = async () => {
    cartService.remove(item?._id).then((res) => toast(res.data.message));
  };
  if (item === null) {
    return <Loader1 />;
  }

  return (
    <>
      <tr>
        <td>
          <p class="p-item">{item?.name}</p>
        </td>
        <td>
          <p class="p-item">{item?.weight}</p>
        </td>
        <td>
          <p class="p-item">{item?.price}</p>
        </td>
        {checkIfExistInCart ? (
          <td onClick={() => removeFromCart()}>
            <p class="salad-add-to-cart">הסר</p>
          </td>
        ) : (
          <td onClick={() => addToCart()}>
            <p class="salad-add-to-cart">הוסף</p>
          </td>
        )}
        <td>
          <p
            onClick={() => nav(`/product/salad/${item?._id}`)}
            class="salad-details"
          >
            <i class="ri-arrow-left-circle-line"></i>
          </p>
        </td>
      </tr>
    </>
  );
};

export default SaladItem;
