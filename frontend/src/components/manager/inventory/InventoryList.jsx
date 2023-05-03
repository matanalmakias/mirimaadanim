import React from "react";
import { bidList } from "../../../utils/content";
import BidItem from "./InventoryItem";

const BidList = () => {
  return (
    <div>
      {bidList?.map((item, index) => (
        <BidItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default BidList;
