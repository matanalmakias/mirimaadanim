import React from "react";
import { Form } from "react-bootstrap";

const CreateShabatFood = () => {
  const categories = [`בשרים`, "תוספות"];
  return (
    <div>
      <Form className="p-2 ">
        <div className="d-flex flex-column gap-1">
          <h2 className="h2 bg-white text-black">הוספת פריט לאוכל מוכן שלבת</h2>
          <p className="text-white ">
            משקל כלל הסלטים הוא 500 ג' , ישנה אפשרות להוסיף על ידי לחיצה על
            תוספת משקל
          </p>
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

          <select className="form-control" name="category" id="category-select">
            {categories.map((category) => (
              <option className="form-control" value={category}>
                {category}
              </option>
            ))}
          </select>
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

export default CreateShabatFood;
