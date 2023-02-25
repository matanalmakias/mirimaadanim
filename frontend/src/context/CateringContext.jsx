import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import cateringService from "../services/catering.service";
const socket = io("http://localhost:3001");
const SocketContext = createContext(socket);
//create the context:
const CateringContext = createContext({
  caterings: [],
  categories: [],
  imagesUrl: `http://localhost:3001`,
  setCaterings: () => {},
  setCategories: () => {},
});

const CateringProvider = ({ children }) => {
  const [caterings, setCaterings] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    cateringService.getAllCategories(setCategories);
    cateringService.getAllProducts(setCaterings);
  }, []);

  useEffect(() => {}, [categories, caterings]);
  useEffect(() => {
    socket.on("update", () => {
      cateringService.getAllProducts(setCaterings);
    });
  }, []);
  return (
    <>
      <CateringContext.Provider
        value={{ categories, setCategories, caterings, setCaterings }}
      >
        {children}
      </CateringContext.Provider>
    </>
  );
};

export { CateringContext, CateringProvider, SocketContext };
