import React, { useState } from "react";
import "./style.scss"; // import the CSS file for styling
import ReactQuill from "react-quill";
import postService from "../../../services/post/post.service";
import { toast } from "react-toastify";
function CreateBid() {
  const [htmlValue, setHtmlValue] = useState("");
  const [postTitleInput, setPostTitleInput] = useState(null);
  const [postTopicInput, setPostTopicInput] = useState(null);
  const [images, setImages] = useState(null);

  function handleHtmlChange(value) {
    setHtmlValue(value);
  }
  const tagsHandle = (e) => {
    let input = e.target.value;
    const words = input.split(" ");
    setPostTopicInput(words);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", htmlValue);
    formData.append("title", postTitleInput);
    formData.append("tags", postTopicInput);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    postService
      .createPost(formData)
      .then((res) => toast(res.data.msg))
      .finally(() => {
        event.target.submit();

        window.location.reload();
      });
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
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          תמונות
        </label>
        <input
          onChange={(e) => setImages(e.target.files)}
          type="file"
          accept="image/*"
          multiple
          className="text-center form-control  w_70 "
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
