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
    setFields([...fields, { name: "", info: "" }]);
  };

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
        <h3 className="h3 mb-4">הוספת חבילת קייטרינג</h3>
        {fields.map((field, index) => (
          <div className="container d-flex" key={index}>
            <textarea
              className="form-control me-2"
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
          {" "}
          הוסף פריט לשרת
        </Button>{" "}
        {isManager && (
          <Button className="btn btn-danger m-3" onClick={deleteAll}>
            מחק את הכל
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default CreateCatering;
