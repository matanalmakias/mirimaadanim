import React, { useEffect } from "react";
import { createContext } from "react";
import shabatService from "./../../services/shabat-food/shabatFood.service";
import { useState } from "react";
const ShabatFoodContext = createContext({ allProducts: [] });
export const ShabatFoodProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    shabatService.getProducts().then((res) => setAllProducts(res.data));
  }, []);

  return (
    <ShabatFoodContext.Provider value={{ allProducts }}>
      {children}
    </ShabatFoodContext.Provider>
  );
};

export default ShabatFoodContext;
