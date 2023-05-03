import React, { useState } from "react";
import "./style.scss"; // import the CSS file for styling
import ReactQuill from "react-quill";
function CreateBid() {
  const [htmlValue, setHtmlValue] = useState("");
  const [postTitleInput, setPostTitleInput] = useState(null);
  const [postTopicInput, setPostTopicInput] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };
  function handleHtmlChange(value) {
    setHtmlValue(value);
  }
  const tagsHandle = (e) => {
    let input = e.target.value;
    const words = input.split(" ");
    setPostTopicInput(words);
  };

  return (
    <form
      className="d-flex justify-content-center text-center align-items-center flex-column gap-2"
      onSubmit={handleSubmit}
    >
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          כותרת פוסט
        </label>
        <input
          type="text"
          required
          onChange={(e) => setPostTitleInput(e.target.value)}
          placeholder="תן כותרת לפוסט"
          className="text-center col-8"
        />
      </div>
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          נושאים
        </label>
        <input
          type="text"
          required
          onChange={(e) => tagsHandle(e)}
          placeholder="באיזה נושא מתעסק הפוסט? הקלד רווח אחרי כל נושא [כל נושא צריך להיות מחובר ללא רווחים]"
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
