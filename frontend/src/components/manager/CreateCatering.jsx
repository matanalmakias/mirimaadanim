import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./create-catering.css";
import * as Yup from "yup";
import cateringService from "../../services/catering.service";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { CateringContext, SocketContext } from "../../context/CateringContext";
import { toast } from "react-toastify";
function CreateCatering() {
  const { isManager } = useContext(AuthContext);
  const [fields, setFields] = useState([]);

  const [priceInput, setPriceInput] = useState(0);
  const [descriptionInput, setDescriptionInput] = useState();
  const [titleInput, setTitleInput] = useState();
  const [categoryInput, setCategoryInput] = useState();
  const [imageInput, setImageInput] = useState();
  const [additionalInputs, setAdditionalInputs] = useState([]);

  const [createdProduct, setCreatedProduct] = useState();
  const { socketUpdate } = useContext(CateringContext);
  const nav = useNavigate();
  const categories = [
    "סלטים",
    "בשרים",
    "שתייה",
    "לחם",
    "דגים",
    "עופות",
    "על האש",
    "צמחוני",
    "טבעוני",
    "פשטידות",
    "מטוגנים",
    "תוספות",
  ];

  const handleAddInput = () => {
    setAdditionalInputs((prevInputs) => [...prevInputs, ""]);
  };

  const handleAdditionalInputChange = (index, value) => {
    const newInputs = [...additionalInputs];
    newInputs[index] = value;
    setAdditionalInputs(newInputs);
  };
  const formData = new FormData();
  formData.append("title", titleInput);
  formData.append("category", categoryInput);
  formData.append("description", descriptionInput);
  formData.append("price", priceInput);
  formData.append("image", imageInput);
  formData.append("additional", additionalInputs);

  const formSubmit = async (e) => {
    e.preventDefault();
    await cateringService
      .createProducts(setCreatedProduct, formData)
      .then((res) => {
        toast(res.message);
        socketUpdate();
      });
  };
  const deleteAll = async () => {
    await cateringService
      .deleteAllProducts()
      .then((res) => toast(res.data.message));
  };
  return (
    <Container dir="rtl" className="text-center">
      <Form onSubmit={(e) => formSubmit(e)} className="">
        <p className="rounded bg-light text-info">הוספת פריט לקייטרינג</p>
        <div className="d-grid mb-2">
          <div className="row gap-2">
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="שם פריט"
              onChange={(event) => setTitleInput(event.target.value)}
            />

            <select
              onChange={(event) => setCategoryInput(event.target.value)}
              className="form-select"
            >
              <option value="" disabled selected>
                קטגוריה
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <textarea
              className="form-control p-4"
              name="description"
              placeholder="תיאור המוצר"
              onChange={(event) => setDescriptionInput(event.target.value)}
            />

            <p
              onClick={() => handleAddInput()}
              className="btn shadow btn-info p-1"
            >
              הוסף אפשרות לתוספת בתשלום
            </p>
            {additionalInputs.map((input, index) => (
              <input
                key={index}
                className="form-control p-2"
                type="text"
                name={`additional_${index}`}
                placeholder={`הכנס תיאור תוספת ${index + 1}`}
                value={input}
                onChange={(event) =>
                  handleAdditionalInputChange(index, event.target.value)
                }
              />
            ))}
            <input
              className="form-control p-2"
              type="number"
              name="price"
              placeholder="מחיר פריט"
              onChange={(event) => setPriceInput(event.target.value)}
            />
            <label className="bg-info" htmlFor="תמונת פריט">
              תמונת פריט
            </label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              name="image"
              onChange={(event) => setImageInput(event.target.files[0])}
            />
          </div>
        </div>
        <span
          className="mb-3 bg-info btn text-light p-1"
          onClick={() => nav("/manager/products")}
        >
          לשיוך מוצר ליום כלשהוא לחץ פה
        </span>
        <div className="d-flex align-items-center">
          <div className="col">
            <Button className="btn btn-success p-1" type="submit">
              הוסף פריט
            </Button>
          </div>
          <div className="col">
            <Button className="btn btn-danger p-1" onClick={deleteAll}>
              מחק הכל
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default CreateCatering;
