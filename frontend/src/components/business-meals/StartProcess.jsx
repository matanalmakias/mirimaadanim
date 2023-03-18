import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ProductContext } from "./../../context/ProductContext";

const StartProcess = () => {
  const [products, setProducts] = useState(null);
  const [meatProducts, setMeatProducts] = useState(null);
  const [meatInput, setMeatInput] = useState();
  const [additionalInput, setAdditionalInput] = useState();
  const [breadInput, setBreadInput] = useState();
  const [drinkInput, setDrinkInput] = useState();
  const { allProducts } = useContext(ProductContext);

  useEffect(() => {
    if (allProducts !== null) {
      setProducts(allProducts);
    }
  }, [allProducts]);

  useEffect(() => {
    if (products === null) {
      let foundedMeatProducts = [
        allProducts.filter((item) => item.category === "בשרים"),
      ];

      setMeatProducts(foundedMeatProducts);
      console.log(meatProducts);
    }
  }, [allProducts, products]);

  return (
    <div>
      <Form>
        <select
          onChange={(event) => setMeatInput(event.target.value)}
          className="form-select"
        >
          <option value="" disabled selected>
            מנה עיקרית
          </option>
          {/* {meatProducts?.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))} */}
        </select>
      </Form>
    </div>
  );
};

export default StartProcess;
