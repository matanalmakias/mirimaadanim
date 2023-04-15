import React, { useContext, useEffect, useState } from "react";
import ShabatFoodItem from "./ShabatFoodItem";
import ShabatFoodContext from "../../../context/shabat-food/ShabatFoodContext";
import { Circles } from "react-loader-spinner";
import Loader1 from "./../../loader/Loader1.jsx";

const ShabatFoodList = () => {
  const [openShabatFood, setOpenShabatFood] = useState(false);
  const { allProducts } = useContext(ShabatFoodContext);

  const toggleOpenShabatFood = () => {
    setOpenShabatFood((state) => !state);
  };
  if (allProducts === null) {
    return <Loader1 />;
  }
  return (
    <>
      <div>
        <p onClick={() => toggleOpenShabatFood()} className="p-title">
          אוכל מוכן לשבת
        </p>
        <div className={openShabatFood ? "" : "hide_class"}>
          <div className="d-flex flex-column">
            <p className="mb-1">המשקל המינימלי להזמנה הוא 250 ג'</p>
            <p>
              כל האפשרויות הנוספות תמצאנה בסל הקניות לאחר ההוספה - כולל הוספת
              כמות
            </p>
          </div>

          <div className="d-flex flex-row align-items-center justify-content-center">
            <table className="w-100">
              <tbody>
                <tr>
                  <td className="td-item">שם פריט</td>
                  <td className="td-item">קטגוריה</td>
                  <td className="td-item">משקל</td>
                  <td className="td-item">מחיר</td>
                  <td className="td-item">הוספה לסל</td>
                  <td className="td-item">לפרטים</td>
                </tr>
                {allProducts.map((item, index) => (
                  <ShabatFoodItem key={item._id} item={item} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShabatFoodList;
