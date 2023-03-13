import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import cateringService from "../services/catering.service";
import { serverUrl } from "../utils/utils";

const socket = io(`${serverUrl}/`);
const SocketContext = createContext(socket);

const CateringContext = createContext({
  socketUpdate: () => {},
  categories: [],
  imagesUrl: `${serverUrl}/`,
  setCaterings: () => {},
  setCategories: () => {},
});

const CateringProvider = ({ children }) => {
  const [categories, setCategories] = useState();

  const socketUpdate = async () => {
    return socket.emit(`update`);
  };
  useEffect(() => {
    cateringService.getAllCategories(setCategories);

    socket.on("update", () => {
      cateringService.getAllCategories(setCategories);
    });
    return () => {
      socket.off("update");
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <CateringContext.Provider
        value={{
          socketUpdate,
          categories,
          setCategories,
        }}
      >
        {children}
      </CateringContext.Provider>
    </SocketContext.Provider>
  );
};

export { CateringContext, CateringProvider, SocketContext };
