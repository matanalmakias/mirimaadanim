import React from "react";
import InventoryItem from "./InventoryItem";
import { inventoryList } from "../../../utils/content";

const InventoryList = () => {
  return (
    <div>
      {inventoryList?.map((item, index) => (
        <InventoryItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default InventoryList;
