import React, { useContext, useState } from "react";
import "./style.css";
import ProductList from "./ProductList";
import BusinessMeals from "../../../components/business-meals/BusinessMeals";
import { useNavigate } from "react-router-dom";
import StartProcess from "../../../components/business-meals/StartProcess";
const DayItem = ({ day }) => {
  const [showComponent, setShowComponent] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const nav = useNavigate();
  const toggleShowComponent = () => {
    setShowComponent((state) => !state);
  };
  const toggleShowProcess = () => {
    setShowProcess((state) => !state);
  };

  return (
    <div className="shadow d-flex flex-column bg_white">
      <p
        onClick={() => toggleShowComponent()}
        className="btn p-1 bg-primary text-light"
      >
        {day}
      </p>
      <div className={showComponent ? "" : "hide_class"}>
        <p
          onClick={() => toggleShowProcess()}
          className="addToCart mb-1 btn w-100 bg-info text-white fs-6"
        >
          {showProcess ? "סגור הזמנה" : "  לתחילת הזמנה בהתאמה אישית לחץ כאן"}
        </p>
        <div className={showProcess ? "mb-1" : "hide_class"}>
          <StartProcess />
        </div>
        <hr />
        <h2 className="h2 bg-primary text-white">עסקיות מומלצות</h2>

        <BusinessMeals />
      </div>
    </div>
  );
};

export default DayItem;
