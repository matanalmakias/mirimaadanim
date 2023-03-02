import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import "./user-management.css";
import storeService from "../../services/store.service";
import { SocketContext } from "../../context/CateringContext";
import { ToastContainer, toast } from "react-toastify";
import authService from "../../services/auth.service";

const UserManagement = () => {
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [showEmailUpdate, setShowEmailUpdate] = useState(false);
  const [showWorkerUpdate, setShowWorkerUpdate] = useState(false);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [workerInput, setWorkerInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);
  const inputRef = useRef(null);

  const { userData } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const sendWorker = async () => {
    setShowAddWorker((state) => !state);
    await storeService.sendWorker(workerInput).then((res) => {
      toast(res.data.message);
    });
    socket.emit("update");
  };
  useEffect(() => {
    console.log(emailInput, passwordInput);
  }, [emailInput, passwordInput]);
  const deleteWorkerPermanently = async (workerId) => {
    await storeService.deleteWorkerPermanently(workerId);
    return socket.emit("update");
  };
  const openWorkerField = async () => {
    setShowAddWorker((state) => !state);
  };

  const toggleShow = (setState) => {
    setState((state) => !state);
  };

  return (
    <>
      {/* <---------------- Email Input --------------> */}
      <div className="text-center">
        <span className="fw-bold">אימייל</span>
        <div className="gap-2 p-1 d-flex justify-content-center">
          <span className="card p-2"> {userData?.email}</span>
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
            onChange={(e) => setEmailInput(e.target.value)}
            className="form-control"
            type="email"
            required
            placeholder="הכנס אימייל חדש"
          />
          <Button onClick={() => authService.editEmail(emailInput)}>שלח</Button>
        </div>

        {/* <---------------- Password Input --------------> */}

        <span className="fw-bold">סיסמא</span>
        <div className="gap-2 p-1 d-flex justify-content-center">
          <span className="card p-2"> ***********************</span>
          <p
            onClick={() => toggleShow(setShowPasswordUpdate)}
            className="btn bg-dark text-white mt-2"
          >
            עריכה
          </p>
        </div>
        <div
          className={
            showPasswordUpdate
              ? "p-2 d-flex justify-content-center gap-2"
              : "hide_class"
          }
        >
          <input
            onChange={(e) => setPasswordInput(e.target.value)}
            className="form-control"
            type="password"
            required
            placeholder="הכנס סיסמא חדש"
          />
          <Button onClick={() => authService.editPassword(passwordInput)}>
            שלח
          </Button>
        </div>

        {/* <---------------- workers Input --------------> */}

        <div className="p-4 d-flex justify-content-center">
          <span className="" style={{ fontSize: `13px` }}>
            מעוניין להוסיף שמות של עובדים?
          </span>
          <br />
          <span className="">
            <Button
              onClick={() => openWorkerField()}
              className=""
              style={{ fontSize: `12px`, padding: `2px` }}
            >
              {showAddWorker ? "סגור" : "הוסף שם"}
            </Button>
          </span>
        </div>
        <div
          className={
            showAddWorker
              ? "card p-3 d-flex justify-content-center"
              : "hide_class"
          }
        >
          <input
            ref={inputRef}
            type="text"
            className="form-control p-2 mb-1 text-center"
            onChange={(e) => setWorkerInput(e.target.value)}
            required
            placeholder="הכנס שם עובד"
          />
          <Button
            variant="success"
            className="p-1 mt-1"
            onClick={() => {
              sendWorker();
            }}
          >
            שלח
          </Button>
        </div>
        <span className="fw-bold">עובדים</span>
        <div className="p-4">
          <div className="d-flex flex-row gap-1">
            {userData?.workers.map((item) => (
              <div key={item.id} className="card p-1">
                <p className=""> {item.name}</p>
                <p
                  onClick={() => deleteWorkerPermanently(item.id)}
                  className="btn card bg-secondary p-1 text-white"
                >
                  מחיקה
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1370} />
    </>
  );
};

export default UserManagement;
