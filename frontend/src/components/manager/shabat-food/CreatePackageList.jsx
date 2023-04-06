import React, { useContext, useState } from "react";
import "./style.scss";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import CreatePackageItem from "./CreatePackageItem";
import { shekelSymbol } from "./../../../utils/utils";
import ShabatFoodContext from "../../../context/shabat-food/ShabatFoodContext";
const CreatePackageList = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsInPackage, setProductsInPackage] = useState([[], []]);
  const { allProducts } = useContext(ShabatFoodContext);
  useEffect(() => {
    console.log(totalPrice);
  }, [totalPrice]);
  const pullShabatItemFromPackage = (itemId) => {
    setProductsInPackage((prevState) => {
      const newProductsInPackage = [...prevState];
      const index = newProductsInPackage[0].indexOf(itemId);
      if (index !== -1) {
        newProductsInPackage[0].splice(index, 1);
      }
      return newProductsInPackage;
    });
  };

  const pullSaladsItemFromPackage = (itemId) => {
    setProductsInPackage((prevState) => {
      const newProductsInPackage = [...prevState];
      const index = newProductsInPackage[1].indexOf(itemId);
      if (index !== -1) {
        newProductsInPackage[1].splice(index, 1);
      }
      return newProductsInPackage;
    });
  };
  const pushShabatItemToPackage = (itemId) => {
    setProductsInPackage((prevState) => {
      const newProductsInPackage = [...prevState];
      newProductsInPackage[0] = [...newProductsInPackage[0], itemId];
      return newProductsInPackage;
    });
  };

  const pushSaladsItemToPackage = (itemId) => {
    setProductsInPackage((prevState) => {
      const newProductsInPackage = [...prevState];
      newProductsInPackage[1] = [...newProductsInPackage[1], itemId];
      return newProductsInPackage;
    });
  };
  const toggleShowCreate = () => {
    setShowCreate((state) => !state);
  };
  const sumTotalPrice = (func, price) => {
    if (func === "plus") {
      let newTotalPrice = price + totalPrice;
      setTotalPrice(newTotalPrice);
    } else if (func === "minus") {
      let newTotalPrice = totalPrice - price;
      setTotalPrice(newTotalPrice);
    }
    return totalPrice;
  };
  return (
    <div className="package-tbody ">
      לחץ על מוצר כדי לצרף אותו ובסוף לחץ על יצירה
      <table className="package-tbody">
        <thead className="w-100">
          <tr className="w-100">
            <th className="bg-black w-100 p-1 text-white">אוכל מוכן לשבת</th>
          </tr>
        </thead>
        <tbody className="">
          {allProducts?.map((item, index) => {
            return (
              <CreatePackageItem
                totalPrice={totalPrice}
                sumTotalPrice={sumTotalPrice}
                pullShabatItemFromPackage={pullShabatItemFromPackage}
                category={"shabat"}
                item={item}
                index={index}
                pushShabatItemToPackage={pushShabatItemToPackage}
                pushSaladsItemToPackage={pushSaladsItemToPackage}
              />
            );
          })}
        </tbody>
      </table>
      <table className="package-tbody">
        <thead className="w-100">
          <tr className="w-100">
            <th className="bg-black w-100 p-1 text-white">סלטים</th>
          </tr>
        </thead>
        <tbody className="">
          {/* {salads.map((item, index) => (
            <CreatePackageItem
              totalPrice={totalPrice}
              sumTotalPrice={sumTotalPrice}
              pullSaladsItemFromPackage={pullSaladsItemFromPackage}
              category={"salads"}
              item={item}
              index={index}
              pushShabatItemToPackage={pushShabatItemToPackage}
              pushSaladsItemToPackage={pushSaladsItemToPackage}
            />
          ))} */}
        </tbody>
      </table>
      <p>
        מחיר כלל המוצרים שבחרת : {totalPrice}
        {shekelSymbol}
      </p>
      <p className="continue-btn" onClick={() => toggleShowCreate()}>
        {showCreate ? "סגור" : "המשך"}
      </p>
      <div className={showCreate ? "" : "hide_class"}>
        <Form className="d-flex flex-column gap-1 ">
          <input
            className="form-control p-1"
            type="text"
            required
            placeholder="כותרת"
          />
          <input
            className="form-control p-1"
            type="text"
            required
            placeholder="תיאור"
          />
          <input
            className="form-control p-1"
            type="number"
            required
            placeholder="מחיר"
          />
          <input
            className="form-control p-1"
            type="file"
            accept="image/*"
            placeholder="תמונה"
            required
          />
          <p className="btn btn-success p-2 w-100" type="submit">
            שלח
          </p>
        </Form>
      </div>
    </div>
  );
};

export default CreatePackageList;
