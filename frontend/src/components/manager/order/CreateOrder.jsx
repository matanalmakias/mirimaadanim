import React, { useEffect, useState } from "react";
import "./style.scss"; // import the CSS file for styling
import { customerList, productList2 } from "../../../utils/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShekelSign } from "@fortawesome/free-solid-svg-icons";

function CreateBid() {
  const [titleInput, setTitleInput] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  useEffect(() => {
    setTotalPrice(0);
    let price = 0;
    selectedProducts.forEach((item, index) => {
      let product = productList2?.find(
        (productItem) => productItem._id === item
      );
      price = product.price + price;
      setTotalPrice(price);
    });
  }, [selectedProducts]);
  const handleCustomerClick = (userId) => {
    if (selectedCustomer.includes(userId)) {
      setSelectedCustomer(selectedCustomer.filter((_id) => _id !== userId));
    } else {
      setSelectedCustomer([...selectedProducts, userId]);
    }
  };
  const handleProductClick = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((_id) => _id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <form
      className="d-flex justify-content-center text-center align-items-center flex-column gap-2"
      onSubmit={handleSubmit}
    >
      <div className="row gap-1 w-100">
        <label htmlFor="company" className="col-3 label1 mb-1">
          תיאור הזמנה
        </label>
        <input
          type="text"
          required
          onChange={(e) => setTitleInput(e.target.value)}
          placeholder=" תאר את ההזמנה, מי הזמין, מה הזמין ולאן"
          className="text-center col-8"
        />
      </div>
      <div className="row gap-1 w-100 align-items-center justify-content-center">
        <label htmlFor="company" className="col-3 text-center label1 mb-1">
          שיוך מוצרים להזמנה
        </label>

        {productList2?.map((item, index) => (
          <div key={index} className="card row p-1">
            <input
              type="checkbox"
              id={item._id}
              className=" col form-check"
              value={item._id}
              checked={selectedProducts.includes(item._id)}
              onChange={() => handleProductClick(item._id)}
            />
            <label className="col" htmlFor={item.id}>
              {item.name}
            </label>
          </div>
        ))}
        <label htmlFor="company" className="col-3 text-center label1 mb-1">
          שיוך לקוח
        </label>

        {customerList?.map((item, index) => (
          <div key={index} className="card row p-1">
            <input
              type="checkbox"
              id={item._id}
              className=" col  form-check"
              value={item._id}
              checked={selectedCustomer.includes(item._id)}
              onChange={() => handleCustomerClick(item._id)}
            />
            <label className="col" htmlFor={item.id}>
              {item.name}
            </label>
          </div>
        ))}
        <div className="row p-1 gap-1">
          <span className="card h5 w-100 col p-1 m-1 row gap-2">
            <span
              className="m-1 h5 text-center p-1"
              style={{ display: "flex", alignItems: "center" }}
            >
              מחיר כולל: <FontAwesomeIcon icon={faShekelSign} />
              {totalPrice}
            </span>
          </span>
        </div>
      </div>

      <button className="w-50" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateBid;
