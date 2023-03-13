import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import cateringService from "../services/catering.service";
import { serverUrl } from "../components/utils/utils";

const socket = io(`${serverUrl}/`);
const SocketContext = createContext(socket);

const CateringContext = createContext({
  caterings: [],
  categories: [],
  imagesUrl: `${serverUrl}/`,
  setCaterings: () => {},
  setCategories: () => {},
});

const CateringProvider = ({ children }) => {
  const [caterings, setCaterings] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    cateringService.getAllProducts(setCaterings);
    cateringService.getAllCategories(setCategories);

    socket.on("update", () => {
      cateringService.getAllProducts(setCaterings);
      cateringService.getAllCategories(setCategories);
    });
    return () => {
      socket.off("update");
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <CateringContext.Provider
        value={{ categories, setCategories, caterings, setCaterings }}
      >
        {children}
      </CateringContext.Provider>
    </SocketContext.Provider>
  );
};

export { CateringContext, CateringProvider, SocketContext };
