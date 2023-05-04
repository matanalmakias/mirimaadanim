import React, { useEffect, useState } from "react";
import "./style.scss"; // import the CSS file for styling
import ReactQuill from "react-quill";
import { productList2 } from "../../../utils/content";
import ProductList from "../products/ProductsList";
import ProductItem from "../products/ProductsItem";
function CreateBid() {
  const [htmlValue, setHtmlValue] = useState("");
  const [pricePerUnitInput, setPricePerUnitInput] = useState(null);
  const [nameInput, setNameInput] = useState(null);
  const [qtyInput, setQtyInput] = useState(null);
  const [weightInput, setWeightInput] = useState(null);
  const [supplierInput, setSupplierInput] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductClick = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((_id) => _id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };
  function handleHtmlChange(value) {
    setHtmlValue(value);
  }

  return (
    <form
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
          placeholder="תן שם לפריט"
          className="text-center col-8"
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
          placeholder="הכנס כמות מעודכנת"
          className="text-center col-8"
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
          placeholder="לפי /משקל /ק'ג/ליטר וכו'"
          className="text-center col-8"
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
          placeholder="מחיר מוצר לפי יחידה"
          className="text-center col-8"
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
          placeholder="מי הספק? יוחננוף/מחסני השוק וכו'"
          className="text-center col-8"
        />
      </div>

      <div className="row gap-1 w-100 align-items-center justify-content-center">
        <label htmlFor="company" className="text-center col-3 label1 mb-1">
          שיוך מוצרים[חובה]
        </label>
        <div className="">
          <span className=" bg-secondary text-white ">
            שייך את כל המוצרים שמתאימים להכנה של פריט זה!
          </span>
          {productList2?.map((item, index) => (
            <div key={index} className="card m-1 row p-1">
              <input
                type="checkbox"
                id={item._id}
                className=" col"
                value={item._id}
                checked={selectedProducts.includes(item._id)}
                onChange={() => handleProductClick(item._id)}
              />
              <label className="col" htmlFor={item.id}>
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button className="w-50" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateBid;
