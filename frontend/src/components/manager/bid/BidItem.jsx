import React, { useState } from "react";

const BidItem = ({ item, index }) => {
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
            <span className="card p-1 col">לכבוד: {item?.customerName}</span>
            <span className="col p-1 card">מס': {item?.customerPhone}</span>
            <span className="col p-1 card">אימייל': {item?.customerEmail}</span>
          </div>

          <span className=" m-2 card p-2">{item?.content}</span>
          <span className="card">תאריך: {item?.date}</span>
        </div>
      )}
      <hr className="card mb-1" />
    </div>
  );
};

export default BidItem;
