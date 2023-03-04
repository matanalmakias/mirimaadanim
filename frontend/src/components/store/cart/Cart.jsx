import React, { useRef, useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import { Row, Col, Button } from "react-bootstrap";
import "./cart.css";
import CartItem from "./CartItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../context/CateringContext";
import OrderItem from "../order-package/OrderItem";
import storeService from "../../../services/store.service";
import { ToastContainer, toast } from "react-toastify";
const Cart = () => {
  const [cartState, setCartState] = useState();
  const [orderPackageData, setOrderPackageData] = useState(null);
  const [workerInput, setWorkerInput] = useState(null);
  const [showOrder, setShowOrder] = useState(false);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const nav = useNavigate();
  const socket = useContext(SocketContext);
  const inputRef = useRef(null);
  const submitOrderPackage = async () => {
    await axios
      .post(
        "http://localhost:3001/api/cart/createOrderPackage",
        {},
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        setOrderPackageData(res.data);
      })
      .finally(() => {
        setShowOrder(true);
      });
    socket.emit("update");
  };

  const { cart } = useContext(StoreContext);

  // if (orderPackageData !== null) {
  //   nav(`/order/${orderPackageData.order._id}`);
  // }

  if (cart === undefined || !cart) return <>סל הקניות ריק.</>;

  const sendWorker = async () => {
    setShowAddWorker((state) => !state);
    await storeService.sendWorker(workerInput).then((res) => {
      toast(res.data.message);
    });
    socket.emit("update");
  };

  const openWorkerField = async () => {
    setShowAddWorker((state) => !state);
  };
  return (
    <>
      <div dir="rtl" className=" p-4 d-flex justify-content-center">
        <span className="" style={{ fontSize: `15px` }}>
          מעוניין להוסיף שמות של עובדים?
        </span>
        <br />
        <span className="">
          <Button
            onClick={() => openWorkerField()}
            className="mb-1"
            style={{ fontSize: `12px`, padding: `3px` }}
          >
            {showAddWorker ? "סגור" : "הוסף שם"}
          </Button>
        </span>
      </div>
      <div
        className={
          showAddWorker
            ? "card p-3 d-flex justify-content-center"
            : "hide_class"
        }
      >
        <input
          ref={inputRef}
          type="text"
          className="form-control p-2 mb-1 text-center"
          onChange={(e) => setWorkerInput(e.target.value)}
          required
          placeholder="הכנס שם עובד"
        />
        <Button
          variant="success"
          className="p-1 mt-1"
          onClick={() => {
            sendWorker();
          }}
        >
          שלח
        </Button>
      </div>

      {cart.length > 0 && (
        <div className="text-center">
          <h1 className="h1">סל הקניות</h1>
          <hr />
          {cart.map((item, index) => (
            <CartItem key={index} item={item} index={index} />
          ))}
          <hr />
          <Button
            className="w-100"
            onClick={() => {
              submitOrderPackage();
            }}
          >
            Checkout
          </Button>
        </div>
      )}
      <div className={showOrder ? "" : "hide_class"}>
        <OrderItem data={orderPackageData} />
      </div>
      <ToastContainer autoClose={1370} />
    </>
  );
};

export default Cart;
