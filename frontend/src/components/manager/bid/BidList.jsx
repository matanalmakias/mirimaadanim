import React, { useContext } from "react";
import { bidList } from "../../../utils/content";
import BidItem from "./BidItem";
import { BidContext } from "./../../../context/bid/BidContext";

const BidList = () => {
  const { allBids } = useContext(BidContext);
  return (
    <div>
      {allBids?.map((item, index) => (
        <BidItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default BidList;
