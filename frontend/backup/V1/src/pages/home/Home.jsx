import "./home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const nav = useNavigate();
  return (
    <div
      className="p-2 d-flex flex-column align-items-center justify-content-center"
      dir="rtl"
    >
      <p onClick={() => nav("/products")} className="my_btn2 m-1  p-1">
        לתפריט
      </p>
      {/* <p onClick={() => nav("/")} className="my_btn2 m-1  p-1">
        להזמנת קייטרינג{" "}
      </p>
      <p onClick={() => nav("/")} className="my_btn2 m-1  p-1">
        מארזי סלטים לשישי ולחגים
      </p>
      <p onClick={() => nav("/")} className="my_btn2 m-1  p-1">
        מפעלים
      </p>
      <p onClick={() => nav("/")} className="my_btn2 m-1  p-1">
        אוכל מוכן לשבת
      </p>
      <p onClick={() => nav("/")} className="my_btn2 m-1  p-1">
        מגשי אירוח
      </p> */}
    </div>
  );
};

export default Home;
