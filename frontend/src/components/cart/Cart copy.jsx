import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import CartItem from "./CartItem.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { selfUser } = useContext(AuthContext);
  const cart = selfUser?.cart;
  const packageProducts = cart.filter((item) => item.totalPrice);
  console.log(packageProducts);
  const selectItem = (ind) => {
    const selectedItem = cart.find((item, index) => ind === index);
    setSelectedItems((state) => {
      return [...state, selectedItem];
    });
  };

  const unSelectItem = (ind) => {
    const selectedItem = cart.find((item, index) => ind === index);
    setSelectedItems((state) => {
      const updatedSelectedItems = state.filter(
        (item) => item.id !== selectedItem.id
      );
      return updatedSelectedItems;
    });
  };
  return (
    <div>
      <p className="bg-white text-black p-1 m-1">
        על מנת להזמין - סמן את המוצרים שתרצה ולחץ על הזמנה
      </p>
      <div className="p-1">
        <p className="cart-buy-btn">הזמנה</p>
      </div>
      <div className="d-flex p-1 flex-row align-items-center justify-content-center">
        <table className="w-100">
          <tbody>
            <tr>
              <td className="td-item">סימון</td>
              <td className="td-item">שם פריט</td>
              <td className="td-item">משקל</td>
              <td className="td-item">מחיר</td>
              <td className="td-item">הוסף/הורד משקל</td>
              <td className="td-item">מחיקה</td>
            </tr>

            {cart?.map((item, index) => (
              <CartItem
                selectedItems={selectedItems}
                selectItem={selectItem}
                unSelectItem={unSelectItem}
                item={item}
                index={index}
                key={item.id}
              />
            ))}

            <ToastContainer autoClose={2500} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
