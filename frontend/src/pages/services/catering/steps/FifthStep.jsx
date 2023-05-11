import React from "react";
import { BsArrowDownRightCircleFill } from "react-icons/bs";

const FifthStep = ({ stepResults, backBtn, setFifthStep, setFourthStep }) => {
  console.log(stepResults);
  return (
    <div className=" p-1 ">
      <label
        className=" p-2  card h5 bg-success text-white mb-1 w-100"
        htmlFor="type"
      >
        <button
          onClick={() => backBtn(setFifthStep, setFourthStep)}
          className=" color1 btn p-1 fs-small m-2 btn-light"
        >
          <BsArrowDownRightCircleFill /> חזור לשלב הקודם
        </button>
        <span className="form-label bg-light p-2 color1">
          פרטי הרקע לפני קבלת הצעות מחיר
        </span>
        <div className="row bg1 p-3 m-1">
          <label className="col" htmlFor="location">
            <p className="m-1">
              המיקום שלך:
              <span className="m-2 bg-light color1 fs-small p-1">
                {stepResults.firstStep}
              </span>
            </p>
          </label>
          <label className="col" htmlFor="location">
            <p className="m-1">
              תאריך יעד:
              <span className="m-2 bg-light color1 fs-small p-1">
                {stepResults.secondStep === false
                  ? "לא נקבע"
                  : stepResults.secondStep}
              </span>
            </p>
          </label>
          <label className="col" htmlFor="location">
            <p className="m-1">
              סוג האירוע:
              <span className="m-2 bg-light color1 fs-small p-1">
                {stepResults.thirdStep}
              </span>
            </p>
          </label>
          <label className="col" htmlFor="location">
            <p className="m-1">
              כמות סועדים:
              <span className="m-2 bg-light color1 fs-small p-1">
                {stepResults.fourthStep}
              </span>
            </p>
          </label>
        </div>
      </label>

      <button type="submit" className="w-100  p-2 btn-primary">
        המשך לקבלת תפריטים בהתאמה אישית
      </button>
    </div>
  );
};

export default FifthStep;
