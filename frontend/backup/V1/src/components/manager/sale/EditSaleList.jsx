import React, { useContext, useState } from "react";
import { ProductContext } from "./../../../context/ProductContext";
import "./style.css";

const EditSaleList = () => {
  const [saleList, setSaleList] = useState();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const { allProducts } = useContext(ProductContext);
  const toggleShowAllProducts = async () => {
    setShowAllProducts((state) => !state);
  };
  return (
    <>
      <p
        onClick={() => toggleShowAllProducts()}
        className="btn my_hover bg-info text-light p-1"
      >
        הצג את כל המוצרים
      </p>
      {showAllProducts && (
        <div className="d-flex flex-column">
          {allProducts?.map((product, index) => (
            <p key={index} className="btn p-1 mb-1 bg_white1">
              {product?.title}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default EditSaleList;
