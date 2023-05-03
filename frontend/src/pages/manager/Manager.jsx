import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./manager.css";
import "./style.scss";
import { ToastContainer } from "react-toastify";
import CreateSalad from "../../components/manager/salad/CreateSalad";
import CreateShabatFood from "../../components/manager/shabat-food/CreateShabatFood";
import CreatePackageList from "./../../components/manager/shabat-food/CreatePackageList";
import CreateBid from "../../components/manager/bid/CreateBid";
import Bid from "../../components/manager/bid/Bid";
import Customer from "../../components/manager/customers/Customer";
import Order from "../../components/manager/order/Order";
import Inventory from "../../components/manager/inventory/Inventory";
import Product from "../../components/manager/products/Products";
import Post from "../../components/manager/posts/Post";
const Manager = () => {
  const [openCreateBid, setOpenCreateBid] = useState(false);
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
  const [openCreateOrder, setOpenCreateOrder] = useState(false);
  const [openCreateInventory, setOpenCreateInventory] = useState(false);
  const [openCreateProducts, setOpenCreateProducts] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const nav = useNavigate();

  const toggleOpenCreateBid = () => {
    setOpenCreateBid((state) => !state);
  };
  const toggleOpenCreateCustomer = () => {
    setOpenCreateCustomer((state) => !state);
  };
  const toggleOpenCreateOrder = () => {
    setOpenCreateOrder((state) => !state);
  };
  const toggleOpenCreateInventory = () => {
    setOpenCreateInventory((state) => !state);
  };
  const toggleOpenCreateProducts = () => {
    setOpenCreateProducts((state) => !state);
  };
  const toggleOpenCreatePost = () => {
    setOpenCreatePost((state) => !state);
  };
  return (
    <>
      <hr />
      <div className="text-center d-flex flex-column gap-1">
        {/* --------יצירת פוסטים ---------- */}
        <p
          onClick={() => toggleOpenCreatePost()}
          className="btn bg-white text-black p-2 mb-1 fs1"
        >
          {openCreatePost ? "סגור" : "פוסטים"}
        </p>
        <section className={openCreatePost ? "" : "hide_class"}>
          <Post />
        </section>
        {/* --------יצירת מוצרים ---------- */}
        <p
          onClick={() => toggleOpenCreateProducts()}
          className="btn bg-white text-black p-2 mb-1 fs1"
        >
          {openCreateProducts ? "סגור" : "רשימת מוצרים"}
        </p>
        <section className={openCreateProducts ? "" : "hide_class"}>
          <Product />
        </section>
        {/* --------יצירת מלאי ---------- */}
        <p
          onClick={() => toggleOpenCreateInventory()}
          className="btn bg-white text-black p-2 mb-1 fs1"
        >
          {openCreateInventory ? "סגור" : "רשימת מלאי"}
        </p>
        <section className={openCreateInventory ? "" : "hide_class"}>
          <Inventory />
        </section>
        {/* --------יצירת הזמנה ---------- */}
        <p
          onClick={() => toggleOpenCreateOrder()}
          className="btn bg-white text-black p-2 mb-1 fs1"
        >
          {openCreateOrder ? "סגור" : "הזמנות"}
        </p>
        <section className={openCreateOrder ? "" : "hide_class"}>
          <Order />
        </section>
        {/* --------יצירת לקוח ---------- */}
        <p
          onClick={() => toggleOpenCreateCustomer()}
          className="btn bg-white text-black p-2 mb-1 fs1"
        >
          {openCreateCustomer ? "סגור" : "לקוחות"}
        </p>
        <section className={openCreateCustomer ? "" : "hide_class"}>
          <Customer />
        </section>
        {/* --------יצירת הצעת מחיר ---------- */}
        <p
          onClick={() => toggleOpenCreateBid()}
          className="btn bg-white text-black p-2 mb-1 fs1"
        >
          {openCreateBid ? "סגור" : "הצעות מחיר"}
        </p>
        <section className={openCreateBid ? "" : "hide_class"}>
          <Bid />
        </section>
      </div>
      <ToastContainer autoClose={1200} />
    </>
  );
};

export default Manager;
