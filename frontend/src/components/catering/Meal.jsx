import React, { useState } from "react";

const Meal = ({ item }) => {
  const [showEditSomething, setShowEditSomething] = useState(false);
  return (
    <div className="w-100  mb-1">
      <div className=" w-100 d-flex flex-column">
        <p className=" p1 card mb-1 ">{item.name}</p>
        <input
          type="number"
          className="fs2  form-control  "
          required
          placeholder=" הכנס כמות סועדים [אם אינך מעוניין בפריט זה אנא השאר שדה ריק]"
        />
        <hr className="mb-1" />
      </div>
    </div>
  );
};

export default Meal;
