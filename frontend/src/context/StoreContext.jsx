import React, { useEffect, useState } from "react";
import { createContext } from "react";
import storeService from "../services/store.service";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { SocketContext } from "./CateringContext";

//create the context:
export const StoreContext = createContext({
  cart: [],
  orders: [],
  submitOrderPackage: () => {},
  getSingleOrder: () => {},
  getAllOrders: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  checkout: () => {},
  decQuantity: () => {},
  incQuantity: () => {},
});

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const socket = useContext(SocketContext);

  useEffect(() => {
    storeService.getCart(setCart);

    socket.on("update", () => {
      storeService.getCart(setCart);
    });

    return () => {
      socket.off("update");
    };
  }, [socket]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const submitOrderPackage = async (setData) => {
    await storeService.submitOrderPackage().then((res) => setData(res.data));
    socket.emit("update");
  };
  const getSingleOrder = async (orderId) => {
    await storeService.getSingleOrder(orderId).then((res) => {});
  };
  const getAllOrders = async (orderId) => {
    await storeService.getAllOrders(orderId).then((res) => {});
  };
  const decQuantity = async (productId) => {
    await storeService.decQuantity(productId).then((res) => {
      toast(res.data.message);
    });
    socket.emit("update");
  };

  const incQuantity = async (productId) => {
    await storeService.incQuantity(productId).then((res) => {
      toast(res.data.message);
    });
    socket.emit("update");
  };

  const removeFromCart = async (productId) => {
    await storeService.removeFromCart(productId).then((res) => {
      toast(res.data.message);
    });

    setCart((state) => state.filter((item) => item.product !== productId));
    socket.emit("update");
  };

  const addToCart = async (item, productId, setRes) => {
    await storeService.addToCart(productId).then((res) => {
      setRes(res.data);
      toast(res.data.message);
    });
    socket.emit("update");
  };

  const checkout = async (setData) => {
    await storeService.checkout().then((res) => setData(res.data));
  };
  return (
    <>
      <StoreContext.Provider
        value={{
          incQuantity,
          decQuantity,
          checkout,
          addToCart,
          cart,
          removeFromCart,
          getSingleOrder,
          getAllOrders,
          submitOrderPackage,
        }}
      >
        {children}
      </StoreContext.Provider>
    </>
  );
};

export default StoreProvider;
