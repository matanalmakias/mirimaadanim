import React, { useState } from "react";
import CreateCustomer from "./CreateCustomer";
import CustomerList from "./CustomerList";

const Customer = () => {
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  return (
    <div className="m-2">
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowCreateCustomer((s) => !s)}
      >
        {showCreateCustomer ? "סגור" : "הוסף לקוח חדש"}
      </button>
      {showCreateCustomer && <CreateCustomer />}
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowAllCustomers((s) => !s)}
      >
        {showAllCustomers ? "סגור" : "רשימת לקוחות"}
      </button>
      {showAllCustomers && <CustomerList />}
    </div>
  );
};

export default Customer;
