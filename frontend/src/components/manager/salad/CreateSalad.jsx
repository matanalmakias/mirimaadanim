import React from "react";
import { Form } from "react-bootstrap";

const CreateSalad = () => {
  return (
    <div>
      <h2 className="h2 bg-white text-black">הוספת סלט לתפריט</h2>
      <p className="text-white ">
        משקל כלל הסלטים הוא 100 ג' , ישנה אפשרות להוסיף על ידי לחיצה על תוספת
        משקל
      </p>
      <Form className="p-2 ">
        <div className="d-flex flex-column gap-1">
          <input
            className="form-control"
            type="text"
            placeholder="שם"
            required
          />

          <input
            className="form-control"
            type="text"
            placeholder="תיאור"
            required
          />
          <input
            className="form-control"
            type="number"
            placeholder="מחיר"
            required
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
