import "./caterings.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import cateringService from "../../services/catering.service";
import ProductItem from "./ProductItem";
const Catering = () => {
  useEffect(() => {}, []);
  const productList = JSON.parse(localStorage.getItem("caterings"));
  const categoryList = JSON.parse(localStorage.getItem("categories"));

  return (
    <>
      <h1 className="h1 text-center">חבילות קייטרינג</h1>
      <hr />
      {categoryList?.map((category) => (
        <div className="container-fluid" key={category._id}>
          <h2 className="h2 text-center">{category.name}</h2>
          {productList
            ?.filter((catering) => catering.category === category._id)
            ?.map((catering, index) => (
              <ProductItem product={catering} index={index} />
            ))}
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
