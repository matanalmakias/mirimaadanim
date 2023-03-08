import "./sunday.css";
import { translateDay } from "../../../functions/getDay";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../context/CateringContext";
import storeService from "../../../services/store.service";
import DayItem from "./DayItem";
const Days = ({ day }) => {
  const [products, setProducts] = useState(null);

  const socket = useContext(SocketContext);
  const newDay = translateDay();

  useEffect(() => {
    if (products === null) {
      storeService.getDayProducts(day).then((res) => setProducts(res.data));
    }
    socket.on("update", () => {
      storeService.getDayProducts(day).then((res) => setProducts(res.data));
    });

    return () => {
      socket.off("update");
    };
  }, []);
  if (products === null) return <div className="text-black"> Loading...</div>;
  return (
    <div dir="rtl" className="bg-light text-black mt-1 text-center">
      <h1 className="h1 display-6">תפריט יומי של יום {newDay}</h1>
      {products.map((item) => (
        <DayItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Days;
