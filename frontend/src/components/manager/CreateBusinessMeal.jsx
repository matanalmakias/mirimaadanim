import React, { useState } from "react";
import { Form } from "react-bootstrap";
import businessMealService from "../../services/business-meals.service";
import axios from "axios";
import { serverUrl } from "../../utils/utils";
import { toast } from "react-toastify";

const CreateBusinessMeal = () => {
  const [show, setShow] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [priceInput, setPriceInput] = useState(0);

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: titleInput,
      description: descriptionInput,
      price: priceInput,
    };
    await businessMealService.createBusinessMeal(formData).then((res) => {
      toast(res.data.message);
    });
  };
  const toggleShow = async () => {
    setShow((state) => !state);
  };
  return (
    <div className="w-100">
      <p
        onClick={() => toggleShow()}
        className="btn text-black
      w-100 my_hover p-2 bg-info"
      >
        צור עסקית חדשה
      </p>

      <div className={show ? "" : "hide_class"}>
        <Form onSubmit={(e) => formSubmit(e)}>
          <label className="text-white" htmlFor="title">
            כותרת
          </label>
          <input
            onChange={(e) => setTitleInput(e.target.value)}
            required
            type="text"
            className="form-control"
          />
          <label className="text-white" htmlFor="title">
            תיאור
          </label>
          <input
            onChange={(e) => setDescriptionInput(e.target.value)}
            required
            type="text"
            className="form-control"
          />
          <label className="text-white" htmlFor="title">
            מחיר
          </label>
          <input
            onChange={(e) => setPriceInput(e.target.value)}
            required
            type="number"
            className="form-control"
          />

          <button
            className="btn mt-1 w-100 mb-2 bg-success text-white my_hover"
            type="submit"
          >
            שלח
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CreateBusinessMeal;
