import "./home.css";
import { useNavigate } from "react-router-dom";
import SaladList from "../../components/products/salad/SaladList";
import ShabatFoodList from "../../components/products/shabat-food/ShabatFoodList";
const Home = () => {
  const nav = useNavigate();

  return (
    <div
      className="p-5 d-flex flex-column align-items-center justify-content-center"
      dir="rtl"
    >
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
