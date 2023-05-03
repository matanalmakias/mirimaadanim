import React from "react";
import { bidList } from "../../../utils/content";
import BidItem from "./BidItem";

const BidList = () => {
  return (
    <div>
      {bidList?.map((item) => (
        <BidItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default BidList;
