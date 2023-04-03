import { useState } from "react";
import "./style.scss";
const CartItem = ({ item, index, selectItem, selectedItems, unSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState(false);
  const toggleSelect = () => {
    selectItem(index);
    setSelectedItem((state) => !state);
  };
  const toggleUnSelect = () => {
    unSelectItem(index);
    setSelectedItem((state) => !state);
  };
  return (
    <tr>
      <td className="">
        {selectedItem === false ? (
          <p onClick={() => toggleSelect()} className="cursor-on cart-item">
            +
          </p>
        ) : (
          <p onClick={() => toggleUnSelect()} className="cursor-on  cart-minus">
            -
          </p>
        )}
      </td>
      <td className="">
        <p className="p-item cart-item">{item.name}</p>
      </td>
      <td>
        <p className=" p-item cart-item">{item.weight}</p>
      </td>
      <td>
        <p className="p-item cart-item">{item.price}</p>
      </td>
      <td className="d-flex flex-column">
        <p className="salad-weight">הוסף משקל</p>
        <p className="salad-weight">הורד משקל</p>
      </td>
      <td>
        <p className="salad-add-to-cart">מחק מהסל</p>
      </td>
    </tr>
  );
};

export default CartItem;
