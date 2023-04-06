import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { shekelSymbol } from "./../../../utils/utils";
import "./style.scss";
import AuthContext from "../../../context/AuthContext";
import cartService from "../../../services/cart/cart.service";
import Loader1 from "../../loader/Loader1";
import { toast } from "react-toastify";
const PackageItem = ({ item, index }) => {
  const { selfUser } = useContext(AuthContext);
  const nav = useNavigate();
  const checkIfExistInCart = selfUser?.cart?.some(
    (cartItem) => cartItem?._id === item?._id
  );
  const addToCart = async () => {
    cartService
      .add(item?._id, "package")
      .then((res) => toast(res.data.message));
  };
  const removeFromCart = async () => {
    cartService.remove(item?._id).then((res) => toast(res.data.message));
  };
  if (item === null) {
    return <Loader1 />;
  }
  return (
    <>
      <p className="package-index">{index + 1}</p>
      <div>
        <p className="package-item">{item.name}</p>
        <p className="package-item">{item.description}</p>
      </div>
      <div className="d-flex gap-2 justify-content-center">
        {item?.items?.map((item, index) => {
          return (
            <p className=" w-33 package-item" key={index}>
              {item?.name} <br />
            </p>
          );
        })}
      </div>
      <div className="d-flex flex-row">
        <p className=" w-50 package-item">
          {item?.totalPrice}
          {shekelSymbol}
        </p>
        {checkIfExistInCart ? (
          <td className="w-50" onClick={() => removeFromCart()}>
            <p class="salad-add-to-cart">הסר</p>
          </td>
        ) : (
          <td className="w-50" onClick={() => addToCart()}>
            <p class="salad-add-to-cart">הוסף</p>
          </td>
        )}
      </div>
    </>
  );
};

export default PackageItem;
