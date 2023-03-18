import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ProductContext } from "./../../context/ProductContext";
import businessMealService from "../../services/business-meals.service";
import { toast } from "react-toastify";

const StartProcess = () => {
  const [products, setProducts] = useState(null);
  const [meatProducts, setMeatProducts] = useState(null);
  const [meatInput, setMeatInput] = useState();
  const [additionalInput, setAdditionalInput] = useState();
  const [breadInput, setBreadInput] = useState();
  const [drinkInput, setDrinkInput] = useState();
  const [completeMeat, setCompleteMeat] = useState(false);
  const { allProducts } = useContext(ProductContext);

  const formSubmit = async (e) => {
    const formData = {
      meat: meatInput,
      additional: additionalInput,
      bread: breadInput,
      drink: drinkInput,
    };
    e.preventDefault();
    await businessMealService
      .startProcess(formData)
      .then((res) => toast(res.data.message));
  };
  const filteredMeatProducts = allProducts?.filter(
    (item) => item.category === "בשרים"
  );
  const filteredAdditionalProducts = allProducts?.filter(
    (item) => item.category === "תוספות"
  );
  const filteredBreadProducts = allProducts?.filter(
    (item) => item.category === "לחם"
  );
  const filteredDrinkProducts = allProducts?.filter(
    (item) => item.category === "שתייה"
  );
  return (
    <div>
      <Form onSubmit={(e) => formSubmit(e)}>
        <select
          required
          onChange={(event) => setMeatInput(event.target.value)}
          className="form-select text-center"
        >
          <option value="" disabled selected>
            בחר מנה עיקרית
          </option>
          {filteredMeatProducts?.map((item, index) => (
            <option
              key={index}
              className=" p-1 form-control"
              value={item.title}
            >
              {item?.title}
            </option>
          ))}
        </select>
        <select
          required
          onChange={(event) => setAdditionalInput(event.target.value)}
          className="form-select gap-1 d-flex flex-column justify-content-center align-items-center text-center"
        >
          <option value="" disabled selected>
            בחר תוספת
          </option>
          {filteredAdditionalProducts?.map((item, index) => (
            <option key={index} className="p-1 form-control" value={item.title}>
              {item?.title}
            </option>
          ))}
        </select>
        <select
          required
          onChange={(event) => setBreadInput(event.target.value)}
          className="form-select gap-1 d-flex flex-column justify-content-center align-items-center text-center"
        >
          <option value="" disabled selected>
            בחר סוג לחם
          </option>
          {filteredBreadProducts?.map((item, index) => (
            <option key={index} className="p-1 form-control" value={item.title}>
              {item?.title}
            </option>
          ))}
        </select>
        <select
          required
          onChange={(event) => setDrinkInput(event.target.value)}
          className="form-select gap-1 d-flex flex-column justify-content-center align-items-center text-center"
        >
          <option value="" disabled selected>
            בחר שתייה
          </option>
          {filteredDrinkProducts?.map((item, index) => (
            <option key={index} className="p-1 form-control" value={item.title}>
              {item?.title}
            </option>
          ))}
        </select>

        <button
          className="btn w-100 bg-success shadow mt-1 mb-1 text-white addToCart"
          type="submit"
        >
          הוסף הזמנה לסל
        </button>
      </Form>
    </div>
  );
};

export default StartProcess;
