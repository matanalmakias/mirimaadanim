import "./style.css";
import ShekelIcon from "../../../components/shekel/ShekelIcon";
import { useContext, useEffect, useState } from "react";
import ScheduleItem from "../../../components/schudleItem/Schudle";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import cartService from "../../../services/cart.service";
import { toast } from "react-toastify";
import { SocketContext } from "../../../context/CateringContext";

const Item = ({ socketFunc, item }) => {
  const [showSchudle, setShowSchudle] = useState(false);
  const [showSchudleButton, setShowSchudleButton] = useState(true);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const socket = useContext(SocketContext);
  const { selfUser } = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(() => {
    const product = selfUser?.cart?.find(
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
  const addToCart = async () => {
    cartService.addToCart(item._id).then((res) => {
      toast(res.data.message);
      socketFunc();
    });
  };
  const removeFromCart = async () => {
    cartService.removeFromCart(item._id).then((res) => {
      toast(res.data.message);
      socketFunc();
    });
  };
  return (
    <div className=" d-flex align-items-center justify-content-center">
      {isProductInCart ? (
        <div className=" mt-3 d-flex flex-row gap-1">
          <p className="p-1 bg-dark text-light ">
            {item.title} מוצר זה נמצא בסל הקניות!
          </p>
          <p
            onClick={() => nav(`/product/${item._id}`)}
            className="p-1 btn btn-info"
          >
            לפרטים
          </p>
          <p onClick={() => removeFromCart()} className="p-1 btn btn-danger">
            הסר מהסל
          </p>
        </div>
      ) : (
        <div className="">
          <div className=" item shadow p-2  d-flex flex-row">
            <p className="bg-dark text-light p-2 shadow ">שם מוצר</p>
            <i class="p-1 ri-arrow-left-circle-fill"></i>
            <p className="bg-dark text-light shadow p-2 ">{item.title}</p>
            <i class="p-1 ri-separator"></i>
            <p className="bg-dark text-light p-2 shadow ">מחיר</p>
            <i class="p-1 ri-arrow-left-circle-fill"></i>
            <p className=" bg-dark text-light shadow p-1">
              {item.price}
              <ShekelIcon />
            </p>
            <i class="p-1 ri-separator"></i>
            <div className="d-flex flex-row gap-2 p-1 rounded">
              {/* <div className={showSchudleButton ? "" : "hide_class"}>
                <p
                  className="btn text-light bg-info p-2  fs-6"
                  onClick={() => {
                    toogleShowSchudleButton();
                  }}
                >
                  תזמן מוצר
                </p>
              </div>
              <div className={showSchudle ? "" : "hide_class"}>
                <ScheduleItem item={item} toggle={toogleShowSchudle} />
              </div> */}
              <p
                onClick={() => addToCart()}
                className="btn text-light p-1 btn-success"
              >
                הוסף לסל
              </p>
            </div>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default Item;
