import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import productService from "../../services/product/product.service";
import { SocketContext } from "../SocketContext";
export const ProductContext = createContext({ allProducts: [] });
export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    productService.getAllProducts().then((res) => setAllProducts(res.data));
    socket.on("product-update", () => {
      productService.getAllProducts().then((res) => setAllProducts(res.data));
    });
    return () => {
      socket.off("product-update");
    };
  }, []);

  const contextValues = { allProducts };
  return (
    <ProductContext.Provider value={contextValues}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
