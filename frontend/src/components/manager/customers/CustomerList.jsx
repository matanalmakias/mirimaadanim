import React from "react";
import CustomerItem from "./CustomerItem";
import { customerList } from "../../../utils/content";

const CustomerList = () => {
  return (
    <div>
      {customerList?.map((item, index) => (
        <CustomerItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default CustomerList;
