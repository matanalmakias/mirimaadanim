import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import shabatService from "./../../../services/shabat-food/shabatFood.service";
import { ToastContainer, toast } from "react-toastify";

const CreateShabatFood = () => {
  const [nameInput, setNameInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const [categoryInput, setCategoryInput] = useState();
  const [priceInput, setPriceInput] = useState();
  const [imageInput, setImageInput] = useState();
  const categories = [`בשרים`, "תוספות"];

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("name", nameInput);
    formData.append("description", descriptionInput);
    formData.append("category", categoryInput);
    formData.append("price", priceInput);
    formData.append("image", imageInput);
    await shabatService
      .createProduct(formData)
      .then((res) => toast(res.data.message));
  };

  return (
    <div>
      <Form className="p-2 " onSubmit={() => submitForm()}>
        <div className="d-flex flex-column gap-1">
          <h2 className="h2 bg-white text-black">הוספת פריט לאוכל מוכן שלבת</h2>
          <p className="text-white ">
            משקל כלל הפריטים הוא 250 ג' , ישנה אפשרות להוסיף על ידי לחיצה על
            תוספת משקל
          </p>
          <input
            onChange={(e) => setNameInput(e.target.value)}
            className="form-control"
            type="text"
            placeholder="שם"
            required
          />
          <input
            onChange={(e) => setDescriptionInput(e.target.value)}
            className="form-control"
            type="text"
            placeholder="תיאור"
            required
          />

          <select
            onChange={(e) => setCategoryInput(e.target.value)}
            className="form-control"
            name="category"
            id="category-select"
          >
            <option disabled selected hidden>
              בחר קטגוריה
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            onChange={(e) => setPriceInput(e.target.value)}
            className="form-control"
            type="number"
            placeholder="מחיר"
            required
          />
          <input
            onChange={(e) => setImageInput(e.target.files[0])}
            className="form-control p-1"
            type="file"
            accept="image/*"
            placeholder="תמונה"
          />
          <button className="btn bg-white" type="submit">
            הוסף
          </button>
        </div>
      </Form>
      <ToastContainer autoClose={2300} />
    </div>
  );
};

export default CreateShabatFood;
