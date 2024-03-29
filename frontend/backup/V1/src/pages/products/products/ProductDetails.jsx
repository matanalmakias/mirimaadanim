import React, { useContext, useEffect, useState } from "react";
import storeService from "../../../services/store.service";
import { SocketContext } from "../../../context/CateringContext";
import { useNavigate, useParams } from "react-router-dom";
import ShekelIcon from "../../../components/shekel/ShekelIcon";
import { serverUrl } from "../../../utils/utils";
import "./style.css";

const url = `${serverUrl}/`;
const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const socket = useContext(SocketContext);
  const { productId } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if (product === null) {
      storeService.getSingleProduct(setProduct, productId);
    } else {
    }
    socket.on("update", () => {
      storeService.getSingleProduct(setProduct, productId);
    });

    return () => {
      socket.off("update");
    };
  }, [product, socket, productId]);
  if (product === null) {
    return <> Loading.......</>;
  }
  return (
    <div className="bg-dark rounded p-3 d-flex flex-column text-center align-items-center justify-content-center">
      <p className=" w-100 p-2 bg-light text-dark rounded">
        שם מוצר: {product?.title}
      </p>
      <p className=" w-100 p-2 bg-light text-dark rounded">
        תיאור: {product?.description}
      </p>
      <p className=" w-100 p-2 bg-light text-dark rounded">
        קטגוריה: {product?.category}
      </p>
      <p className=" w-100 p-2 bg-light text-dark rounded">
        מחיר: {product?.price}
        <ShekelIcon />
      </p>

      <div className="d-flex flex-row gap-1 w-100">
        <p className="bg-white p-1">מופיע בימים:</p>
        {product?.days?.map((day, index) => (
          <div className="d-flex flex-row">
            <p
              onClick={() => nav(`/products`)}
              key={index}
              className="shadow btn p-1 bg-white"
            >
              {day}
            </p>
          </div>
        ))}
      </div>
      <p className=" w-100 p-2 bg-light text-dark rounded">
        תמונה: <img src={`${url}/${product.image}`} alt="" />
      </p>
      <p className="btn btn-info " onClick={() => nav(-1)}>
        חזור
      </p>
    </div>
  );
};

export default ProductDetails;
