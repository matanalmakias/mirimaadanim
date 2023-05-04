import React, { useState } from "react";
import CreateInventory from "./CreateInventoryItem";
import InventoryList from "./InventoryList";
import InventoryUpdate from "./update/InventoryUpdate";

const Inventory = () => {
  const [showCreateInventory, setShowCreateInventory] = useState(false);
  const [showAllInventorys, setShowAllInventorys] = useState(false);
  const [showUpdateInventorys, setShowUpdateInventorys] = useState(false);
  return (
    <div className="m-2">
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowCreateInventory((s) => !s)}
      >
        {showCreateInventory ? "סגור" : "הוסף פריט חדש למלאי"}
      </button>
      {showCreateInventory && <CreateInventory />}
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowUpdateInventorys((s) => !s)}
      >
        {showUpdateInventorys ? "סגור" : "עדכון מלאי"}
      </button>
      {showUpdateInventorys && <InventoryUpdate />}
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowAllInventorys((s) => !s)}
      >
        {showAllInventorys ? "סגור" : "רשימת מלאי"}
      </button>
      {showAllInventorys && <InventoryList />}
    </div>
  );
};

export default Inventory;
