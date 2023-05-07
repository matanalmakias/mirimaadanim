import React, { useState } from "react";
import "./style.scss"; // import the CSS file for styling
import ReactQuill from "react-quill";
function CreateProduct() {
  const [productNameInput, setProductNameInput] = useState(null);
  const [descInput, setDescInput] = useState(null);
  const [priceInput, setPriceInput] = useState(null);
  const [images, setImages] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };
  function handleImageUpload(e) {
    const files = e.target.files;
    const images = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        images.push(reader.result);
        setImages(images);
      };
    }
  }

  return (
    <form
      className="d-flex justify-content-center text-center align-items-center flex-column gap-2"
      onSubmit={handleSubmit}
    >
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          שם מוצר
        </label>
        <input
          type="text"
          required
          onChange={(e) => setProductNameInput(e.target.value)}
          placeholder="תן שם למוצר"
          className="text-center col-8"
        />
      </div>
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          תיאור מוצר
        </label>
        <input
          type="text"
          required
          onChange={(e) => setDescInput(e.target.value)}
          placeholder="הכנס תיאור מוצר"
          className="text-center col-8"
        />
      </div>
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          מחיר מוצר
        </label>
        <input
          onChange={(e) => setPriceInput(e.target.value)}
          type="number"
          required
          placeholder="הכנס מחיר למוצר"
          className="text-center col-8"
        />
      </div>
      <div className="row gap-1 w-100">
        <label htmlFor="images" className="col-3 label1 mb-1">
          תמונות
        </label>
        <input
          onChange={(e) => handleImageUpload(e)}
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple={true}
          className="text-center  form-control w_70 "
        />
      </div>

      <button className="w-50 m-2" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateProduct;
