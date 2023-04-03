import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { StoreContext } from "../../context/StoreContext";
import "./navbar.css";
import logo from "../../images/logo.png";
import Login from "../../components/login/Login";

const NavBar = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const { isLoggedIn, logout, isManager } = useContext(AuthContext);
  const { checkout, cart } = useContext(StoreContext);
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
  const toggleShowNavBar = () => {
    setShowNavBar((state) => !state);
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
          onClick={() => toggleShowNavBar()}
          class="ri-menu-line nav_toggle"
        ></i>
      </div>

      <div className={showNavBar ? "text-center" : "hide_class"} dir="rtl">
        <ul className="p-1 d-flex flex-column gap-1">
          <li
            className="navbar-item bg-info text-white"
            onClick={() => {
              nav("/");
              toggleShowNavBar();
            }}
          >
            דף הבית
          </li>
          <li className="navbar-item bg-info text-white" href="#about">
            אודות
          </li>
          <li className="navbar-item bg-info text-white" href="#contact">
            צור קשר
          </li>
          {isLoggedIn && (
            <li
              className="navbar-item bg-info text-white"
              onClick={() => {
                nav("/user/cart");
                toggleShowNavBar();
              }}
            >
              סל קניות
            </li>
          )}

          {isLoggedIn === false ? (
            <>
              <li className="navbar-item bg-info text-white">
                <Login />
              </li>
            </>
          ) : (
            <li
              className="navbar-item bg-info text-white"
              onClick={() => {
                logoutButton();
                toggleShowNavBar();
              }}
            >
              התנתקות
            </li>
          )}
          {isLoggedIn && (
            <li
              className="navbar-item bg-info text-white"
              onClick={() => {
                nav("/user-management");
                toggleShowNavBar();
              }}
            >
              ניהול חשבון
            </li>
          )}
          {isManager && (
            <li
              className="navbar-item bg-info text-white"
              onClick={() => {
                nav("/manager");
                toggleShowNavBar();
              }}
            >
              כניסה למנהלים
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
