import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsArrowRightCircleFill } from "react-icons/bs";
import "./style.scss";
const FirstStep = ({
  locations,
  setFirstStep,
  setSecondStep,
  setStepResults,
}) => {
  const [locationInput, setLocationInput] = useState(null);

  const formSubmit = (e) => {
    e.preventDefault();
    setFirstStep((s) => !s);
    setSecondStep((s) => !s);
    setStepResults((s) => ({
      ...s,
      firstStep: locationInput,
    }));
  };
  return (
    <div className=" p-1 ">
      <Form
        className="d-flex flex-column align-items-center justify-content-center text-center gap-2"
        onSubmit={(e) => formSubmit(e)}
      >
        <label
          className=" p-2 card h5 bg-success text-center text-white mb-1 w-100"
          htmlFor="location"
        >
          <p className="mb-1 row">
            <p className="col card p-2 shadow color1">באיזה איזור ההזמנה?</p>
          </p>

          <select
            onChange={(e) => setLocationInput(e.target.value)}
            name="location"
            required
            className="text-center mt-1 form-control fs-big"
            id="location"
          >
            <option selected value="">
              בחר איזור
            </option>
            {locations?.map((item, index) => (
              <option key={index} className="text-center h5">
                {item}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="w-100  p-2 btn-primary">
          {" "}
          המשך
        </button>
      </Form>
    </div>
  );
};

export default FirstStep;
