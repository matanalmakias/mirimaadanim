import "./sunday.css";
import { translateDay } from "../../../functions/getDay";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../context/CateringContext";
import storeService from "../../../services/store.service";
import DayItem from "./DayItem";
import axios from "axios";
const Days = ({ day }) => {
  const [products, setProducts] = useState(null);

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (products === null) {
      // storeService.getAllProducts.then((res) => setProducts(res.data));
      storeService.getAllProducts(setProducts);
    }
    socket.on("update", () => {
      storeService.getAllProducts(setProducts);
    });

    return () => {
      socket.off("update");
    };
  }, []);
  if (products === null) return <div className="text-black"> Loading...</div>;
  return (
    <div dir="rtl" className="bg-light text-black mt-1 text-center">
      {products.map((item) => (
        <DayItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Days;
