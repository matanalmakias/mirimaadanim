import "./sunday.css";
import { translateDay } from "../../../functions/getDay";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../context/CateringContext";
import storeService from "../../../services/store.service";
import Item from "./Item";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./../../../context/ProductContext";
const List = ({ day }) => {
  const nav = useNavigate();
  const socket = useContext(SocketContext);
  const { allProducts } = useContext(ProductContext);
  if (allProducts === null)
    return <div className="text-black"> Loading...</div>;
  return (
    <>
      <div dir="rtl" className="bg-light text-black mt-1 p-2 text-center">
        <p
          onClick={() => nav("/user/cart")}
          className="bg-info mt-3 text-light btn"
        >
          למעבר לסל
        </p>
        {allProducts.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default List;
