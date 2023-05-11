import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsArrowDownRightCircleFill } from "react-icons/bs";

const FourthStep = ({
  getCateringFromServer,
  setStepResults,
  setFourthStep,
  setFifthStep,
  setThirdStep,
  backBtn,
}) => {
  const [number, setNumber] = useState(0);
  const formSubmit = async (e) => {
    e.preventDefault();
    await setStepResults((s) => ({
      ...s,
      fourthStep: number,
    }));
    setFourthStep((s) => !s);
    setFifthStep((s) => !s);
    getCateringFromServer();
  };
  return (
    <div className=" p-1 ">
      <Form
        className="d-flex flex-column align-items-center justify-content-center text-center gap-2"
        onSubmit={(e) => formSubmit(e)}
      >
        <label
          className=" p-2 card h5 bg-success text-white mb-1 w-100"
          htmlFor="type"
        >
          <button
            onClick={() => backBtn(setFourthStep, setThirdStep)}
            className=" color1 btn p-1 fs-small m-2 btn-light"
          >
            <BsArrowDownRightCircleFill /> חזור לשלב הקודם
          </button>
          מהי כמות הסועדים?
          <input
            type="number"
            required
            placeholder="כמות הסועדים?"
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>

        <button type="submit" className="w-100 fs1 card btn btn-success">
          המשך
        </button>
      </Form>
    </div>
  );
};

export default FourthStep;
