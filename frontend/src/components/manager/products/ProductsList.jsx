import React from "react";
import ProductItem from "./ProductsItem";
import { productList2 } from "../../../utils/content";

const ProductList = () => {
  return (
    <div>
      {productList2?.map((item, index) => (
        <ProductItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
