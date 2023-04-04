import React, { useState } from "react";
import { salads } from "../../products/salad/SaladList";
import { shabatFood } from "../../products/shabat-food/ShabatFoodList";
import "./style.scss";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
const CreatePackageList = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [productsInPackage, setProductsInPackage] = useState([[], []]);

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
  return (
    <div className="package-tbody">
      לחץ על מוצר כדי לצרף אותו ובסוף לחץ על יצירה
      <table className="package-tbody">
        <thead>
          <tr>
            <th className="bg-black  text-white">אוכל מוכן לשבת</th>
            <th className="bg-black text-white">סלטים</th>
          </tr>
        </thead>
        <tbody className="">
          {shabatFood.map((item, index) => {
            return (
              <tr className="" key={index}>
                <td
                  onClick={() => pushShabatItemToPackage(item.id)}
                  className="table-item"
                >
                  {item.name}
                </td>
                <td
                  onClick={() => pushSaladsItemToPackage(item.id)}
                  className="table-item"
                >
                  {salads[index] && salads[index].name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
