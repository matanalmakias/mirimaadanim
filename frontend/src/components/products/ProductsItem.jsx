import React, { useState } from "react";

const ProductItem = ({ item, index }) => {
  return (
    <div className="col card p-4  mb-1">
      <label className="mb-1" htmlFor="title">
        כותרת
      </label>
      <span className="btn  btn-light fs1 card  mb-1">{item?.name}</span>

      <div className="p-3 mb-1">
        <div className="row gap-1 mb-1">
          <label className="mb-1" htmlFor="price">
            מחיר
          </label>
          <span className="col p-2 card mb-1">מחיר: {item?.price}</span>
        </div>
        <label className="mb-1" htmlFor="desc">
          תיאור
        </label>

        <span className="col p-1 card  mb-1">{item?.description}</span>
        <label className="mb-1" htmlFor="date">
          נוצר בתאריך
        </label>

        <span className="card  p-2 mb-1">{item?.createdAt}</span>
      </div>

      <hr className="card mb-1" />
    </div>
  );
};

export default ProductItem;
