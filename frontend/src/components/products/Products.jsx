import React, { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductList from "./ProductsList";

const Product = () => {
  return (
    <div className="m-2 w-100">
      <h2 className="h2 bg-light ">מוצרים</h2>
      <ProductList />
    </div>
  );
};

export default Product;
