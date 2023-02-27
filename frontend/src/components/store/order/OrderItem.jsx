import React, { useContext } from "react";
import { CateringContext } from "../../../context/CateringContext";

const OrderItem = ({ item }) => {
  const { caterings } = useContext(CateringContext);
  return (
    <>
      {item.date}
      <br />
      {item.total}
      <br />
      {item.items.forEach((item) => {
        const product = caterings.find(
          (singleProduct) => item.product === singleProduct._id
        );
        console.log(product);
        return <></>;
      })}
    </>
  );
};

export default OrderItem;
