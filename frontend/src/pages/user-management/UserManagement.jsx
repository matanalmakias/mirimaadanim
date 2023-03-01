import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import "./user-management.css";

const UserManagement = () => {
  const [showEmailUpdate, setShowEmailUpdate] = useState(false);
  const { userData } = useContext(AuthContext);
  console.log(userData);

  const toggleShow = (setState) => {
    setState((state) => !state);
  };
  return (
    <>
      {/* <---------------- Email Input --------------> */}
      <div className="text-center">
        <span className="fw-bold">אימייל</span>
        <div className="gap-2 p-1 d-flex justify-content-center">
          <span className="card p-2"> {userData.email}</span>
          <p
            onClick={() => toggleShow(setShowEmailUpdate)}
            className="btn bg-dark text-white mt-2"
          >
            עריכה
          </p>
        </div>
        <div
          className={
            showEmailUpdate
              ? "p-2 d-flex justify-content-center gap-2"
              : "hide_class"
          }
        >
          <input
            className="form-control"
            type="email"
            required
            placeholder="הכנס אימייל חדש"
          />
          <Button>שלח</Button>
        </div>

        {/* <---------------- Password Input --------------> */}

        <span className="fw-bold">סיסמא</span>
        <div className="gap-2 p-1 d-flex justify-content-center">
          <span className="card p-2"> ***********************</span>
          <p
            onClick={() => toggleShow(setShowEmailUpdate)}
            className="btn bg-dark text-white mt-2"
          >
            עריכה
          </p>
        </div>
        <div
          className={
            showEmailUpdate
              ? "p-2 d-flex justify-content-center gap-2"
              : "hide_class"
          }
        >
          <input
            className="form-control"
            type="email"
            required
            placeholder="הכנס אימייל חדש"
          />
          <Button>שלח</Button>
        </div>

        {/* <---------------- workers Input --------------> */}

        <span className="fw-bold">אימייל</span>
        <div className="gap-2 p-1 d-flex justify-content-center">
          <span className="card p-2"> {userData.email}</span>
          <p
            onClick={() => toggleShow(setShowEmailUpdate)}
            className="btn bg-dark text-white mt-2"
          >
            עריכה
          </p>
        </div>
        <div
          className={
            showEmailUpdate
              ? "p-2 d-flex justify-content-center gap-2"
              : "hide_class"
          }
        >
          <input
            className="form-control"
            type="email"
            required
            placeholder="הכנס אימייל חדש"
          />
          <Button>שלח</Button>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
