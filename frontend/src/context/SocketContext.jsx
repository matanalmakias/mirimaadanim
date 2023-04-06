import { createContext } from "react";
import io from "socket.io-client";
import { serverUrl } from "../utils/utils";

const socket = io(`${serverUrl}/`);
export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }) => {
  const socketUpdate = async () => {
    return socket.emit(`update`);
  };

  return (
    <SocketContext.Provider value={{ socket, socketUpdate }}>
      {children}
    </SocketContext.Provider>
  );
};
