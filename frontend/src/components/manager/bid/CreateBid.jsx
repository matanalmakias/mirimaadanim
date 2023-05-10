import React, { useContext, useState } from "react";
import "./style.scss"; // import the CSS file for styling
import ReactQuill from "react-quill";
import { productList2 } from "../../../utils/content";
import bidService from "../../../services/bid/bid.service";
import { toast } from "react-toastify";
import { phoneRegex } from "../../../utils/utils";
import ProductContext from "../../../context/product/ProductContext";
function CreateBid() {
  const [htmlValue, setHtmlValue] = useState("");
  const [bidNameInput, setBidNameInput] = useState(null);
  const [nameInput, setNameInput] = useState(null);
  const [phoneInput, setPhoneInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errMsg, setErrMsg] = useState([]);
  const { allProducts } = useContext(ProductContext);
  const handleProductClick = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((_id) => _id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!phoneRegex.test(phoneInput)) {
      return setErrMsg(`מספר הפאלפון לא תקין !`);
    }
    const formData = new FormData();
    formData.append("title", bidNameInput);
    formData.append("customerName", nameInput);
    formData.append("customerPhone", phoneInput);
    formData.append("customerEmail", emailInput);
    formData.append("content", htmlValue);
    formData.append("products", JSON.stringify(selectedProducts));
    bidService
      .createBid(formData)
      .then((res) => toast(res.data.msg))
      .finally(() => {
        event.target.submit();
        window.location.reload();
      });
  };
  function handleHtmlChange(value) {
    setHtmlValue(value);
  }

  return (
    <form
      className="d-flex justify-content-center text-center align-items-center flex-column gap-2"
      onSubmit={handleSubmit}
    >
      <span className="card">{errMsg}</span>
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

      <div className="row gap-1 w-100 align-items-center justify-content-center">
        <label htmlFor="company" className="text-center col-3 label1 mb-1">
          שיוך מוצרים[חובה]
        </label>
        <div className="">
          <span className=" bg-secondary text-white ">
            שייך את כל המוצרים שמתאימים להכנה של פריט זה!
          </span>
          {allProducts?.map((item, index) => (
            <div key={index} className="card m-1 row p-1">
              <input
                type="checkbox"
                id={item._id}
                className=" col"
                value={item._id}
                checked={selectedProducts.includes(item._id)}
                onChange={() => handleProductClick(item._id)}
              />
              <label className="col" htmlFor={item.id}>
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          הוספת מידע / מכתב
        </label>
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
