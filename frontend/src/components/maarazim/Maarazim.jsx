import React from "react";
import { maarazimList, saleList } from "../../utils/content";
import MaarazItem from "./MaarazItem";

const Maarazim = () => {
  return (
    <div className="bg-white shadow row gap-2 w-100" style={{ gap: "2rem" }}>
      <h2 className="h2 fw-bold text-white bg-secondary">מארזים</h2>
      {maarazimList?.map((item) => (
        <MaarazItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Maarazim;
