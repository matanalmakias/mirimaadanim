import React, { useState, useContext, useEffect } from "react";
import storeService from "../../services/store.service";
import { SocketContext } from "../../context/CateringContext";
import OrderItem from "./OrderItem";
import "./orders.css";
const AllOrders = () => {
  const [orders, setOrders] = useState(null);
  const socket = useContext(SocketContext);
  let newDate = null;

  useEffect(() => {
    storeService.getAllOrders().then((res) => setOrders(res.data));

    socket.on("update", () => {
      storeService.getAllOrders().then((res) => setOrders(res.data));
    });

    return () => {
      socket.off("update");
    };
  }, [socket]);
  if (orders !== null) {
    newDate = new Date(orders?.date);
  } else {
    return <>Loading......</>;
  }
  return (
    <div dir="rtl" className="d-grid text-center ">
      <h1 className="titlee h1">כל ההזמנות</h1>
      {orders?.map((item, index) => {
        return <OrderItem orders={orders} item={item} key={index} />;
      })}
    </div>
  );
};

export default AllOrders;
