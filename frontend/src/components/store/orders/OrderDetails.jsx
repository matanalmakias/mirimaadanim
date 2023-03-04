import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CateringContext,
  SocketContext,
} from "../../../context/CateringContext";
import storeService from "../../../services/store.service";
const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const { caterings } = useContext(CateringContext);
  const socket = useContext(SocketContext);
  let foundProduct;
  let productList = [];
  useEffect(() => {
    storeService.getSingleOrder(orderId).then((res) => setOrder(res.data));

    socket.on("update", () => {
      storeService.getSingleOrder(orderId).then((res) => setOrder(res.data));
    });

    return () => {
      socket.off("update");
    };
  }, [socket, orderId]);
  let newDate;
  if (order === null) {
    return <>Loading.......</>;
  } else {
    newDate = new Date(order?.date);
    for (let i = 0; i < order?.items.length; i++) {
      const item = order.items[i];
      const foundProduct = caterings.find((cate) => cate._id === item.product);
      productList.push(foundProduct);
    }
  }
  if (productList.length < 0) {
    return <>Loading........</>;
  }
  console.log(order);
  return (
    <div>
      <div dir="rtl" className=" bg-dark text-center">
        <span className="fw-bold">תאריך - {newDate?.toLocaleDateString()}</span>
        <br />
        <span>
          {order?.items.map((item, index) => {
            return (
              <div className="text-center bg-dark gap-4  p-3 row" key={index}>
                <div className="col">
                  <span>שם פריט:</span>
                  <br />
                  <span>{productList[0].title}</span>
                </div>
                <div className="col">
                  <span>כמות</span>
                  <br />
                  <span>{item?.quantity}</span>
                </div>
                <div className="col">
                  <span>מחיר</span>
                  <br />
                  <span>{item?.totalPrice} </span>
                </div>
                <div className="col">
                  <span>
                    {item?.workers.map((item, index) => {
                      return <div key={index}> {item?.name} </div>;
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </span>
        <div className="row p-2 fw-bold">
          <div className="col">
            <span>סכום מחיר כולל: </span>
            <span className="">{order.total} ש"ח</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
