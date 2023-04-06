import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { Form } from "react-bootstrap";
import CreatePackageItem from "./CreatePackageItem";
import { shekelSymbol } from "./../../../utils/utils";
import ShabatFoodContext from "../../../context/shabat-food/ShabatFoodContext";
import SaladContext from "../../../context/salads/SaladContext.jsx";
import packageService from "./../../../services/package/package.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreatePackageList = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsInPackage, setProductsInPackage] = useState([[], []]);
  const { allProducts: shabatProducts } = useContext(ShabatFoodContext);
  const { allProducts: saladProducts } = useContext(SaladContext);
  const nav = useNavigate();
  useEffect(() => {
    console.log(productsInPackage);
  }, [productsInPackage]);
  const pullShabatItemFromPackage = (itemId) => {
    setProductsInPackage((prevState) => {
      const newProductsInPackage = [...prevState];
      const index = newProductsInPackage[0].indexOf(itemId);
      if (index !== -1) {
        newProductsInPackage[0].splice(index, 1);
      }
      return newProductsInPackage;
    });
  };

  const pullSaladsItemFromPackage = (itemId) => {
    setProductsInPackage((prevState) => {
      const newProductsInPackage = [...prevState];
      const index = newProductsInPackage[1].indexOf(itemId);
      if (index !== -1) {
        newProductsInPackage[1].splice(index, 1);
      }
      return newProductsInPackage;
    });
  };
  const pushShabatItemToPackage = (itemId) => {
    setProductsInPackage((prevState) => {
      const newProductsInPackage = [...prevState];
      newProductsInPackage[0] = [...newProductsInPackage[0], itemId];
      return newProductsInPackage;
    });
  };

  const pushSaladsItemToPackage = (itemId) => {
    setProductsInPackage((prevState) => {
      const newProductsInPackage = [...prevState];
      newProductsInPackage[1] = [...newProductsInPackage[1], itemId];
      return newProductsInPackage;
    });
  };
  const toggleShowCreate = () => {
    setShowCreate((state) => !state);
  };
  const sumTotalPrice = (func, price) => {
    if (func === "plus") {
      let newTotalPrice = price + totalPrice;
      setTotalPrice(newTotalPrice);
    } else if (func === "minus") {
      let newTotalPrice = totalPrice - price;
      setTotalPrice(newTotalPrice);
    }
    return totalPrice;
  };
  const submitForm = async (e) => {
    e.preventDefault(); // prevent default behavior of form submission
    const formData = new FormData();
    const items = { shabat: productsInPackage[0], salad: productsInPackage[1] };
    const itemsString = JSON.stringify(items); // stringify the object
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("totalPrice", totalPrice);
    formData.append("items", itemsString); // append the stringified object

    await packageService
      .createProduct(formData)
      .then((res) => toast(res.data.message))
      .finally(() => nav(-1));
  };

  return (
    <div className="package-tbody ">
      לחץ על מוצר כדי לצרף אותו ובסוף לחץ על יצירה
      <table className="package-tbody">
        <thead className="w-100">
          <tr className="w-100">
            <th className="bg-black w-100 p-1 text-white">אוכל מוכן לשבת</th>
          </tr>
        </thead>
        <tbody className="">
          {shabatProducts?.map((item, index) => {
            return (
              <CreatePackageItem
                totalPrice={totalPrice}
                sumTotalPrice={sumTotalPrice}
                pullShabatItemFromPackage={pullShabatItemFromPackage}
                category={"shabat"}
                item={item}
                index={index}
                pushShabatItemToPackage={pushShabatItemToPackage}
                pushSaladsItemToPackage={pushSaladsItemToPackage}
              />
            );
          })}
        </tbody>
      </table>
      <table className="package-tbody">
        <thead className="w-100">
          <tr className="w-100">
            <th className="bg-black w-100 p-1 text-white">סלטים</th>
          </tr>
        </thead>
        <tbody className="">
          {saladProducts?.map((item, index) => (
            <CreatePackageItem
              totalPrice={totalPrice}
              sumTotalPrice={sumTotalPrice}
              pullSaladsItemFromPackage={pullSaladsItemFromPackage}
              category={"salads"}
              item={item}
              index={index}
              pushShabatItemToPackage={pushShabatItemToPackage}
              pushSaladsItemToPackage={pushSaladsItemToPackage}
            />
          ))}
        </tbody>
      </table>
      <p>
        מחיר כלל המוצרים שבחרת : {totalPrice}
        {shekelSymbol}
      </p>
      <p className="continue-btn" onClick={() => toggleShowCreate()}>
        {showCreate ? "סגור" : "המשך"}
      </p>
      <div className={showCreate ? "" : "hide_class"}>
        <Form
          onSubmit={(e) => submitForm(e)}
          className="d-flex flex-column gap-1 "
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="form-control p-1"
            type="text"
            required
            placeholder="כותרת"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            className="form-control p-1"
            type="text"
            required
            placeholder="תיאור"
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="form-control p-1"
            type="number"
            required
            placeholder="מחיר"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            className="form-control p-1"
            type="file"
            accept="image/*"
            placeholder="תמונה"
            required
          />
          <button
            onClick={() => submitForm()}
            className="btn btn-success p-2 w-100"
          >
            שלח
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePackageList;
