import React from "react";
import ProductItem from "./ProductsItem";
import { productList2 } from "../../utils/content";

const ProductList = () => {
  return (
    <div className="">
      <div className="row">
        {productList2?.map((item, index) => (
          <ProductItem key={item._id} index={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
