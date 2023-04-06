import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import saladService from "../../services/salads/salad.service.js";
const SaladContext = createContext({ allProducts: [] });
export const SaladProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    saladService.getProducts().then((res) => setAllProducts(res.data));
  }, []);

  return (
    <SaladContext.Provider value={{ allProducts }}>
      {children}
    </SaladContext.Provider>
  );
};

export default SaladContext;
