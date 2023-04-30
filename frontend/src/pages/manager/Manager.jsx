import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./manager.css";
import "./style.scss";
import { ToastContainer } from "react-toastify";
import CreateSalad from "../../components/manager/salad/CreateSalad";
import CreateShabatFood from "../../components/manager/shabat-food/CreateShabatFood";
import CreatePackageList from "./../../components/manager/shabat-food/CreatePackageList";
const Manager = () => {
  const [openCreateSalad, setOpenCreateSalad] = useState(false);
  const [openCreateShabatFood, setOpenCreateShabatFood] = useState(false);
  const [openCreatePackage, setOpenCreatePackage] = useState(false);
  const nav = useNavigate();

  const toggleOpenCreateSalad = () => {
    setOpenCreateSalad((state) => !state);
  };
  const toggleOpenCreateShabatFood = () => {
    setOpenCreateShabatFood((state) => !state);
  };
  const toggleOpenCreatePackage = () => {
    setOpenCreatePackage((state) => !state);
  };
  return (
    <>
      <hr />
      <div className="text-center d-flex flex-column gap-1">
        {/* --------יצירת סלט לתפריט ---------- */}
        <p
          onClick={() => toggleOpenCreateSalad()}
          className="btn bg-white text-black p-2 fs1"
        >
          {openCreateSalad ? "סגור" : "הוספת סלט לתפריט"}
        </p>
        <section className={openCreateSalad ? "" : "hide_class"}>
          <CreateSalad />
        </section>
        {/* ----------יצירת פריט לאוכל מוכן לשבת ---------- */}

        <p
          onClick={() => toggleOpenCreateShabatFood()}
          className="btn bg-white text-black p-2 fs1"
        >
          {openCreateShabatFood ? "סגור" : "הוסף פריט לאוכל מוכן לשבת"}
        </p>
        <section className={openCreateShabatFood ? "" : "hide_class"}>
          <CreateShabatFood />
        </section>

        {/* ----------יצירת חבילה שלמה לאוכל מוכן לשבת---------- */}
        <p
          onClick={() => toggleOpenCreatePackage()}
          className="btn bg-white text-black p-2 fs1"
        >
          {openCreatePackage ? "סגור" : "הוסף חבילה שלמה לחגים/שבת"}
        </p>
        <section className={openCreatePackage ? "" : "hide_class"}>
          <CreatePackageList />
        </section>
        {/* ---------------------------------------- */}
      </div>
      <ToastContainer autoClose={1200} />
    </>
  );
};

export default Manager;
