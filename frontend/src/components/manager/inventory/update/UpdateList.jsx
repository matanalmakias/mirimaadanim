import React from "react";

const UpdateList = () => {
  return (
    <div>
      {productList2?.map((item, index) => (
        <div key={index} className="card m-1 row p-1">
          <input
            type="checkbox"
            id={item._id}
            className=" col"
            value={item._id}
            checked={selectedProducts.includes(item._id)}
            onChange={() => handleProductClick(item._id)}
          />
          <label className="col" htmlFor={item.id}>
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default UpdateList;
