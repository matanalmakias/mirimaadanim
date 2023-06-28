import React from "react";
import { manotMumlatsot } from "../../utils/content";
import MumlatsotItem from "./MumlatsotItem";

const ManotMumlatsot = () => {
  return (
    <div className="bg-white shadow row gap-2 w-100" style={{ gap: "2rem" }}>
      <h2 className="h2 fw-bold text-white bg-secondary">מומלצי היום</h2>
      {manotMumlatsot?.map((item) => (
        <MumlatsotItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ManotMumlatsot;
