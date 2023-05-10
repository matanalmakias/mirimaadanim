import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import customerService from "../../services/customer/customer.service";
import { SocketContext } from "../SocketContext";
export const CustomerContext = createContext({ allCustomers: [] });
export const CustomerProvider = ({ children }) => {
  const [allCustomers, setAllCustomers] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    customerService.getAllCustomers().then((res) => setAllCustomers(res.data));
    socket.on("customer-update", () => {
      customerService
        .getAllCustomers()
        .then((res) => setAllCustomers(res.data));
    });
    return () => {
      socket.off("customer-update");
    };
  }, []);

  const contextValues = { allCustomers };
  return (
    <CustomerContext.Provider value={contextValues}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
