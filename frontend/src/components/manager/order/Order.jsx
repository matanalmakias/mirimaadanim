import React, { useState } from "react";
import CreateOrder from "./CreateOrder";
import OrderList from "./OrderList";

const Order = () => {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  return (
    <div className="m-2">
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowCreateOrder((s) => !s)}
      >
        {showCreateOrder ? "סגור" : "הוסף הזמנה חדשה"}
      </button>
      {showCreateOrder && <CreateOrder />}
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowAllOrders((s) => !s)}
      >
        {showAllOrders ? "סגור" : "רשימת הזמנות"}
      </button>
      {showAllOrders && <OrderList />}
    </div>
  );
};

export default Order;
