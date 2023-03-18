import React from "react";
import CreateCatering from "../../components/manager/CreateCatering";
import { useNavigate } from "react-router-dom";
import "./manager.css";
import { ToastContainer } from "react-toastify";
import EditSaleList from "../../components/manager/sale/EditSaleList";
import CreateBusinessMeal from "../../components/manager/CreateBusinessMeal";
const Manager = () => {
  const nav = useNavigate();
  return (
    <>
      <hr />
      <div className="text-center d-flex flex-column gap-1">
        <br />
        <span
          className="mb-3 bg-success my_hover btn text-light p-1"
          onClick={() => nav("/manager/products")}
        >
          לשיוך מוצר ליום כלשהוא לחץ פה
        </span>
        <EditSaleList />
        <CreateBusinessMeal />

        <CreateCatering />
      </div>
      <ToastContainer autoClose={2300} />
    </>
  );
};

export default Manager;
