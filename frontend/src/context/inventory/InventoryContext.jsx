import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import inventoryService from "../../services/inventory/inventory.service";
import { SocketContext } from "../SocketContext";
export const InventoryContext = createContext({ allInventorys: [] });
export const InventoryProvider = ({ children }) => {
  const [allInventorys, setAllInventorys] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    inventoryService
      .getAllInventorys()
      .then((res) => setAllInventorys(res.data));
    socket.on("inventory-update", () => {
      inventoryService
        .getAllInventorys()
        .then((res) => setAllInventorys(res.data));
    });
    return () => {
      socket.off("inventory-update");
    };
  }, []);

  const contextValues = { allInventorys };
  return (
    <InventoryContext.Provider value={contextValues}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;
