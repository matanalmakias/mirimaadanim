import React, { useContext, useState } from "react";
import "./style.css";
import ProductList from "./ProductList";
const DayItem = ({ day }) => {
  const [showComponent, setShowComponent] = useState(false);
  const toggleShowComponent = () => {
    setShowComponent((state) => !state);
  };

  return (
    <div>
      <p
        onClick={() => toggleShowComponent()}
        className="btn p-1 bg-primary text-light"
      >
        {day}
      </p>
      <div className={showComponent ? "" : "hide_class"}>
        <ProductList day={day} />
      </div>
    </div>
  );
};

export default DayItem;
