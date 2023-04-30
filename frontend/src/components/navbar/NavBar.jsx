import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import "./navbar.css";
import logo from "../../images/logo.png";
import Login from "../../components/login/Login";

const NavBar = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const { isLoggedIn, logout, isManager } = useContext(AuthContext);

  const nav = useNavigate();
  const logoutButton = async () => {
    try {
      authService.logout();
      nav("/");
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="spacer p-1"></div>
      <div className="gap-4 d-flex flex-column justify-content-center align-items-center text-center bg-light p-2">
        <img
          className="nav_logo"
          onClick={() => {
            nav("/");
          }}
          style={{ width: `35%` }}
          src={logo}
          alt=""
        />

        <i
          className="ri-menu-line nav_toggle"
          onClick={() => setShowNavBar((s) => !s)}
        ></i>
      </div>
      {showNavBar && (
        <>
          {isLoggedIn && (
            <div className="text-center" dir="rtl">
              <ul className="p-1 row gap-1">
                <li
                  className=" col navbar-item bg-info text-white"
                  onClick={() => {
                    nav("/");
                  }}
                >
                  דף הבית
                </li>

                <li
                  className=" col navbar-item bg-info text-white"
                  onClick={() => {
                    nav("/cart");
                  }}
                >
                  סל קניות
                </li>

                <li
                  className=" col navbar-item bg-info text-white"
                  onClick={() => {
                    logoutButton();
                  }}
                >
                  התנתקות
                </li>

                <li
                  className=" col navbar-item bg-info text-white"
                  onClick={() => {
                    nav("/user-management");
                  }}
                >
                  ניהול חשבון
                </li>

                {isManager && (
                  <li
                    className=" col navbar-item bg-info text-white"
                    onClick={() => {
                      nav("/manager");
                    }}
                  >
                    כניסה למנהלים
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NavBar;
