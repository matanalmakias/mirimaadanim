import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import orderService from "../../services/order/order.service";
import { SocketContext } from "../SocketContext";
export const OrderContext = createContext({ allOrders: [] });
export const OrderProvider = ({ children }) => {
  const [allOrders, setAllOrders] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    orderService.getAllOrders().then((res) => setAllOrders(res.data));
    socket.on("order-update", () => {
      orderService.getAllOrders().then((res) => setAllOrders(res.data));
    });
    return () => {
      socket.off("order-update");
    };
  }, []);

  const contextValues = { allOrders };
  return (
    <OrderContext.Provider value={contextValues}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
