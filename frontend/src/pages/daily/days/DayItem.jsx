import React from "react";

const DayItem = ({ item }) => {
  console.log(item);
  return (
    <div className="p-1 d-flex flex-column justify-content-center align-items-center">
      <div className="gap-1 p-1 bg-light d-flex flex-row">
        <span className="bg-dark text-black p-2">שם פריט </span>
        <span className="bg-dark text-black p-2">מחיר</span>
        <span className="bg-dark text-black p-2">סמל</span>
      </div>
      <div className="gap-1 p-1 bg-light d-flex flex-row">
        <span className="bg-secondary text-black p-1">{item.title} </span>
        <span className="bg-secondary text-black p-1">{item.price}</span>
        <span className="bg-secondary text-black p-1">{item.image}</span>
      </div>
    </div>
  );
};

export default DayItem;
