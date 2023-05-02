import React, { useContext, useState } from "react";
import authService from "../../services/auth.service";
import AuthContext from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import "./login.css";
import { toast } from "react-toastify";
const Login = () => {
  const [phoneInput, setPhoneInput] = useState(0);
  const [existCode, setExistCode] = useState(0);
  const [verfCodeInput, setVerfCodeInput] = useState(0);
  const [showTryLogin, setShowTryLogin] = useState(true);
  const { login } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const handleTryLogin = async () => {
    if (/^\d{10}$/.test(phoneInput)) {
      authService.tryLogin(phoneInput).then((res) => {
        toggleShowTryLogin();
      });
    } else {
      // display an error message to the user
    }
  };

  // <<-------------- Final Login ----------------->>
  const handleFinalLogin = async () => {
    if (/^\d{10}$/.test(phoneInput)) {
      authService
        .finalLogin(phoneInput, verfCodeInput)
        .then((res) => login(res.accessToken));
    } else {
      // display an error message to the user
    }
  };
  // <<--------------  Login with exist code ----------------->>
  const handleExistLogin = async () => {
    if (/^\d{6}$/.test(existCode) && /^\d{10}$/.test(phoneInput)) {
      authService
        .existCodeLogin(phoneInput, existCode)
        .then((res) => login(res.accessToken))
        .finally(() => toast(`התחברת בהצלחה!`));
    } else {
      // display an error message to the user
    }
  };
  const toggleShowTryLogin = () => {
    setShowTryLogin((state) => !state);
  };
  return (
    <div>
      <p className="mb-1 login-p text-white">
        כדי לקבל קוד חודש - הכנס מס פאלפון ולחץ על "שלח לי קוד לנייד"
      </p>
      <p className=" login-p text-white">
        אם קיבלתה קוד ושמרתה אותו הכנס אותו, גם את מס' הפלאפון ולחץ על "התחבר עם
        קוד קיים"
      </p>
      <div className={showTryLogin ? "bg-light d-flex flex-row" : "hide_class"}>
        <input
          type="tel"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          onChange={(e) => setPhoneInput(e.target.value)}
          className="form-control mb-1"
          placeholder="הכנס מס פלאפון"
        />
        <input
          type="number"
          pattern="\d{6}"
          onChange={(e) => setExistCode(e.target.value)}
          className="form-control mb-1"
          placeholder="הקלד קוד קיים"
        />
      </div>
      <div
        className={
          showTryLogin
            ? "bg-light d-flex flex-row justify-content-center  gap-1 align-items-center"
            : "hide_class"
        }
      >
        <p onClick={() => handleTryLogin()} className="btn btn-dark">
          שלח לי קוד לנייד
        </p>
        <p onClick={() => handleExistLogin()} className="btn btn-dark">
          התחבר באמצעות קוד קיים
        </p>
      </div>

      {/*<----------- Final Login------------> */}
      <div className={showTryLogin === false ? "bg-light" : "hide_class"}>
        <p className=" card p-1">הקוד נשלח אליך לנייד</p>
        <input
          type="number"
          pattern="[0-9]{6}"
          onChange={(e) => setVerfCodeInput(e.target.value)}
          required
          className="form-control mb-1"
          placeholder="הקלד את הקוד"
        />
        <p onClick={() => handleFinalLogin()} className="btn btn-dark">
          התחבר
        </p>
      </div>
    </div>
  );
};

export default Login;
