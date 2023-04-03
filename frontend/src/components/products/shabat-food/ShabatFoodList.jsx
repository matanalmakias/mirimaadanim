import React, { useState } from "react";
import ShabatFoodItem from "./ShabatFoodItem";

export const shabatFood = [
  {
    id: 1,
    name: "שניצל",
    description: `שניצל מטוגן`,
    category: `בשרים`,
    weight: `250 ג'`,
    price: 12,
  },
  {
    id: 1,
    name: "שניצל",
    description: `שניצל מטוגן`,
    category: `בשרים`,
    weight: `250 ג'`,
    price: 12,
  },
  {
    id: 1,
    name: "שניצל",
    description: `שניצל מטוגן`,
    category: `בשרים`,
    weight: `250 ג'`,
    price: 12,
  },
];
const ShabatFoodList = () => {
  const [openShabatFood, setOpenShabatFood] = useState(false);

  const toggleOpenShabatFood = () => {
    setOpenShabatFood((state) => !state);
  };
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
                {shabatFood.map((item, index) => (
                  <ShabatFoodItem key={item.id} item={item} index={index} />
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
