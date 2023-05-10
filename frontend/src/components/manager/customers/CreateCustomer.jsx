import React, { useState } from "react";
import "./style.scss"; // import the CSS file for styling
import customerService from "./../../../services/customer/customer.service";
import { toast } from "react-toastify";
import { phoneRegex } from "../../../utils/utils";
function CreateCustomer() {
  const [addressInput, setAddressInput] = useState(null);
  const [nameInput, setNameInput] = useState(null);
  const [phoneInput, setPhoneInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!phoneRegex.test(phoneInput)) {
      return setErrMsg(`מספר הפאלפון לא תקין !`);
    }
    const formData = new FormData();
    formData.append("name", nameInput);
    formData.append("email", emailInput);
    formData.append("phone", phoneInput);
    formData.append("address", addressInput);

    customerService
      .createCustomer(formData)
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
      <span className="card">{errMsg}</span>
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
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          כתובת
        </label>
        <input
          onChange={(e) => setAddressInput(e.target.value)}
          type="text"
          required
          placeholder="הכנס כתובת של הלקוח"
          className="text-center col-8"
        />
      </div>

      <button className="w-50" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateCustomer;
