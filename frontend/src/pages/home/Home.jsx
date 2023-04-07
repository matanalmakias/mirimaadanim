import "./home.css";
import { useNavigate } from "react-router-dom";
import SaladList from "../../components/products/salad/SaladList";
import ShabatFoodList from "../../components/products/shabat-food/ShabatFoodList";
import PackageList from "../../components/products/package/PackageList";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Login from "../../components/login/Login";
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
      <div className="d-flex flex-column">
        <p className="home-p mb-1">
          כאן תוכל להוסיף מוצרים לסל הפרטי שלך, ולאחר מכן גם לנהל . את הרכישות
          הבאות שלך!
        </p>
        <p className="home-p mb-1">בכל רכישה אתה תצבור נקודות ששוות לכסף!</p>
        <p className="home-p">
          בנוסף - כל קניה מעלה את ניסיון הקנייה שלך ותקבל הנחות בהתאם לרמה
        </p>
      </div>
      <div className="w-100">
        <PackageList />
      </div>
      <div className="w-100">
        <SaladList />
      </div>
      <div className="w-100">
        <ShabatFoodList />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
