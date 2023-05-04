import React from "react";
import OrderItem from "./OrderItem";
import { orderList } from "../../../utils/content";

const OrderList = () => {
  return (
    <div>
      {orderList?.map((item, index) => (
        <OrderItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default OrderList;
