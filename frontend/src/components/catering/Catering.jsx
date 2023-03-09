import "./caterings.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { useContext } from "react";
import { CateringContext } from "../../context/CateringContext";
import { useState } from "react";

const Catering = () => {
  const { caterings, categories } = useContext(CateringContext);
  const [showCategory, setShowCategory] = useState({});
  useEffect(() => {
    if (categories) {
      setShowCategory(
        categories.reduce(
          (obj, category) => ({
            ...obj,
            [category.name]: false,
          }),
          {}
        )
      );
    }
  }, [categories]);
  if (categories === undefined) {
    return <>Loading....</>;
  }

  return (
    <>
      <hr />

      {categories?.map((category) => (
        <div dir="rtl" className="container-fluid" key={category._id}>
          <h2
            onClick={() => {
              setShowCategory((state) => ({
                ...state,
                [category.name]: !state[category.name],
              }));
            }}
            className="category-name h2 text-center"
          >
            {category?.name}
          </h2>
          <div className={showCategory[category.name] ? "" : "hide_class"}>
            {caterings
              ?.filter((item) => item?.category === category?.name)
              ?.map((item) => (
                <div key={item?._id}>
                  <ProductItem product={item} />
                </div>
              ))}
          </div>
        </div>
      ))}

      <hr />
      {/* {cart.length > 0 && (
        <div className="container">
          <h4 className="text-center">סל קניות:</h4>

          {cart.map((item, index) => (
            <Row className="m-3" key={index}>
              <Col>מחיר: {item.price}</Col>
              <Col>פריט: {item.name}</Col>
            </Row>
          ))}
          <Button onClick={checkout}>השלם הזמנה</Button>
        </div>
      )}  */}
      <ToastContainer autoClose={1370} />
    </>
  );
};

export default Catering;
