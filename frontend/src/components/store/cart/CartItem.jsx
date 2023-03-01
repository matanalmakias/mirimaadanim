import { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { StoreContext } from "../../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import authService from "../../../services/auth.service";
import { SocketContext } from "../../../context/CateringContext";
import storeService from "../../../services/store.service";
import AuthContext from "../../../context/AuthContext";
const CartItem = ({ item, index }) => {
  const [isSignedWorker, setIsSignedWorker] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showUserData, setShowUserData] = useState(false);
  const { removeFromCart, decQuantity, incQuantity } = useContext(StoreContext);
  const socket = useContext(SocketContext);
  const { userData } = useContext(AuthContext);

  const signWorker = async (workerId, productId) => {
    storeService.signWorker(workerId, productId).then((res) => {
      toast(res.data.message);
    });
    socket.emit("update");
  };
  let cartItem;

  if (userData !== null) {
    cartItem = userData?.cart.find((cartItem) => cartItem.product === item._id);
  }
  const isWorkerIsSigned = async (id, cartItem) => {
    const result = cartItem.workers.some((item) => item.id === id);
    if (result === true) {
      setIsSignedWorker(true);
    } else {
      setIsSignedWorker(false);
    }
  };

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
          <div className={showUserData ? "d-flex" : "hide_class"}>
            {userData?.workers.length > 0 &&
              userData?.workers.map((worker) => (
                <div
                  onClick={() => signWorker(worker.id, item._id)}
                  className="btn card m-1 p-1"
                  key={worker?.id}
                >
                  <p
                    className="mb-1"
                    style={{ padding: `1px`, fontSize: `10px` }}
                  >
                    {worker?.name}
                  </p>
                  {cartItem &&
                    cartItem.workers.some((item) => item.id === worker.id) && (
                      <>
                        <i class="ri-check-line"></i>
                      </>
                    )}
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
          {" "}
          <p onClick={() => decQuantity(item?._id)} className="btns">
            הורד
          </p>
          <p onClick={() => incQuantity(item?._id)} className="btns">
            הוסף
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
