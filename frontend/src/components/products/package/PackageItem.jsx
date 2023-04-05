import React from "react";

import { useNavigate } from "react-router-dom";
import { shekelSymbol } from "./../../../utils/utils";
import "./style.scss";
const PackageItem = ({ item, index }) => {
  console.log(item);
  const nav = useNavigate();
  return (
    <>
      <p className="package-index">{index + 1}</p>
      <div className="d-flex gap-2 justify-content-center">
        {item.items.map((item, index) => {
          return (
            <p className="w-33 package-item" key={index}>
              {item.name} <br />
            </p>
          );
        })}
        <p className="package-item">
          {item.totalPrice}
          {shekelSymbol}
        </p>
      </div>
    </>
  );
};

export default PackageItem;
