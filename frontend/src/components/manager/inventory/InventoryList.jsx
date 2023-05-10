import React, { useContext } from "react";
import InventoryItem from "./InventoryItem";
import { InventoryContext } from "./../../../context/inventory/InventoryContext";

const InventoryList = () => {
  const { allInventorys } = useContext(InventoryContext);
  return (
    <div>
      {allInventorys?.map((item, index) => (
        <InventoryItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default InventoryList;
