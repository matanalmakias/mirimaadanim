import "./home.css";
import { useNavigate } from "react-router-dom";
import SaladList from "../../components/products/salad/SaladList";
import ShabatFoodList from "../../components/products/shabat-food/ShabatFoodList";
import PackageList from "../../components/products/package/PackageList";
const Home = () => {
  const nav = useNavigate();

  return (
    <div
      className="p-5 d-flex flex-column align-items-center justify-content-center"
      dir="rtl"
    >
      <p>
        כאן תוכל להוסיף מוצרים לסל הפרטי שלך, ולאחר מכן גם לנהל . את הרכישות
        הבאות שלך!
      </p>
      <p>בכל רכישה אתה תצבור נקודות ששוות לכסף!</p>
      <p>בנוסף - כל קניה מעלה את ניסיון הקנייה שלך ותקבל הנחות בהתאם לרמה</p>
      <div className="w-100">
        <PackageList />
      </div>
      <div className="w-100">
        <SaladList />
      </div>
      <div className="w-100">
        <ShabatFoodList />
      </div>
    </div>
  );
};

export default Home;
