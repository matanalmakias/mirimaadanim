import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
const eventTypes = [
  `חינה`,
  "יום הולדת",
  "ברית/ה",
  "אזכרה",
  "שבת חתן",
  "בר/ת מצווה",
  "עלייה לתורה",
  "הצעת נישואין",
  "אחר",
];
const ThirdStep = ({
  setThirdStep,
  setFourthStep,
  setStepResults,
  getCateringFromServer,
}) => {
  const [eventType, setEventType] = useState(null);
  const [anotherType, setAnotherType] = useState(false);
  const [anotherEventType, setAnotherEventType] = useState(null);
  useEffect(() => {
    if (eventType === `אחר`) {
      setAnotherType((s) => !s);
    }
  }, [eventType]);

  const formSubmit = async (e) => {
    e.preventDefault();
    // setThirdStep((s) => !s);
    // setFourthStep((s) => !s);
    await setStepResults((s) => ({
      ...s,
      thirdStep: anotherEventType === null ? eventType : anotherEventType,
    }));

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
          מהו סוג האירוע שאנחנו מדברים עליו?
          <select
            onChange={(e) => setEventType(e.target.value)}
            required
            className="form-control text-center fs1"
            name="eventType"
            id="eventType"
          >
            <option disabled selected>
              בחר סוג אירוע
            </option>
            {eventTypes?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          {anotherType && (
            <input
              type="text"
              className="text-center"
              onChange={(e) => setAnotherEventType(e.target.value)}
              placeholder="מה סוג האירוע שלך?"
            />
          )}
        </label>

        <button type="submit" className="w-100 fs1 card btn btn-success">
          המשך
        </button>
      </Form>
    </div>
  );
};

export default ThirdStep;
