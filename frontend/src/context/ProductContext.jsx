import { createContext, useEffect, useContext, useState } from "react";
import { SocketContext } from "./CateringContext";
import storeService from "../services/store.service";

export const ProductContext = createContext({ allProducts: [] });
export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (allProducts === null) {
      // storeService.getAllProducts.then((res) => setProducts(res.data));
      storeService.getAllProducts(setAllProducts);
    }
    socket.on("update", () => {
      storeService.getAllProducts(setAllProducts);
    });

    return () => {
      socket.off("update");
    };
  }, []);
  return (
    <>
      <ProductContext.Provider value={{ allProducts }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};
