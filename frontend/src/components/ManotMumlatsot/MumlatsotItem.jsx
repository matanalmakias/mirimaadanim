import React from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import bg1 from "../../images/bg1.jpg";

const MumlatsotItem = ({ item }) => {
  return (
    <div
      style={{ backgroundImage: `url(${bg1})`, backgroundSize: "cover" }}
      className="col p-2 shadow border border-light"
    >
      <div className="card p-2 m-1 gap-2">
        <div className="">
          <p className="h5 mb-1 text-white bg-secondary">כותרת</p>

          <p className="card text-secondary mb-1">{item.title}</p>
        </div>
        <div className="">
          <p className="h5 bg-secondary  mb-1 text-white">תיאור</p>{" "}
          <p className="card text-secondary mb-1">{item.desc}</p>{" "}
        </div>
        <div className="">
          <p className="h5 bg-secondary  mb-1 text-white">מחיר</p>{" "}
          <p className="card text-secondary mb-1">{item.price}</p>
        </div>
      </div>
      <Button className="w-100 h5 fs-medium">
        <IoBagCheckOutline />
        הזמן עכשיו
      </Button>
    </div>
  );
};

export default MumlatsotItem;
