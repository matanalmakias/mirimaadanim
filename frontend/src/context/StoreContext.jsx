import React, { useState } from "react";
import { createContext } from "react";
import storeService from "../services/store.service";
//create the context:
export const StoreContext = createContext({
  cart: [],
  addToCart: () => {},
  checkout: () => {},
});
const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const checkout = async () => {
    storeService.checkout(cart, setCart).then((res) => console.log(res));
  };
  return (
    <>
      <StoreContext.Provider value={{ checkout, addToCart, cart }}>
        {children}
      </StoreContext.Provider>
    </>
  );
};

export default StoreProvider;
