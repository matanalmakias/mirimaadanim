import { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import cartService from "../../services/cart/cart.service";
import { toast } from "react-toastify";
const CartPackageItem = ({
  item,
  index,
  selectItem,
  selectedItems,
  unSelectItem,
}) => {
  const [selectedItem, setSelectedItem] = useState(false);
  const [isPackageItem, setIsPackageItem] = useState();
  const nav = useNavigate();
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
  console.log(item);
  return (
    <div>
      <td className="">
        {selectedItem === false ? (
          <p
            onClick={() => toggleSelect()}
            className="cursor-on w-100 p-2 cart-item"
          >
            +
          </p>
        ) : (
          <p
            onClick={() => toggleUnSelect()}
            className="cursor-on w-100 p-2 cart-minus"
          >
            -
          </p>
        )}
      </td>
      <td className="">
        <p className="p-item cart-item">{item.name}</p>
      </td>

      <td>
        <p className="p-item cart-item">{item.totalPrice}</p>
      </td>

      <td>
        <p onClick={() => removeFromCart()} className="salad-add-to-cart">
          מחק מהסל
        </p>
      </td>
    </div>
  );
};

export default CartPackageItem;
