import React, { useEffect, useState } from "react";
import { inventoryList, productList2 } from "../../../../utils/content";
import { Form } from "react-bootstrap";
import { BsArrowDownLeftSquareFill } from "react-icons/bs";
import SecondStep from "./SecondStep";
const InventoryUpdate = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);
  const handleProductClick = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((_id) => _id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const firstStepFinish = () => {
    setFirstStep((s) => !s);
    setSecondStep((s) => !s);
  };
  const submit = (e) => {
    e.preventDefault();
    firstStepFinish();
  };
  return (
    <div>
      {firstStep && (
        <Form onSubmit={(e) => submit(e)}>
          {inventoryList?.map((item, index) => (
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

          <button type="submit" className="btn btn-light fs1 m-2 p-1">
            עבור לעדכון מוצרים אלו
            {`  `} <BsArrowDownLeftSquareFill />
          </button>
        </Form>
      )}
      {secondStep && <SecondStep products={selectedProducts} />}
    </div>
  );
};

export default InventoryUpdate;
