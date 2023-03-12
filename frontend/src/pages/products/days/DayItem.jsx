import "./style.css";
import ShekelIcon from "./../../../components/shekel/ShekelIcon";
import { useContext, useEffect, useState } from "react";
import ScheduleItem from "../../../components/schudleItem/Schudle";
import AuthContext from "./../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DayItem = ({ item }) => {
  const [showSchudle, setShowSchudle] = useState(false);
  const [showSchudleButton, setShowSchudleButton] = useState(true);
  const [isProductInCart, setIsProductInCart] = useState(false);

  const { selfUser } = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(() => {
    const product = selfUser?.weeklyCart?.find(
      (product) => product.product === item._id
    );
    if (product) {
      setIsProductInCart(true);
    } else {
      setIsProductInCart(false);
    }
  }, [selfUser, item._id]);
  const toogleShowSchudle = () => {
    setShowSchudle((state) => !state);
    setShowSchudleButton((state) => !state);
  };
  const toogleShowSchudleButton = () => {
    setShowSchudle((state) => !state);
    setShowSchudleButton((state) => !state);
  };

  return (
    <div className="p-1 d-flex align-items-center justify-content-center">
      {isProductInCart ? (
        <>
          <p className="p-1"> {item.title} מוצר זה נמצא בסל הקניות!</p>
          <p
            onClick={() => nav(`/product/${item._id}`)}
            className="p-1 btn btn-info"
          >
            לפרטים
          </p>
        </>
      ) : (
        <div>
          <div className=" item shadow p-2  d-flex flex-row">
            <p className="p-1 shadow">שם מוצר</p>
            <i class="p-1 ri-arrow-left-circle-fill"></i>
            <p className="shadow p-1"> {item.title}</p>
            <i class="p-1 ri-separator"></i>
            <p className="p-1 shadow">מחיר</p>
            <i class="p-1 ri-arrow-left-circle-fill"></i>
            <p className="shadow">
              {item.price}
              <ShekelIcon />
            </p>
            <div className={showSchudleButton ? "" : "hide_class"}>
              <p
                className="btn fs-6"
                onClick={() => {
                  toogleShowSchudleButton();
                }}
              >
                תזמן מוצר
              </p>
            </div>
            <div className={showSchudle ? "" : "hide_class"}>
              <ScheduleItem item={item} toggle={toogleShowSchudle} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayItem;
