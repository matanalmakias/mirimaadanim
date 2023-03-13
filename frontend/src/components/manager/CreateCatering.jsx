import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./create-catering.css";
import * as Yup from "yup";
import cateringService from "../../services/catering.service";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { SocketContext } from "../../context/CateringContext";
import { toast } from "react-toastify";
function CreateCatering() {
  const { isManager } = useContext(AuthContext);
  const [fields, setFields] = useState([]);

  const [priceInput, setPriceInput] = useState(0);
  const [descriptionInput, setDescriptionInput] = useState();
  const [titleInput, setTitleInput] = useState();
  const [categoryInput, setCategoryInput] = useState();
  const [imageInput, setImageInput] = useState();

  const [createdProduct, setCreatedProduct] = useState();
  const socket = useContext(SocketContext);
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
  const formData = new FormData();
  formData.append("title", titleInput);
  formData.append("category", categoryInput);
  formData.append("description", descriptionInput);
  formData.append("price", priceInput);
  formData.append("image", imageInput);

  const formSubmit = async (e) => {
    e.preventDefault();
    cateringService.createProducts(setCreatedProduct, formData).then((res) => {
      toast(res.message);
      socket.emit("update");
    });
  };
  const deleteAll = () => {
    cateringService.deleteAllProducts().then((res) => toast(res.data.message));
  };

  return (
    <Container dir="rtl" className="text-center">
      <Form onSubmit={(e) => formSubmit(e)} className="form p-2">
        <h2 className=" bg-light text-black  p-2 mt-1 h3 mb-3">
          הוספת פריט לקייטרינג
        </h2>
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

            <input
              className="form-control p-2"
              type="number"
              name="price"
              placeholder="מחיר פריט"
              onChange={(event) => setPriceInput(event.target.value)}
            />
            <label htmlFor="תמונת פריט">תמונת פריט</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              name="image"
              onChange={(event) => setImageInput(event.target.files[0])}
            />
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="col">
            <Button className="btn btn-success" type="submit">
              הוסף פריט
            </Button>
          </div>
          <div className="col">
            <Button className="btn btn-danger" onClick={deleteAll}>
              מחק הכל
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default CreateCatering;
