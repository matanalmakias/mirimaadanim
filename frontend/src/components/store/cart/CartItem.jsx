import { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { StoreContext } from "../../../context/StoreContext";
import { ToastContainer } from "react-toastify";
const CartItem = ({ item, index }) => {
  const { removeFromCart, decQuantity, incQuantity } = useContext(StoreContext);

  return (
    <>
      <Row className="flex-row-reverse p-4" key={index}>
        <Col className="col2 d-flex justify-content-center ">
          שם פריט
          <br />
          {item.title}
        </Col>
        <Col className="col3 d-flex justify-content-center">
          כמות <br />
          {item.quantity}
          <br />
        </Col>
        <Col className="col1 d-flex justify-content-center">
          מחיר <br />
          {item.price}
        </Col>
        <Col className="d-flex justify-content-center">
          <p onClick={() => incQuantity(item._id)} className="btns">
            הוסף
          </p>
          <p onClick={() => decQuantity(item._id)} className="btns">
            הורד
          </p>

          <p onClick={() => removeFromCart(item._id)} className=" fontsize">
            הסרה מהסל
          </p>
        </Col>
      </Row>
      <ToastContainer autoClose={1370} />
    </>
  );
};

export default CartItem;
