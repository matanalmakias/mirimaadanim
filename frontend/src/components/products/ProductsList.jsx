import React, { useContext } from "react";
import ProductItem from "./ProductsItem";
import { productList2 } from "../../utils/content";
import ProductContext from "../../context/product/ProductContext";

const ProductList = () => {
  const { allProducts } = useContext(ProductContext);
  return (
    <div className="">
      <div className="row">
        {allProducts?.map((item, index) => (
          <ProductItem key={item._id} index={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
