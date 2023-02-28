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
      productList.push(foundProduct);
    });
  }

  return (
    <div className="card p-3">
      <h1 className="h1">פרטי החבילה</h1>
      <span className="bg-light card">
        תאריך: {newDate !== null && <>{newDate.toLocaleDateString()}</>}
      </span>
      <span>מחיר כולל {data?.order.total}</span>
      <h3 className="h3">פריטים</h3>
      <hr />
      {productList.map((item) => {
        return (
          <div className="card p-2 bg-light" key={item._id}>
            שם {item?.title}
            <hr />
            תיאור {item?.description}
            <hr />
            מחיר {item?.price}
            <hr />
            <img
              src={`http:localhost:3001/${item?.image}`}
              alt=""
              style={{ width: `50%` }}
            />
            {item?.image}{" "}
          </div>
        );
      })}
    </div>
  );
};

export default OrderItem;
