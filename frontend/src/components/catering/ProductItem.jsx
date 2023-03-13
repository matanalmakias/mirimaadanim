import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { SocketContext } from "../../context/CateringContext";
import "./caterings.css";
import ShekelIcon from "../shekel/ShekelIcon";
import EditDaysItem from "./EditDaysItem";
import { serverUrl } from "../../utils/utils";
const ProductItem = ({ product }) => {
  const [showEditDays, setShowEditDays] = useState(false);
  const [isProductAlreadyInCart, setIsProductAlreadyInCart] = useState(null);
  const { isManager, isLoggedIn } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const imagesUrl = `${serverUrl}/`;
  const navigate = (url) => {
    window.location.href = url;
  };
  return (
    <>
      <div
        className="mb-1 d-flex flex-row align-items-center justify-content-center text-center gap-1"
        dir="rtl"
      >
        <span className="text-black bg-light p-2"> {product?.title}</span>
        <span className=" text-black bg-light p-2">
          {product.price}
          <ShekelIcon />
        </span>
        <img
          onClick={() => navigate(`${imagesUrl}/${product?.image}`)}
          className="my_img  p-2"
          src={`${imagesUrl}/${product?.image}`}
          alt=""
        />
        <span
          onClick={() => setShowEditDays((state) => !state)}
          className="btn11"
        >
          לתזמון מוצר
        </span>
      </div>
      <div className={showEditDays ? "" : "hide_class"}>
        <EditDaysItem item={product} />
      </div>
    </>
  );
};

export default ProductItem;
