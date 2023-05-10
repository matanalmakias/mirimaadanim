import React, { useState } from "react";

const ProductItem = ({ item, index }) => {
  const [showItem, setShowItem] = useState(false);
  const date = new Date(item?.createdAt);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("he-IL", options);
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
            <span className="card p-2 col">שם: {item?.name}</span>
            <span className="col p-2 card">מחיר: {item?.price}</span>
          </div>

          <span className="col p-1 card m-1">תיאור: {item?.description}</span>
          <span className="card m-1 p-2">נוצר בתאריך: {formattedDate}</span>
        </div>
      )}
      <hr className="card mb-1" />
    </div>
  );
};

export default ProductItem;
