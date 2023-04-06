import React, { useState } from "react";
import "./style.scss";
import { Form } from "react-bootstrap";
import userService from "../../../services/user/user.service";
import { toast } from "react-toastify";
const UpdateAddress = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [groundFloor, setGroundFloor] = useState(false);
  const [buildingApart, setBuildingApart] = useState(false);
  const [groundStreet, setGroundStreet] = useState();
  const [groundCity, setGroundCity] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const [floor, setFloor] = useState();
  const [apart, setApart] = useState();

  const toggleShowComponent = () => {
    setShowComponent((state) => !state);
  };
  const toggleGroundFloor = () => {
    setGroundFloor((state) => !state);
  };
  const toggleBuildingApart = () => {
    setBuildingApart((state) => !state);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (groundFloor) {
      formData.append("city", groundCity);
      formData.append("street", groundStreet);
    } else {
      formData.append("city", city);
      formData.append("street", street);
      formData.append("floor", floor);
      formData.append("apart", apart);
    }
    console.log(formData);
    await userService
      .updateAddress(formData)
      .then((res) => toast(res.data.message));
  };
  return (
    <div>
      <p onClick={() => toggleShowComponent()} className="address-update-btn">
        ערוך כתובת למשלוח
      </p>
      <div className={showComponent ? "" : "hide_class"}>
        <div className="d-flex flex-row gap-2 justify-content-center align-items-center">
          <p
            className="building-or-floor"
            onClick={() => toggleBuildingApart()}
          >
            {buildingApart ? `סגור` : `בניין`}
          </p>
          <p className="building-or-floor" onClick={() => toggleGroundFloor()}>
            {groundFloor ? `סגור` : `קרקע`}
          </p>
        </div>
        <div className={groundFloor ? "" : "hide_class"}>
          <Form onSubmit={(e) => submitForm(e)}>
            <input
              onChange={(e) => setGroundCity(e.target.value)}
              className="form-control"
              type="text"
              required
              placeholder="עיר"
            />
            <input
              onChange={(e) => setGroundStreet(e.target.value)}
              className="form-control"
              type="text"
              required
              placeholder="רחוב"
            />
            <button className="form-control" type="submit">
              עדכן כתובת
            </button>
          </Form>
        </div>
        <div className={buildingApart ? "" : "hide_class"}>
          <Form>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
              type="text"
              required
              placeholder="עיר"
            />
            <input
              onChange={(e) => setStreet(e.target.value)}
              className="form-control"
              type="text"
              required
              placeholder="רחוב"
            />
            <input
              onChange={(e) => setFloor(e.target.value)}
              className="form-control"
              type="number"
              required
              placeholder="קומה"
            />
            <input
              onChange={(e) => setApart(e.target.value)}
              className="form-control"
              type="number"
              required
              placeholder="דירה"
            />
            <button className="form-control" type="submit">
              עדכן כתובת
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
