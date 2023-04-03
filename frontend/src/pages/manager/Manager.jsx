import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./manager.css";
import { ToastContainer } from "react-toastify";
import CreateSalad from "../../components/manager/salad/CreateSalad";
import CreateShabatFood from "../../components/manager/shabat-food/CreateShabatFood";
const Manager = () => {
  const [openCreateSalad, setOpenCreateSalad] = useState(false);
  const [openCreateShabatFood, setOpenCreateShabatFood] = useState(false);
  const nav = useNavigate();
  const toggleOpenCreateSalad = () => {
    setOpenCreateSalad((state) => !state);
  };
  const toggleOpenCreateShabatFood = () => {
    setOpenCreateShabatFood((state) => !state);
  };
  return (
    <>
      <hr />
      <div className="text-center d-flex flex-column gap-1">
        {/* --------יצירת סלט לתפריט ---------- */}
        <p
          onClick={() => toggleOpenCreateSalad()}
          className="btn bg-white text-black p-2"
        >
          {openCreateSalad ? "סגור" : "הוספת סלט לתפריט"}
        </p>
        <section className={openCreateSalad ? "" : "hide_class"}>
          <CreateSalad />
        </section>
        {/* ----------יצירת פריט לאוכל מוכן לשבת ---------- */}

        <p
          onClick={() => toggleOpenCreateShabatFood()}
          className="btn bg-white text-black p-2"
        >
          {openCreateShabatFood ? "סגור" : "הוסף פריט לאוכל מוכן לשבת"}
        </p>
        <section className={openCreateShabatFood ? "" : "hide_class"}>
          <CreateShabatFood />
        </section>
        {/* ---------------------------------------- */}
      </div>
      <ToastContainer autoClose={2300} />
    </>
  );
};

export default Manager;
