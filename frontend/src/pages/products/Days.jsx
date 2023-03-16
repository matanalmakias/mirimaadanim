import { useNavigate } from "react-router-dom";
import "./daily.css";
import { getDay, days } from "../../functions/getDay";
import { dayList } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import { useContext, useState } from "react";
import { CateringContext } from "../../context/CateringContext";
import { ProductContext } from "../../context/ProductContext";
import DayItem from "./products/DayItem";

const Days = () => {
  const nav = useNavigate();
  const [showCategory, setShowCategory] = useState({});
  const { categories } = useContext(CateringContext);
  const { allProducts } = useContext(ProductContext);
  const day = getDay();

  return (
    <div className="bg-info p-3 text-center ">
      {dayList.map((item, index) => (
        <DayItem key={index} day={item} />
      ))}
      <ToastContainer autoClose={1370} />
    </div>
  );
};

export default Days;
