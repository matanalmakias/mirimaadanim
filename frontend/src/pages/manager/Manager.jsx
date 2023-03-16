import React from "react";
import CreateCatering from "../../components/manager/CreateCatering";
import { useNavigate } from "react-router-dom";
import "./manager.css";
import { ToastContainer } from "react-toastify";
const Manager = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="text-center">
        <br />
        <span
          className="mb-3 bg-info btn text-light p-1"
          onClick={() => nav("/manager/products")}
        >
          לשיוך מוצר ליום כלשהוא לחץ פה
        </span>

        <CreateCatering />
      </div>
      <ToastContainer autoClose={2300} />
    </>
  );
};

export default Manager;
