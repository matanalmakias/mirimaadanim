import React, { useState } from "react";

const CustomerItem = ({ item, index }) => {
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
            <a href={`tel:${item?.phone}`} className="col p-1 card">
              מס': {item?.phone}
            </a>
            <a href={`mail:${item?.email}`} className="col p-1 card">
              אימייל': {item?.email}
            </a>
          </div>

          <span className="card m-2">נוצר בתאריך: {item?.createdAt}</span>
        </div>
      )}
      <hr className="card mb-1" />
    </div>
  );
};

export default CustomerItem;
