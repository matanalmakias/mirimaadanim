import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BsArrowDownRightCircleFill } from "react-icons/bs";

const SecondStep = ({
  setSecondStep,
  setThirdStep,
  setStepResults,
  backBtn,
  setFirstStep,
}) => {
  const [dateInput, setDateInput] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }
  const formSubmit = (e) => {
    e.preventDefault();
    setSecondStep((s) => !s);
    setThirdStep((s) => !s);
    setStepResults((s) => ({
      ...s,
      secondStep: isChecked ? false : dateInput,
    }));
  };
  return (
    <div className=" p-1 ">
      <Form
        className="d-flex flex-column align-items-center justify-content-center text-center gap-2"
        onSubmit={(e) => formSubmit(e)}
      >
        <label
          className=" p-2 card h5 bg-success text-white mb-1 w-100"
          htmlFor="location"
        >
          <button
            onClick={() => backBtn(setSecondStep, setFirstStep)}
            className=" color1 btn p-1 fs-small m-2 btn-light"
          >
            <BsArrowDownRightCircleFill /> חזור לשלב הקודם
          </button>
          לאיזה תאריך תרצה לבצע את ההזמנה?
          <input
            type="date"
            onChange={(e) => setDateInput(e.target.value)}
            className="mt-1 text-center"
          />
        </label>
        <label htmlFor="other" className="col w-100 card mb-1 p-2">
          אם אין עדיין תאריך סמן שדה זה
          <input
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="p-1  form-check col"
            type="checkbox"
          />
        </label>
        <button type="submit" className="w-100  p-2 btn-primary">
          {" "}
          המשך
        </button>
      </Form>
    </div>
  );
};

export default SecondStep;
