import React, { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductList from "./ProductsList";

const Product = () => {
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  return (
    <div className="m-2">
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowCreateProduct((s) => !s)}
      >
        {showCreateProduct ? "סגור" : "הוסף מוצר חדש"}
      </button>
      {showCreateProduct && <CreateProduct />}
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowAllProducts((s) => !s)}
      >
        {showAllProducts ? "סגור" : "רשימת מוצרים"}
      </button>
      {showAllProducts && <ProductList />}
    </div>
  );
};

export default Product;
