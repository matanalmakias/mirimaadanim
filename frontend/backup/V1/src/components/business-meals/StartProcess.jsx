import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ProductContext } from "./../../context/ProductContext";
import businessMealService from "../../services/business-meals.service";
import { toast } from "react-toastify";
import "./style.css";
import AuthContext from "../../context/AuthContext";
import CartItem from "./../cart/CartItem";
import { useNavigate } from "react-router-dom";

const StartProcess = () => {
  const [products, setProducts] = useState(null);
  const [meatProducts, setMeatProducts] = useState(null);
  const [meatInput, setMeatInput] = useState();
  const [additionalInput, setAdditionalInput] = useState();
  const [breadInput, setBreadInput] = useState();
  const [drinkInput, setDrinkInput] = useState();
  const [cartItem, setCartItem] = useState();
  const [showCartItem, setShowCartItem] = useState(false);
  const [completeMeat, setCompleteMeat] = useState(false);
  const { allProducts, socketUpdate } = useContext(ProductContext);
  const { socketUpdate: AuthSocketUpdate } = useContext(AuthContext);
  const nav = useNavigate();
  const resetInputs = () => {
    setMeatInput("");
    setAdditionalInput("");
    setBreadInput("");
    setDrinkInput("");
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      meat: meatInput,
      additional: additionalInput,
      bread: breadInput,
      drink: drinkInput,
    };

    await businessMealService
      .startProcess(formData)
      .then((res) => toast(res.data.message))
      .finally(() => {
        resetInputs();
        socketUpdate();
        AuthSocketUpdate();
        setShowCartItem(true);
      });
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
        <div>
          <select
            required
            onChange={(event) => setMeatInput(event.target.value)}
            className="form-select text-center my_center"
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
        </div>
        <select
          required
          onChange={(event) => setAdditionalInput(event.target.value)}
          className="form-select text-center my_center"
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
          className="form-select text-center my_center"
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
          className="form-select text-center my_center"
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
      {showCartItem && (
        <div
          onClick={() => nav("/user/cart")}
          className="btn my_hover bg-white"
        >
          עבור לסל
        </div>
      )}
    </div>
  );
};

export default StartProcess;
