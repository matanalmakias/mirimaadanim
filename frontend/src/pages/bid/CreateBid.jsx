import React, { useState } from "react";
import "./style.scss"; // import the CSS file for styling
import ReactQuill from "react-quill";
function CreateBid() {
  const [htmlValue, setHtmlValue] = useState("");
  const [bidNameInput, setBidNameInput] = useState(null);
  const [nameInput, setNameInput] = useState(null);
  const [phoneInput, setPhoneInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };
  function handleHtmlChange(value) {
    setHtmlValue(value);
  }

  return (
    <form
      className="d-flex justify-content-center text-center align-items-center flex-column gap-2"
      onSubmit={handleSubmit}
    >
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          שם הצעת מחיר
        </label>
        <input
          type="text"
          required
          onChange={(e) => setBidNameInput(e.target.value)}
          placeholder="תן שם להצעת המחיר"
          className="text-center col-8"
        />
      </div>
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          שם הלקוח
        </label>
        <input
          type="text"
          required
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="הכנס שם לקוח"
          className="text-center col-8"
        />
      </div>
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          מס' פלאפון לקוח
        </label>
        <input
          onChange={(e) => setPhoneInput(e.target.value)}
          type="tel"
          required
          placeholder="הכנס מס' פלאפון של הלקוח"
          className="text-center col-8"
        />
      </div>
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          אימייל לקוח
        </label>
        <input
          onChange={(e) => setEmailInput(e.target.value)}
          type="email"
          required
          placeholder="הכנס אימייל של הלקוח"
          className="text-center col-8"
        />
      </div>

      <div className="p-2 w-100">
        <ReactQuill
          className="bg-light w-100 "
          id="htmlInput"
          required
          value={htmlValue}
          onChange={handleHtmlChange}
        />
      </div>
      <button className="w-50" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateBid;
