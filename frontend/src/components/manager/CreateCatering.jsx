import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./create-catering.css";
import cateringService from "../../services/catering.service";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateCatering() {
  const { isManager } = useContext(AuthContext);
  const [fields, setFields] = useState([]);
  const nav = useNavigate();
  const createField = () => {
    setFields([...fields, { name: "", price: 0 }]);
  };
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

  const handleFieldChange = (index, event) => {
    const newFields = [...fields];
    newFields[index][event.target.name] = event.target.value;
    setFields(newFields);
  };
  const formSubmit = async () => {
    try {
      cateringService.createCaterings(fields).then(() => {});
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAll = () => {
    cateringService.deleteAllGathers();
  };

  return (
    <Container className="text-center">
      <Form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          formSubmit(e);
        }}
      >
        <h3 className="h3 mb-4">הוספת פריט לקייטרינג</h3>
        {fields.map((field, index) => (
          <div className="container p-2 m-2 d-flex" key={index}>
            <input
              className="form-control"
              type="number"
              name="price"
              placeholder="הכנס מחיר פריט"
              value={field.value}
              onChange={(event) => handleFieldChange(index, event)}
            />
            <select>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <textarea
              className="form-control"
              name="description"
              placeholder="הכנס תיאור המוצר"
              value={field.description}
              onChange={(event) => handleFieldChange(index, event)}
            />

            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="הכנס שם פריט"
              value={field.name}
              onChange={(event) => handleFieldChange(index, event)}
            />
          </div>
        ))}
        <Button className="btn btn-primary my-3" onClick={createField}>
          הוסף פריט
        </Button>
        <Button className="btn btn-success mx-2" type="submit">
          הוסף את החבילה לשרת
        </Button>

        <Button className="btn btn-danger" onClick={deleteAll}>
          מחק את הכל
        </Button>
      </Form>
    </Container>
  );
}

export default CreateCatering;
