import React, { useContext, useEffect, useState } from "react";
import { inventoryList, productList2 } from "../../../../utils/content";
import InventoryContext from "../../../../context/inventory/InventoryContext";

const SecondStep = ({ products: productsIds }) => {
  const [pricePerUnitInput, setPricePerUnitInput] = useState(null);
  const [nameInput, setNameInput] = useState(null);
  const [qtyInput, setQtyInput] = useState(null);
  const [weightInput, setWeightInput] = useState(null);
  const [supplierInput, setSupplierInput] = useState(null);
  const { allInventorys } = useContext(InventoryContext);

  let products = [];
  productsIds?.forEach((id, index) => {
    let product = allInventorys?.find((item) => item._id === id);
    if (!product) {
      return;
    }
    products.push(product);
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };
  return (
    <div>
      <h2 className="bg-secondary text-white h2">
        אם אין ברצונך לשנות שדה כלשהוא - השאר אותו ריק
      </h2>
      {products?.map((item, index) => {
        return (
          <form
            key={index}
            className="d-flex justify-content-center text-center align-items-center flex-column gap-2"
            onSubmit={handleSubmit}
          >
            <div className="row gap-1 w-100">
              <label htmlFor="company" className="col-3 label1 mb-1">
                שם פריט
              </label>
              <input
                type="text"
                required
                onChange={(e) => setNameInput(e.target.value)}
                placeholder={`שם מעודכן - ${item?.name}`}
                className="text-center col-8 fs1"
              />
            </div>
            <div className="row gap-1 w-100">
              <label htmlFor="company" className="col-3 label1 mb-1">
                כמות
              </label>
              <input
                type="tel"
                required
                onChange={(e) => setQtyInput(e.target.value)}
                placeholder={`כמות מעודכנת - ${item?.quantity}`}
                className="text-center col-8 fs1"
              />
            </div>
            <div className="row gap-1 w-100">
              <label htmlFor="company" className="col-3 label1 mb-1">
                לפי
              </label>
              <input
                onChange={(e) => setWeightInput(e.target.value)}
                type="text"
                required
                placeholder={`מעודכן - ${item?.unit}`}
                className="text-center col-8 fs1"
              />
            </div>
            <div className="row gap-1 w-100">
              <label htmlFor="company" className="col-3 label1 mb-1">
                מחיר לפי יחידה
              </label>
              <input
                onChange={(e) => setPricePerUnitInput(e.target.value)}
                type="tel"
                required
                placeholder={`מחיר מעודכן - ${item?.pricePerUnit}`}
                className="text-center col-8 fs1"
              />
            </div>
            <div className="row gap-1 w-100">
              <label htmlFor="company" className="col-3 label1 mb-1">
                ספק
              </label>
              <input
                onChange={(e) => setSupplierInput(e.target.value)}
                type="text"
                required
                placeholder={`ספק אחרון - ${item?.supplier}`}
                className="text-center col-8 fs1"
              />
            </div>

            <button className="w-50" type="submit">
              Submit
            </button>
          </form>
        );
      })}
    </div>
  );
};

export default SecondStep;
