import React, { useState } from "react";
import "./style.scss";
import { Form } from "react-bootstrap";
const UpdateAddress = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [groundFloor, setGroundFloor] = useState(false);
  const [buildingApart, setBuildingApart] = useState(false);
  const toggleShowComponent = () => {
    setShowComponent((state) => !state);
  };
  const toggleGroundFloor = () => {
    setGroundFloor((state) => !state);
  };
  const toggleBuildingApart = () => {
    setBuildingApart((state) => !state);
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
          <Form>
            <input
              className="form-control"
              type="text"
              required
              placeholder="עיר"
            />
            <input
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
              className="form-control"
              type="text"
              required
              placeholder="עיר"
            />
            <input
              className="form-control"
              type="text"
              required
              placeholder="רחוב"
            />
            <input
              className="form-control"
              type="number"
              required
              placeholder="קומה"
            />
            <input
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
