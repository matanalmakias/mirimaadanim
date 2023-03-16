import { useContext, useEffect, useState } from "react";
import "./style.css";
import { ProductContext } from "../../../context/ProductContext";
import ProductItem from "./ProductItem";

const ProductList = ({ day }) => {
  const { allProducts } = useContext(ProductContext);
  const [sortedProducts, setSortedProducts] = useState(null);

  useEffect(() => {
    setSortedProducts(allProducts?.filter((item) => item?.days?.includes(day)));
  }, [allProducts, day]);

  const sortByCategory = () => {
    const sortedByCategory = [...sortedProducts].sort((a, b) =>
      a.category.localeCompare(b.category)
    );
    setSortedProducts(sortedByCategory);
  };

  const sortByPrice = () => {
    const sortedByPrice = [...sortedProducts].sort((a, b) => a.price - b.price);
    setSortedProducts(sortedByPrice);
  };
  if (sortedProducts?.length === 0) {
    return <p className="mb-1">אין מוצרים ביום זה</p>;
  }
  return (
    <div>
      <p className="my_text text-primary shadow mb-1">מיין לפי</p>
      <div className="d-flex flex-row align-items-center justify-content-center text-center gap-1">
        <p onClick={sortByCategory} className="p-1 btn bg-light text-info">
          קטגוריה
        </p>
        <p onClick={sortByPrice} className="p-1 btn bg-light text-info">
          מחיר
        </p>
      </div>
      {sortedProducts?.map((product, index) => (
        <ProductItem product={product} key={index} />
      ))}
    </div>
  );
};

export default ProductList;
