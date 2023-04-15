import React, { useContext, useState } from "react";
import SaladItem from "./SaladItem";
import SaladContext from "../../../context/salads/SaladContext.jsx";
import Loader1 from "../../loader/Loader1.jsx";

const SaladList = () => {
  const [openSalads, setOpenSalads] = useState(false);
  const { allProducts } = useContext(SaladContext);

  const toggleOpenSalads = () => {
    setOpenSalads((state) => !state);
  };
  if (allProducts === null) {
    return <Loader1 />;
  }
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
                {allProducts?.map((item) => (
                  <SaladItem key={item._id} item={item} />
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
