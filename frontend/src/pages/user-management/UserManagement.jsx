import { useState } from "react";
import UpdateAddress from "../../components/user-management/update-address/UpdateAddress.jsx";
import "./user-management.css";

import { ToastContainer } from "react-toastify";

const UserManagement = () => {
  return (
    <div dir="rtl">
      <UpdateAddress />

      <ToastContainer autoClose={700} />
    </div>
  );
};

export default UserManagement;
