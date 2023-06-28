import React from "react";
import { saleList } from "../../utils/content";
import SaleItem from "./SaleItem";

const Sales = () => {
  return (
    <div className="bg-white shadow row gap-2 w-100" style={{ gap: "2rem" }}>
      <h2 className="h2 fw-bold text-white bg-secondary">מבצעים</h2>
      {saleList?.map((item) => (
        <SaleItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Sales;
