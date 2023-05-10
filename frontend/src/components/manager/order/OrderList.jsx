import React, { useContext } from "react";
import OrderItem from "./OrderItem";
import { orderList } from "../../../utils/content";
import { OrderContext } from "./../../../context/order/OrderContext";

const OrderList = () => {
  const { allOrders } = useContext(OrderContext);
  return (
    <div>
      {allOrders?.map((item, index) => (
        <OrderItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default OrderList;
