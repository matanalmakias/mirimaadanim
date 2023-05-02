import "./home.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Login from "../../components/login/Login";
import "./style.scss";
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
      <ToastContainer autoClose={700} />
    </div>
  );
};

export default Home;
