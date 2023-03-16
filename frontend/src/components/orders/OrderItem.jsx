import React from "react";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ item, orders }) => {
  const nav = useNavigate();
  let newDate;
  if (orders !== null) {
    newDate = new Date(item?.date);
  } else {
    return <>Loading......</>;
  }
  return (
    <>
      <hr />
      <div className="border">
        <div
          onClick={() => nav(`/user/order/${item._id}`)}
          className="row p-1  gap-1 order-card"
        >
          <div className="card-item col">
            <span className="fw-bold">תאריך</span>
            <br />
            <span>{newDate.toLocaleDateString()}</span>
          </div>
          <div className="card-item col">
            <span className="fw-bold">מס' פריטים - {item?.items.length}</span>
          </div>
          <div className="card-item col">
            <span className="fw-bold">מחיר כולל</span>
            <br />
            <span>{item?.total}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
