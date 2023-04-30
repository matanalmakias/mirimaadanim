import "./home.css";
import { useNavigate, useParams } from "react-router-dom";
import SaladList from "../../components/products/salad/SaladList";
import ShabatFoodList from "../../components/products/shabat-food/ShabatFoodList";
import PackageList from "../../components/products/package/PackageList";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Login from "../../components/login/Login";
import "./style.scss";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Catering from "../../components/catering/Catering";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();

  if (!isLoggedIn) {
    return <Login />;
  }
  return (
    <div
      className="p-5 d-flex flex-column align-items-center justify-content-center"
      dir="rtl"
    >
      <Catering />
      <ToastContainer autoClose={700} />
    </div>
  );
};

export default Home;
