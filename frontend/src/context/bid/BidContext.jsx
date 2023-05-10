import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import bidService from "../../services/bid/bid.service";
import { SocketContext } from "../SocketContext";
export const BidContext = createContext({ allBids: [] });
export const BidProvider = ({ children }) => {
  const [allBids, setAllBids] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    bidService.getAllBids().then((res) => setAllBids(res.data));
    socket.on("bid-update", () => {
      bidService.getAllBids().then((res) => setAllBids(res.data));
    });
    return () => {
      socket.off("bid-update");
    };
  }, []);

  const contextValues = { allBids };
  return (
    <BidContext.Provider value={contextValues}>{children}</BidContext.Provider>
  );
};

export default BidContext;
