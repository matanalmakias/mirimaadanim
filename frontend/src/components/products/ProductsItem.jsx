import React, { useState } from "react";

const ProductItem = ({ item, index }) => {
  return (
    <div className="col card p-3 m-1">
      <span className="col card">{index + 1}</span>
      <span className="btn btn-light fs1 p-2 card m-2">{item?.name}</span>

      <div className="p-3">
        <div className="row gap-1">
          <span className="card p-2 col">שם: {item?.name}</span>
          <span className="col p-2 card">מחיר: {item?.price}</span>
        </div>

        <span className="col p-1 card m-1">תיאור: {item?.description}</span>
        <span className="card m-1 p-2">נוצר בתאריך: {item?.createdAt}</span>
      </div>

      <hr className="card mb-1" />
    </div>
  );
};

export default ProductItem;
