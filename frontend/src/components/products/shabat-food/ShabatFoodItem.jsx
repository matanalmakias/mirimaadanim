import React from "react";

import { useNavigate } from "react-router-dom";

const ShabatFoodItem = ({ item, index }) => {
  const nav = useNavigate();
  return (
    <tr>
      <td>
        <p class="p-item">{item.name}</p>
      </td>
      <td>
        <p class="p-item">{item.category}</p>
      </td>
      <td>
        <p class="p-item">{item.weight}</p>
      </td>
      <td>
        <p class="p-item">{item.price}</p>
      </td>
      <td>
        <p class="salad-add-to-cart">הוסף</p>
      </td>
      <td>
        <p
          onClick={() => nav(`/product/shabat/${item.id}`)}
          class="salad-details"
        >
          <i class="ri-arrow-left-circle-line"></i>
        </p>
      </td>
    </tr>
  );
};

export default ShabatFoodItem;
