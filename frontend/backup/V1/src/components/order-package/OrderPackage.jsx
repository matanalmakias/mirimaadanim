import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CateringContext } from "../../../context/CateringContext";
import OrderItem from "./OrderItem";
import { serverUrl } from "../../utils/utils";

const OrderPackage = ({ show, data }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {}, [order]);
  if (data !== null) {
    const item = data.order;
    axios
      .get(`${serverUrl}/api/order/${item._id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setOrder(res.data));
  } else {
    return;
  }

  return (
    <>
      {order?.items.forEach((item) => {
        return (
          <>
            <OrderItem item={item} />
          </>
        );
      })}
    </>
  );
};

export default OrderPackage;
