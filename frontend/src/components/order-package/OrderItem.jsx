import React, { useContext, useState } from "react";
import { CateringContext } from "../../../context/CateringContext";

const OrderItem = ({ data }) => {
  const [errMsg, setErrMsg] = useState();
  const productList = [];
  const { caterings } = useContext(CateringContext);
  let newDate = null;
  if (data === null) {
    return <> Loading..... </>;
  } else {
    newDate = new Date(data?.order.date);

    data?.order.items.forEach(async (item) => {
      const foundProduct = caterings.find(
        (product) => item.product === product._id
      );
      productList.push({ foundProduct, item });
    });
  }
  return (
    <div className="text-secondary card p-3 text-center">
      <h1 className="h1">פרטי החבילה</h1>
      <span className="bg-light card">
        תאריך: {newDate !== null && <>{newDate.toLocaleDateString()}</>}
      </span>
      <span className="card mb-3">מחיר כולל {data?.order.total}</span>

      <h3 className="h3 card">פריטים</h3>
      {productList.map((item) => {
        return (
          <div className="card p-2 bg-light text-center mx-auto" key={item._id}>
            <div
              className="row d-flex justify-content-center align-items-center"
              dir="rtl"
            >
              <div className="col">
                <div className="w-33 fw-bold mb-1">שם פריט:</div>
                <div className="w-67">{item?.foundProduct.title}</div>
              </div>
              <div className="col">
                <div className="w-33 fw-bold mb-1">מחיר:</div>
                <div className="w-67">{item?.item.totalPrice}</div>
              </div>
              <div className="col">
                <div className="w-33 fw-bold mb-1">כמות:</div>
                <div className="w-67">{item?.item.quantity}</div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="w-33 fw-bold mb-1">עובדים:</div>
                <div className="w-67">
                  |
                  {item?.item.workers.map((item) => {
                    return <> {item.name} |</>;
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItem;
