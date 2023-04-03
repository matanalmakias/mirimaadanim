import React, { useContext, useState } from "react";
import authService from "../../services/auth.service";
import AuthContext from "../../context/AuthContext";
import { SocketContext } from "../../context/CateringContext";

const Login = () => {
  const [phoneInput, setPhoneInput] = useState(0);
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
  const toggleShowTryLogin = () => {
    setShowTryLogin((state) => !state);
  };
  return (
    <div>
      <div className={showTryLogin ? "bg-light" : "hide_class"}>
        <input
          type="tel"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          onChange={(e) => setPhoneInput(e.target.value)}
          required
          className="form-control mb-1"
          placeholder="הכנס מס פלאפון"
        />
        <p onClick={() => handleTryLogin()} className="btn btn-dark">
          שלח לי קוד לנייד
        </p>
      </div>

      {/*<----------- Final Login------------> */}
      <div className={showTryLogin === false ? "bg-light" : "hide_class"}>
        <p className="bg-dark p-1">הקוד נשלח אליך לנייד</p>
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
