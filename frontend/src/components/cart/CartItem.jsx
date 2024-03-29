import { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import cartService from "../../services/cart/cart.service";
import { toast } from "react-toastify";
const CartItem = ({ item, index, selectItem, selectedItems, unSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState(false);
  const [isPackageItem, setIsPackageItem] = useState();
  const nav = useNavigate();
  useEffect(() => {
    if ("totalPrice" in item) {
      setIsPackageItem(true);
    } else {
      setIsPackageItem(false);
    }
  }, [item]);
  const toggleSelect = () => {
    selectItem(index);
    setSelectedItem((state) => !state);
  };
  const toggleUnSelect = () => {
    unSelectItem(index);
    setSelectedItem((state) => !state);
  };
  const removeFromCart = async () => {
    cartService.remove(item?._id).then((res) => toast(res.data.message));
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
        <p onClick={() => removeFromCart()} className="salad-add-to-cart">
          מחק מהסל
        </p>
      </td>
    </tr>
  );
};

export default CartItem;
