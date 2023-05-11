import "./home.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Login from "../../components/login/Login";
import "./style.scss";
import Post from "../../components/posts/Post";
import Products from "../../components/products/Products";
const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();

  if (!isLoggedIn) {
    return <Login />;
  }
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      dir="rtl"
    >
      <div className="row gap-1 p-1 m-1">
        <button
          onClick={() => nav("/services/catering")}
          className="col btn btn-light p-3 fs1"
        >
          לאירועי קייטרינג
        </button>
        <button
          onClick={() => nav("/services/shabat-food")}
          className="col btn btn-light p-3 fs1"
        >
          לאוכל מוכן לשבת
        </button>
        <button
          onClick={() => nav("/services/daily")}
          className="col btn btn-light p-3 fs1"
        >
          לארוחות יומיומיות
        </button>
      </div>
      <Products />
      <Post />
      <ToastContainer autoClose={700} />
    </div>
  );
};

export default Home;
