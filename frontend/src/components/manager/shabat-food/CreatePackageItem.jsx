import React, { useState } from "react";
import { salads } from "../../products/salad/SaladList";
import { AiFillCheckCircle } from "react-icons/ai";
import "./style.scss";
const CreatePackageItem = ({
  sumTotalPrice,
  category,
  item,
  totalPrice,
  index,
  pullShabatItemFromPackage,
  pullSaladsItemFromPackage,
  pushShabatItemToPackage,

  pushSaladsItemToPackage,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const toggleIsSelected = () => {
    setIsSelected((state) => !state);
  };
  return (
    <tr className="">
      <td
        onClick={() => {
          if (isSelected === false) {
            if (category === "shabat") {
              pushShabatItemToPackage(item.id);
            } else if (category === "salads") {
              pushSaladsItemToPackage(item.id);
            }
            sumTotalPrice("plus", item.price);
          } else {
            if (category === "shabat") {
              pullShabatItemFromPackage(item.id);
            } else if (category === "salads") {
              pullSaladsItemFromPackage(item.id);
            }
            sumTotalPrice("minus", item.price);
          }
          toggleIsSelected();
        }}
        className="table-item"
      >
        {isSelected ? <AiFillCheckCircle /> : ""} {item.name}
      </td>
    </tr>
  );
};

export default CreatePackageItem;