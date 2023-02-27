import React from "react";

const OrderPackage = ({ data }) => {
  const { order, totalPrice } = data;
  return <>{order._id}</>;
};

export default OrderPackage;
