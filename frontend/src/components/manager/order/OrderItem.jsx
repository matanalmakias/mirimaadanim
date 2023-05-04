import React, { useState } from "react";

const OrderItem = ({ item, index }) => {
  console.log(item);
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="">
      <span className="col card">{index + 1}</span>
      <span
        onClick={() => setShowItem((s) => !s)}
        className="btn btn-light fs1 p-2 card m-2"
      >
        {item?.title}
      </span>
      {showItem && (
        <div className="p-3">
          <div className="row gap-1">
            <span className="card p-1 col">
              שם לקוח: {item?.customer?.name}
            </span>
            <span className="col p-1 card">סטטוס הזמנה: {item?.status}</span>
          </div>

          <span className=" m-2 card p-1">מחיר כולל: {item?.total}</span>
          <span className="card">תאריך: {item?.date}</span>
          <span className="card h4 m-1"> רשימת מוצרים</span>
          {item?.products?.map((item) => (
            <span className="card m-1">{item.name}</span>
          ))}
        </div>
      )}
      <hr className="card mb-1" />
    </div>
  );
};

export default OrderItem;
