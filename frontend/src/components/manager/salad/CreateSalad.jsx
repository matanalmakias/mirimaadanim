import React, { useState } from "react";
import { Form } from "react-bootstrap";
import saladService from "../../../services/salads/salad.service";
import { toast } from "react-toastify";

const CreateSalad = () => {
  const [nameInput, setNameInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const [priceInput, setPriceInput] = useState();
  const [imageInput, setImageInput] = useState();

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("name", nameInput);
    formData.append("description", descriptionInput);
    formData.append("price", priceInput);
    formData.append("image", imageInput);
    await saladService
      .createProduct(formData)
      .then((res) => toast(res.data.message));
  };
  return (
    <div>
      <h2 className="h2 bg-white text-black">הוספת סלט לתפריט</h2>
      <p className="text-white ">
        משקל כלל הסלטים הוא 250 ג' , ישנה אפשרות להוסיף על ידי לחיצה על תוספת
        משקל
      </p>
      <Form className="p-2 " onSubmit={() => submitForm()}>
        <div className="d-flex flex-column gap-1">
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
    </div>
  );
};

export default CreateSalad;
