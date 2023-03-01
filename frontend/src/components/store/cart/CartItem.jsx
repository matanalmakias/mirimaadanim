import { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { StoreContext } from "../../../context/StoreContext";
import { ToastContainer } from "react-toastify";
import authService from "../../../services/auth.service";
import { SocketContext } from "../../../context/CateringContext";
import storeService from "../../../services/store.service";
const CartItem = ({ item, index }) => {
  const [userData, setUserData] = useState();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showUserData, setShowUserData] = useState(false);
  const { removeFromCart, decQuantity, incQuantity } = useContext(StoreContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    authService.getSingleUser().then((res) => setUserData(res.data));
    socket.on("update", () => {
      authService.getSingleUser().then((res) => setUserData(res.data));
    });
    return () => {
      socket.off("update");
    };
  }, [socket]);

 
  const signWorker = async (workerId, productId) => {
    storeService
      .signWorker(workerId, productId)
      .then((res) => console.log(res.data));
  };
  let cartItem;
  let isWorkerIsSigned
  if (userData !== null) {
    cartItem = userData?.cart.find((cartItem) => cartItem.product === item._id);
    isWorkerIsSigned = cartItem.workers.some(item=>)
  }
  return (
    <>
      <Row>
        <Col>
          <p
            onClick={() => setShowUserData((state) => !state)}
            style={{
              backgroundColor: `burlywood`,
              color: `white`,
              padding: `2px`,
              textAlign: `center`,
            }}
            className="card btn"
          >
            {showUserData ? "סגור" : "הצמד מוצר זה לעובדים"}
          </p>
          <div className={showUserData ? "" : "hide_class"}>
            {userData?.workers.length > 0 &&
              userData?.workers.map((worker) => (
                <div
                  onClick={() => signWorker(worker.id, item._id)}
                  className="btn card m-1 p-1"
                  key={worker?.id}
                >
                  {worker?.name}
                </div>
              ))}
          </div>
        </Col>
      </Row>
      <Row className="flex-row-reverse p-4" key={index}>
        <Col className="col2 d-flex justify-content-center ">
          שם פריט
          <br />
          {item?.title}
        </Col>
        <Col className="col3 d-flex justify-content-center">
          כמות <br />
          {item?.quantity}
          <br />
        </Col>
        <Col className="col1 d-flex justify-content-center">
          מחיר <br />
          {item?.price}
        </Col>
        <Col className="d-flex justify-content-center">
          <p onClick={() => incQuantity(item?._id)} className="btns">
            הוסף
          </p>
          <p onClick={() => decQuantity(item?._id)} className="btns">
            הורד
          </p>

          <p onClick={() => removeFromCart(item?._id)} className=" fontsize">
            הסרה מהסל
          </p>
        </Col>
      </Row>
      <ToastContainer autoClose={1370} />
    </>
  );
};

export default CartItem;
