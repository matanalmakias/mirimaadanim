import React, { useState } from "react";

const InventoryItem = ({ item, index }) => {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="">
      <span className="col card">{index + 1}</span>
      <span
        onClick={() => setShowItem((s) => !s)}
        className="btn btn-light fs1 p-2 card m-2"
      >
        {item?.name}
      </span>
      {showItem && (
        <div className="p-3">
          <div className="row gap-1">
            <span className="card p-1 col">שם: {item?.name}</span>
            <span className="col p-1 card">ספק: {item?.supplier}</span>
            <span className="col p-1 card">כמות: {item?.quantity}</span>
            <span className="col p-1 card">משקל לפי: {item?.pricePerUnit}</span>
          </div>

          <span className=" m-2 card ">
            {item?.products?.map((item) => item.name)}
          </span>
          <span className="card">תאריך: {item?.date}</span>
        </div>
      )}
      <hr className="card mb-1" />
    </div>
  );
};

export default InventoryItem;
