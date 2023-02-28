import React, { useContext, useState } from "react";
import { CateringContext } from "../../../context/CateringContext";

const OrderItem = ({ data }) => {
  const [errMsg, setErrMsg] = useState();
  const productList = [];
  const { caterings } = useContext(CateringContext);
  let newDate = ``;

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
      <span className="bg-light card">תאריך: {newDate}</span>
      {data?.order.total}

      {productList.map((item) => {
        return (
          <>
            {item?.title}
            {item?.description} {item?.price} {item?.image}{" "}
          </>
        );
      })}
    </div>
  );
};

export default OrderItem;
