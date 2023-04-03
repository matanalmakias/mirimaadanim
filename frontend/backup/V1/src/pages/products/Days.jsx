import { useNavigate } from "react-router-dom";
import "./daily.css";
import { getDay, days } from "../../functions/getDay";
import { dayList } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import { useContext, useState } from "react";
import { CateringContext } from "../../context/CateringContext";
import { ProductContext } from "../../context/ProductContext";
import DayItem from "./products/DayItem";
import StartProcess from "../../components/business-meals/StartProcess";

const Days = () => {
  const nav = useNavigate();
  const [showCategory, setShowCategory] = useState({});
  const { categories } = useContext(CateringContext);
  const { allProducts } = useContext(ProductContext);
  const day = getDay();

  const [showComponent, setShowComponent] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const toggleShowComponent = () => {
    setShowComponent((state) => !state);
  };
  const toggleShowProcess = () => {
    setShowProcess((state) => !state);
  };
  return (
    <div className="bg-info p-3 text-center ">
      <p
        onClick={() => toggleShowProcess()}
        className="addToCart mb-1 btn w-100 bg-dark text-white fs-6"
      >
        {showProcess ? "סגור הזמנה" : "  לתחילת הזמנה בהתאמה אישית לחץ כאן"}
      </p>
      <div className={showProcess ? "mb-1" : "hide_class"}>
        <StartProcess />
      </div>
      {/* {dayList.map((item, index) => (
        <DayItem key={index} day={item} />
      ))} */}
      <ToastContainer autoClose={1370} />
    </div>
  );
};

export default Days;
