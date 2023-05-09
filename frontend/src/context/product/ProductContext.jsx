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
    socket.on("product-update", () => {
      productService.getAllProducts().then((res) => setAllProducts(res.data));
    });

    return () => {
      socket.off("product-update");
    };
  }, []);

  return (
    <ProductContext.Provider value={{ allProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;