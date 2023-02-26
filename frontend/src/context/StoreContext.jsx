import React, { useEffect, useState } from "react";
import { createContext } from "react";
import storeService from "../services/store.service";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { SocketContext } from "./CateringContext";
//create the context:
export const StoreContext = createContext({
  cart: [],
  addToCart: () => {},
  checkout: () => {},
});

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    storeService.getCart();
    socket.on("update", () => {
      storeService.getCart();
    });
    return () => {
      socket.off("update");
    };
  }, [socket]);
  const getCart = () => {
    storeService.getCart().then((res) => setCart(res.data));
    socket.emit("update");
  };

  const removeFromCart = (productId) => {
    storeService.removeFromCart(productId).then((res) => {
      toast(res.data.message);
    });

    setCart((state) => state.filter((item) => item.product !== productId));
    socket.emit("update");
  };

  const addToCart = (item, productId, setRes) => {
    storeService.addToCart(productId).then((res) => {
      setRes(res.data);
      toast(res.data.message);
    });
    socket.emit("update");
  };

  const checkout = async () => {
    storeService.checkout(cart, setCart).then((res) => console.log(res));
  };
  return (
    <>
      <StoreContext.Provider
        value={{ checkout, addToCart, cart, removeFromCart, getCart }}
      >
        {children}
      </StoreContext.Provider>
    </>
  );
};

export default StoreProvider;
