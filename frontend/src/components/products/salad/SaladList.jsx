import React, { useState } from "react";
import SaladItem from "./SaladItem";
export const salads = [
  {
    id: 1,
    name: "סלט ירקות",
    description: `עגבנייה,מלפפון,בצל,גמבה`,
    weight: `250 ג'`,
    price: 12,
  },
  {
    id: 2,
    name: "סלט ירקות",
    description: `עגבנייה,מלפפון,בצל,גמבה`,
    weight: `250 ג'`,
    price: 12,
  },
  {
    id: 3,
    name: "סלט ירקות",
    description: `עגבנייה,מלפפון,בצל,גמבה`,
    weight: `250 ג'`,
    price: 12,
  },
];
const SaladList = () => {
  const [openSalads, setOpenSalads] = useState(false);

  const toggleOpenSalads = () => {
    setOpenSalads((state) => !state);
  };
  return (
    <>
      <div>
        <p onClick={() => toggleOpenSalads()} className="p-title">
          מארזי סלטים לשבת/חגים
        </p>
        <div className={openSalads ? "" : "hide_class"}>
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
                  <td className="td-item">משקל</td>
                  <td className="td-item">מחיר</td>
                  <td className="td-item">הוספה לסל</td>
                  <td className="td-item">לפרטים</td>
                </tr>
                {salads.map((item) => (
                  <SaladItem key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaladList;
