import React, { useContext } from "react";
import CustomerItem from "./CustomerItem";
import { customerList } from "../../../utils/content";
import CustomerContext from "../../../context/customer/CustomerContext";

const CustomerList = () => {
  const { allCustomers } = useContext(CustomerContext);
  return (
    <div>
      {allCustomers?.map((item, index) => (
        <CustomerItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default CustomerList;
