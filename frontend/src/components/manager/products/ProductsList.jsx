import React, { useContext } from "react";
import ProductItem from "./ProductsItem";
import { ProductContext } from "../../../context/product/ProductContext";

const ProductList = () => {
  const { allProducts } = useContext(ProductContext);
  console.log(allProducts);

  return (
    <div>
      {allProducts?.map((item, index) => (
        <ProductItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
